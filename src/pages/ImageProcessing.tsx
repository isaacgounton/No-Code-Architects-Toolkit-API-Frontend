import React from 'react';
import { FileUpload } from '../components/ui/FileUpload';
import toast from 'react-hot-toast';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Slider } from '../components/ui/Slider';

export default function ImageProcessing() {
  const [imageUrl, setImageUrl] = React.useState('');
  const [settings, setSettings] = React.useState({
    duration: 5,
    frameRate: 30,
    zoomSpeed: 1,
  });
  const [previewUrl, setPreviewUrl] = React.useState('');

  const handleFileSelect = (files: File[]) => {
    if (files[0]) {
      const url = URL.createObjectURL(files[0]);
      setPreviewUrl(url);
      toast.success('Image uploaded successfully');
    }
  };

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageUrl) {
      setPreviewUrl(imageUrl);
      toast.success('Image URL loaded');
    }
  };

  const handleProcess = () => {
    // TODO: Implement processing logic
    toast.success('Processing started');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Image Processing</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert images to video with customizable transitions and effects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <FileUpload
            onFileSelect={handleFileSelect}
            accept={{ 'image/*': ['.jpg', '.jpeg', '.png', '.gif'] }}
            maxSize={20 * 1024 * 1024}
          />

          <div className="space-y-4">
            <form onSubmit={handleUrlSubmit} className="flex gap-2">
              <Input
                type="url"
                placeholder="Or enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button type="submit">Load URL</Button>
            </form>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Video Duration (seconds)</label>
                <Slider
                  min={1}
                  max={30}
                  step={1}
                  value={[settings.duration]}
                  onValueChange={(value: number[]) => setSettings(s => ({ ...s, duration: value[0] }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Frame Rate (fps)</label>
                <Slider
                  min={15}
                  max={60}
                  step={1}
                  value={[settings.frameRate]}
                  onValueChange={(value: number[]) => setSettings(s => ({ ...s, frameRate: value[0] }))}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Zoom Speed</label>
                <Slider
                  min={0.1}
                  max={2}
                  step={0.1}
                  value={[settings.zoomSpeed]}
                  onValueChange={(value: number[]) => setSettings(s => ({ ...s, zoomSpeed: value[0] }))}
                />
              </div>

              <Button onClick={handleProcess} className="w-full">
                Process Image
              </Button>
            </div>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-auto rounded-lg"
            />
          ) : (
            <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No image selected</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}