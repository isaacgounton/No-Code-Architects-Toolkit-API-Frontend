import React from 'react';
import { FileUpload } from '../components/ui/FileUpload';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Slider } from '../components/ui/Slider';
import toast from 'react-hot-toast';
import { convertImageToVideo } from '../lib/api/image';
import { useAuthStore } from '../lib/store';
import { Progress } from '../components/ui/Progress';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function ImageProcessing() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState('');
  const [previewUrl, setPreviewUrl] = React.useState('');
  const [videoUrl, setVideoUrl] = React.useState<string | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const { isAuthenticated } = useAuthStore();
  const [progress, setProgress] = React.useState(0);
  
  const [settings, setSettings] = React.useState({
    length: 5,
    frame_rate: 30,
    zoom_speed: 3,
  });

  const handleSettingChange = (key: keyof typeof settings, value: number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleFileSelect = async (files: File[]) => {
    if (files[0]) {
      const file = files[0];
      setSelectedFile(file);
      
      // Create preview URL
      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);

      try {
        // Upload to backend
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${backendUrl}/upload`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const data = await response.json();
        setImageUrl(data.url);
        toast.success('Image uploaded successfully');
      } catch (error) {
        toast.error('Failed to upload image');
        console.error(error);
      }
    }
  };

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (imageUrl) {
      // Clean up any existing file preview
      if (selectedFile) {
        URL.revokeObjectURL(previewUrl);
        setSelectedFile(null);
      }
      setPreviewUrl(imageUrl);
      toast.success('Image URL loaded');
    }
  };

  // Clean up URLs when component unmounts
  React.useEffect(() => {
    return () => {
      if (previewUrl && selectedFile) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, selectedFile]);

  const handleProcess = async () => {
    if (!isAuthenticated) {
      toast.error('Please authenticate first');
      return;
    }

    if (!imageUrl) {
      toast.error('Please select an image or enter URL first');
      return;
    }

    try {
      setIsLoading(true);
      setProgress(0);
      
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);

      const response = await convertImageToVideo({
        image_url: imageUrl,
        length: settings.length,
        frame_rate: settings.frame_rate,
        zoom_speed: settings.zoom_speed,
      });

      clearInterval(progressInterval);

      if (response.response) {
        setProgress(100);
        setVideoUrl(response.response);
        toast.success('Video created successfully!');
      }
    } catch (error) {
      setProgress(0);
      if (error instanceof Error) {
        if (error.message.includes('CORS')) {
          toast.error('Unable to connect to the API. Please check your network settings or contact support.');
        } else {
          toast.error(error.message);
        }
      } else {
        toast.error('Failed to process image');
      }
    } finally {
      setIsLoading(false);
    }
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
                className="flex-1"
              />
              <Button 
                type="submit"
                variant="outline"  // Changed from "secondary" to "outline"
                className="min-w-[100px] bg-blue-600 text-white hover:bg-blue-700"
              >
                Load URL
              </Button>
            </form>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-6">
            <h2 className="text-lg font-semibold">Video Settings</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Video Length</label>
                  <span className="text-sm font-medium text-blue-600">{settings.length} seconds</span>
                </div>
                <Slider
                  min={1}
                  max={60}
                  step={1}
                  value={[settings.length]}
                  onValueChange={([value]) => handleSettingChange('length', value)}
                  className="[&[role=slider]]:bg-blue-600 [&>.slider-track]:bg-blue-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Frame Rate</label>
                  <span className="text-sm font-medium text-blue-600">{settings.frame_rate} fps</span>
                </div>
                <Slider
                  min={15}
                  max={60}
                  step={1}
                  value={[settings.frame_rate]}
                  onValueChange={([value]) => handleSettingChange('frame_rate', value)}
                  className="[&[role=slider]]:bg-blue-600 [&>.slider-track]:bg-blue-600"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Zoom Speed</label>
                  <span className="text-sm font-medium text-blue-600">{settings.zoom_speed}%</span>
                </div>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[settings.zoom_speed]}
                  onValueChange={([value]) => handleSettingChange('zoom_speed', value)}
                  className="[&[role=slider]]:bg-blue-600 [&>.slider-track]:bg-blue-600"
                />
              </div>

              {progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Converting image to video...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} />
                </div>
              )}

              <Button 
                onClick={handleProcess}
                disabled={!imageUrl || isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Create Video'
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">
              {videoUrl ? 'Generated Video' : 'Image Preview'}
            </h2>
            {videoUrl ? (
              <div className="space-y-4">
                <video 
                  src={videoUrl} 
                  controls 
                  className="w-full h-auto rounded-lg"
                />
                <Button
                  onClick={() => window.open(videoUrl, '_blank')}
                  variant="outline"
                  className="w-full"
                >
                  Download Video
                </Button>
              </div>
            ) : previewUrl ? (
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
    </div>
  );
}
