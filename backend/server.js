const express = require('express');
const multer = require('multer');
const cors = require('cors');
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
    data: { scriptArray: script, videoFile: videoFile.originalname } 
  });
});

// Khởi động server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
