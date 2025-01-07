import express from 'express';
import multer from 'multer';
import { Client } from 'minio';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const upload = multer({ storage: multer.memoryStorage() });

const minioClient = new Client({
  endPoint: process.env.VITE_MINIO_ENDPOINT,
  port: 9000,
  useSSL: true,
  accessKey: process.env.VITE_MINIO_ACCESS_KEY,
  secretKey: process.env.VITE_MINIO_SECRET_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const bucketName = process.env.VITE_MINIO_BUCKET_NAME;
    const fileName = `${Date.now()}-${file.originalname}`;

    // Ensure bucket exists
    const bucketExists = await minioClient.bucketExists(bucketName);
    if (!bucketExists) {
      await minioClient.makeBucket(bucketName);
    }

    // Upload file
    await minioClient.putObject(bucketName, fileName, file.buffer);

    // Generate public URL
    const publicUrl = `https://${process.env.VITE_MINIO_ENDPOINT}/${bucketName}/${fileName}`;
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
