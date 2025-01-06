import React from 'react';
import { FileUpload } from '../components/ui/FileUpload';
import toast from 'react-hot-toast';

export default function ImageProcessing() {
  const handleFileSelect = (files: File[]) => {
    toast.success('Image uploaded successfully');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Image Processing</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert images to video with customizable transitions and effects.
        </p>
      </div>

      <FileUpload
        onFileSelect={handleFileSelect}
        accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] }}
        maxSize={20 * 1024 * 1024} // 20MB
      />
    </div>
  );
}