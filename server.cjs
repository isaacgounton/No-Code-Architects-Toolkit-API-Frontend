const express = require('express');
const multer = require('multer');
const { Client } = require('minio');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const minioClient = new Client({
  endPoint: process.env.VITE_MINIO_ENDPOINT,
  port: parseInt(process.env.VITE_MINIO_PORT || '9000'), // Use environment variable for port
  useSSL: process.env.VITE_MINIO_USE_SSL === 'true', // Use environment variable for SSL
  accessKey: process.env.VITE_MINIO_ACCESS_KEY,
  secretKey: process.env.VITE_MINIO_SECRET_KEY,
});

app.use(cors({
  origin: process.env.VITE_FRONTEND_URL || 'http://localhost:3000', // Allow requests from frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.file;
    const bucketName = process.env.VITE_MINIO_BUCKET_NAME;
    const fileName = `${Date.now()}-${file.originalname}`;

    // Ensure bucket exists
    try {
      const bucketExists = await minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        await minioClient.makeBucket(bucketName);
      }
    } catch (error) {
      console.error('Error checking/creating bucket:', error);
      return res.status(500).json({ error: 'Failed to process bucket' });
    }

    // Upload file
    await minioClient.putObject(bucketName, fileName, file.buffer);

    // Generate public URL
    const publicUrl = await minioClient.presignedGetObject(bucketName, fileName, 24 * 60 * 60); // URL valid for 24 hours
    res.json({ url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});