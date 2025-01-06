import React from 'react';
import { FileUpload } from '../components/ui/FileUpload';
import { VideoPreview } from '../components/video/VideoPreview';
import { CaptionSettings } from '../components/video/CaptionSettings';
import { VideoConcatenation } from '../components/video/VideoConcatenation';
import { VideoUrlInput } from '../components/video/VideoUrlInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import toast from 'react-hot-toast';

interface Video {
  id: string;
  url: string;
}

export default function VideoProcessing() {
  const [videoFile, setVideoFile] = React.useState<File | null>(null);
  const [videoUrl, setVideoUrl] = React.useState<string>('');
  const [videos, setVideos] = React.useState<Video[]>([]);
  const [captionSettings, setCaptionSettings] = React.useState({
    fontSize: 24,
    fontColor: '#ffffff',
    position: 'bottom' as const,
    style: 'default' as const,
  });

  const handleFileSelect = (files: File[]) => {
    const file = files[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleAddVideo = (url: string) => {
    setVideos([...videos, { id: crypto.randomUUID(), url }]);
  };

  const handleProcess = async () => {
    if (!videoFile) {
      toast.error('Please select a video file first');
      return;
    }
    toast.success('Processing started');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Video Processing</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Process videos with captions and concatenation tools.
        </p>
      </div>

      <Tabs defaultValue="captions">
        <TabsList>
          <TabsTrigger value="captions">Video Captions</TabsTrigger>
          <TabsTrigger value="concatenation">Video Concatenation</TabsTrigger>
        </TabsList>

        <TabsContent value="captions" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <FileUpload
                onFileSelect={handleFileSelect}
                accept={{ 'video/*': ['.mp4', '.mov', '.avi'] }}
                maxSize={100 * 1024 * 1024}
              />
              {videoUrl && (
                <VideoPreview
                  url={videoUrl}
                  onError={() => toast.error('Error loading video')}
                />
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Caption Settings</h2>
                <CaptionSettings
                  settings={captionSettings}
                  onChange={setCaptionSettings}
                />
              </div>

              <button
                onClick={handleProcess}
                disabled={!videoFile}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Process Video
              </button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="concatenation" className="space-y-6">
          <VideoUrlInput onAdd={handleAddVideo} />
          <VideoConcatenation videos={videos} onVideosChange={setVideos} />
          {videos.length > 0 && (
            <button
              onClick={() => toast.success('Concatenation started')}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Concatenate Videos
            </button>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}