import React, { useEffect, useState } from 'react';
import { FileUpload } from '../components/ui/FileUpload';
import { VideoPreview } from '../components/video/VideoPreview';
import { CaptionStyler } from '../components/video/CaptionStyler';
import { VideoConcatenation } from '../components/video/VideoConcatenation';
import { VideoUrlInput } from '../components/video/VideoUrlInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { captionVideo, concatenateVideos } from '../lib/api/video';
import type { 
  CaptionSettings, 
  TextReplacement, 
  Caption, 
  VideoPosition, 
  CaptionStyle, 
  TextAlignment 
} from '../types/video';

interface Video {
  id: string;
  url: string;
}

export default function VideoProcessing() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [videoSourceUrl, setVideoSourceUrl] = useState<string>('');
  const [videos, setVideos] = useState<Video[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const [captions, setCaptions] = useState<Caption[]>([]);
  const [captionSettings, setCaptionSettings] = useState<CaptionSettings>({
    line_color: '#ffffff',
    word_color: '#000000',
    outline_color: '#000000',
    all_caps: false,
    max_words_per_line: 10,
    position: 'bottom_center',
    alignment: 'center',
    font_family: 'Arial',
    font_size: 24,
    bold: false,
    italic: false,
    underline: false,
    strikeout: false,
    style: 'classic',
    outline_width: 2,
    spacing: 2,
    angle: 0,
    shadow_offset: 2
  });

  const [textReplacements, setTextReplacements] = useState<TextReplacement[]>([]);
  const [captionText, setCaptionText] = useState<string>('');
  const [replacements, setReplacements] = useState<TextReplacement[]>([]);
  const [language, setLanguage] = useState<string | undefined>(undefined);

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
      const response = await captionVideo({
        video_url: videoUrl,
        captions: captionText,
        settings: captionSettings,
        replace: replacements.length > 0 ? replacements : undefined,
        language
      });

      if (response.response) {
        toast.success('Video processed successfully');
        // Handle the processed video URL
      }
    } catch (error) {
      setIsProcessing(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to process video');
      }
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
              
              <VideoUrlInput
                value={videoSourceUrl}
                onChange={setVideoSourceUrl}
                onSubmit={() => {
                  if (videoSourceUrl) {
                    setVideoUrl(videoSourceUrl);
                    if (videoFile) {
                      URL.revokeObjectURL(videoUrl);
                      setVideoFile(null);
                    }
                    toast.success('Video URL loaded');
                  }
                }}
              />

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
                <CaptionStyler
                  settings={captionSettings}
                  onChange={setCaptionSettings}
                  captions={captionText}
                  onCaptionsChange={setCaptionText}
                  replacements={replacements}
                  onReplacementsChange={setReplacements}
                  language={language}
                  onLanguageChange={setLanguage}
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
