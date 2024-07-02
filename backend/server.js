const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware để parse JSON
app.use(bodyParser.json());

// Route để nhận thông tin từ POST request
app.post('/api/info', (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: 'Vui lòng cung cấp đầy đủ thông tin name và description.' });
  }

  // Xử lý dữ liệu ở đây (ví dụ: lưu trữ trong cơ sở dữ liệu)
  console.log(`Name: ${name}, Description: ${description}`);

  // Phản hồi lại client
  res.status(200).json({ message: 'Thông tin đã được nhận thành công.', data: { name, description } });
});

// Khởi chạy server
app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});
