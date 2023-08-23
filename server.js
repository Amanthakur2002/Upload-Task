const express = require('express');
const multer = require('multer');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'D:/Magnet Brains/file-upload-backend/uploads'); // Directory to store uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Access uploaded file details
      const { originalname, filename, size } = req.file;
  
      // Here, you can save the file details to a database if needed
  
      // Send a response back to the client
      res.status(200).json({
        message: 'File uploaded successfully',
        file: {
          originalname,
          filename,
          size,
        },
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'File upload failed' });
    }
  });

// Start the server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
