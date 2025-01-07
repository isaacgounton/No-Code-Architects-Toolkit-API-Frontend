import React, { useEffect, useState } from 'react';
import { FileUpload } from '../components/ui/FileUpload';
import { VideoPreview } from '../components/video/VideoPreview';
import { CaptionSettings } from '../components/video/CaptionSettings';
import { VideoConcatenation } from '../components/video/VideoConcatenation';
import { VideoUrlInput } from '../components/video/VideoUrlInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { captionVideo, concatenateVideos } from '../lib/api/video';

interface Video {
  id: string;
  url: string;
}

export default function VideoProcessing() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoSourceUrl, setVideoSourceUrl] = useState<string>('');
  const [videos, setVideos] = useState<Video[]>([]);
  interface Caption {
    text: string;
    startTime: number;
    endTime: number;
  }

  const [captions, setCaptions] = useState<Caption[]>([]);
  const [captionSettings, setCaptionSettings] = useState({
    fontSize: 24,
    fontColor: '#ffffff',
    position: 'bottom_center' as 'bottom_left' | 'bottom_center' | 'bottom_right' |
              'middle_left' | 'middle_center' | 'middle_right' |
              'top_left' | 'top_center' | 'top_right',
    style: 'classic' as 'classic' | 'karaoke' | 'highlight' | 'underline' | 'word_by_word',
    fontFamily: 'Arial',
  });

  const handleFileSelect = async (files: File[]) => {
    const file = files[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleAddVideo = async (url: string) => {
    try {
      setVideos([...videos, { id: crypto.randomUUID(), url }]);
    } catch (error) {
      toast.error('Failed to process video URL');
      console.error(error);
    }
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isProcessing) {
      interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 500);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isProcessing]);

  const handleProcess = async () => {
    if (!videoFile && !videoSourceUrl) {
      toast.error('Please select a video file or enter a URL first');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    try {
    await captionVideo({
      video_url: videoUrl,
      captions: captions.map(c => c.text).join('\n'),
      settings: {
        font_size: 24,
        position: 'bottom_center',
        font_family: 'Arial'
      }
    });

      toast.success('Processing started');
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to start processing');
      console.error(error);
    }
  };

  const handleConcatenate = async () => {
    if (videos.length < 2) {
      toast.error('Please add at least 2 videos to concatenate');
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);

    try {
      await concatenateVideos({
        video_urls: videos.map(v => ({video_url: v.url}))
      });

      toast.success('Concatenation started');
    } catch (error) {
      setIsProcessing(false);
      toast.error('Failed to start concatenation');
      console.error(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
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
              
              <div className="space-y-4">
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (videoSourceUrl) {
                      setVideoUrl(videoSourceUrl);
                      if (videoFile) {
                        URL.revokeObjectURL(videoUrl);
                        setVideoFile(null);
                      }
                      toast.success('Video URL loaded');
                    }
                  }} 
                  className="flex gap-2"
                >
                  <input
                    type="url"
                    placeholder="Or enter video URL"
                    value={videoSourceUrl}
                    onChange={(e) => setVideoSourceUrl(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:border-gray-700"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    Load URL
                  </button>
                </form>
              </div>
              {videoUrl && (
                <VideoPreview
                  url={videoUrl}
                  showControls={true}
                  className="w-full aspect-video rounded-lg"
                />
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Caption Settings</h2>
                <CaptionSettings
                  settings={captionSettings}
                  captions={captions}
                  onCaptionsChange={setCaptions}
                  onChange={(newSettings) => setCaptionSettings(newSettings)}
                />
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleProcess}
                  disabled={!videoFile && !videoSourceUrl || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? `Processing... ${processingProgress}%` : 'Process Video'}
                </Button>
                
                {isProcessing && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${processingProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="concatenation" className="space-y-6">
          <VideoUrlInput onAdd={handleAddVideo} />
          <VideoConcatenation videos={videos} onVideosChange={setVideos} />
          {videos.length > 0 && (
            <Button
              onClick={handleConcatenate}
              disabled={videos.length < 2 || isProcessing}
              className="w-full"
            >
              {isProcessing ? `Concatenating... ${processingProgress}%` : 'Concatenate Videos'}
            </Button>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
