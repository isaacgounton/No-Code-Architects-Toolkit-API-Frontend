import React from 'react';
import { FileUpload } from '../components/ui/FileUpload';
import toast from 'react-hot-toast';

export default function MediaProcessing() {
  const handleFileSelect = (files: File[]) => {
    toast.success('Media file uploaded successfully');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Media Processing</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert media files to MP3 and generate transcriptions.
        </p>
      </div>

      <FileUpload
        onFileSelect={handleFileSelect}
        accept={{
          'audio/*': ['.mp3', '.wav', '.m4a'],
          'video/*': ['.mp4', '.mov', '.avi']
        }}
        maxSize={100 * 1024 * 1024} // 100MB
      />
    </div>
  );
}