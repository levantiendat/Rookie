const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

const app = express();

// Middleware để xử lý dữ liệu JSON
app.use(cors());
app.use(express.json());

// Cấu hình multer để lưu trữ video
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Thư mục lưu trữ file
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Đặt tên file như tên gốc
  }
});

const upload = multer({ storage: storage });

// Route để nhận thông tin từ POST request
app.post('/api/upload', upload.single('video'), (req, res) => {
  const { scriptArray } = req.body;
  const videoFile = req.file;

  // Kiểm tra dữ liệu
  if (!scriptArray || !videoFile) {
    return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin scriptArray và video.' });
  }

  // Xử lý scriptArray (parse từ JSON string nếu cần)
  let script;
  try {
    script = JSON.parse(scriptArray);
  } catch (e) {
    return res.status(400).json({ error: 'scriptArray không hợp lệ.' });
  }

  // Kiểm tra định dạng của scriptArray
  if (!Array.isArray(script) || !script.every(item => item.time && item.script)) {
    return res.status(400).json({ error: 'scriptArray phải là một mảng chứa các đối tượng với các trường "time" và "script".' });
  }

  // Xử lý dữ liệu ở đây (ví dụ: lưu trữ trong cơ sở dữ liệu hoặc file)
  console.log(`Video file: ${videoFile.originalname}`);
  console.log('Script Array:', script);

  // Phản hồi lại client
  res.status(200).json({ 
    message: 'Thông tin đã được nhận thành công.', 
    data: { scriptArray: script, videoFile: videoFile.originalname, url: "D:\\academy\\Competitions\\Tiktok_TECHJAM\\Rookie\\frontend\\src\\components\\videos\\output.mp4"} 
  });
});

app.post('/merge', upload.fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'audioFiles', maxCount: 10 } // Adjust maxCount as needed
]), (req, res) => {
  const videoFile = req.files['videoFile'][0];
  const audioFiles = req.files['audioFiles'];

  const outputFileName = `merged_${Date.now()}.mp4`;
  const outputPath = path.join(__dirname, 'uploads', outputFileName);

  let responseSent = false; // Flag to ensure only one response is sent

  // Ensure the upload directory exists
  if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
  }

  // Create a text file listing the audio files for concatenation
  const concatListPath = path.join(__dirname, 'uploads', 'concat.txt');
  const concatList = audioFiles.map(audioFile => `file '${path.join(__dirname, 'uploads', audioFile.filename)}'`).join('\n');
  fs.writeFileSync(concatListPath, concatList);

  // Concatenate multiple audio files into a single audio file
  const mergedAudioFileName = `merged_audio_${Date.now()}.mp3`;
  const mergedAudioPath = path.join(__dirname, 'uploads', mergedAudioFileName);

  ffmpeg()
    .input(concatListPath)
    .inputOptions(['-f concat', '-safe 0'])
    .output(mergedAudioPath)
    .on('end', () => {
      // Merge the video with the concatenated audio file
      ffmpeg()
        .input(path.join(__dirname, 'uploads', videoFile.filename))
        .input(mergedAudioPath)
        .outputOptions([
          '-c:v copy', // Copy video codec (no re-encoding)
          '-c:a aac',  // Encode audio to AAC
          '-map 0:v:0', // Map video stream from the first input
          '-map 1:a:0', // Map audio stream from the second input
          '-shortest',  // Ensure the output duration matches the shorter input
          '-y',         // Overwrite output files without asking
        ])
        .output(outputPath)
        .on('end', () => {
          if (!responseSent) {
            responseSent = true;
            res.send(`Merged file created successfully: ${outputFileName}`);
          }
        })
        .on('error', (err) => {
          console.error('Error merging video and concatenated audio:', err);
          if (!responseSent) {
            responseSent = true;
            res.status(500).send('Error merging video and concatenated audio');
          }
        })
        .run();
    })
    .on('error', (err) => {
      console.error('Error concatenating audio files:', err);
      if (!responseSent) {
        responseSent = true;
        res.status(500).send('Error concatenating audio files');
      }
    })
    .run();
});

// Route để phục vụ video
app.get('/api/video', (req, res) => {
  const videoPath = path.join(__dirname, 'uploads', 'merged_1720338277810.mp4');
  
  // Kiểm tra file tồn tại
  if (!fs.existsSync(videoPath)) {
    return res.status(404).send('Video not found');
  }
  
  res.sendFile(videoPath);
});

// Khởi động server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
