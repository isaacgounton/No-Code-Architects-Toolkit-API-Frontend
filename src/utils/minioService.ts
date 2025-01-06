import { Client } from 'minio';

const minioClient = new Client({
  endPoint: import.meta.env.VITE_MINIO_ENDPOINT,
  port: 9000,
  useSSL: true,
  accessKey: import.meta.env.VITE_MINIO_ACCESS_KEY,
  secretKey: import.meta.env.VITE_MINIO_SECRET_KEY,
});

export const uploadToMinio = async (file: File, bucketName: string = import.meta.env.VITE_MINIO_BUCKET_NAME): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  
  // Ensure bucket exists
  const bucketExists = await minioClient.bucketExists(bucketName);
  if (!bucketExists) {
    await minioClient.makeBucket(bucketName);
  }

  // Convert File to Buffer
  const buffer = await file.arrayBuffer();
  const bufferData = Buffer.from(buffer);

  // Upload file
  await minioClient.putObject(bucketName, fileName, bufferData);

  // Generate public URL
  return `${import.meta.env.VITE_MINIO_ENDPOINT}/${bucketName}/${fileName}`;
};
