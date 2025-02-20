import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { cn } from '../../lib/utils';

interface FileUploadProps {
  onFileSelect: (files: File[]) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  className?: string;
  multiple?: boolean;
}

export function FileUpload({
  onFileSelect,
  accept,
  maxSize,
  multiple = false,
  className
}: FileUploadProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.length > 0) {
        onFileSelect(acceptedFiles);
      }
    },
    accept,
    maxSize,
    multiple,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
        isDragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-300 hover:border-gray-400",
        className
      )}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {isDragActive ? "Drop the files here" : "Drag & drop files here, or click to select files"}
      </p>
    </div>
  );
}