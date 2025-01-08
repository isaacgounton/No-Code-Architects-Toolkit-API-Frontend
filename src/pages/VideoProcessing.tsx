import { useState, useEffect } from 'react';
import { FileUpload } from '../components/ui/FileUpload';
import { VideoPreview } from '../components/video/VideoPreview';
import { CaptionStyler } from '../components/video/CaptionStyler';
import { VideoConcatenation } from '../components/video/VideoConcatenation';
import { VideoUrlInput } from '../components/video/VideoUrlInput';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import toast from 'react-hot-toast';
import { Button } from '../components/ui/Button';
import { captionVideo, concatenateVideos } from '../lib/api/video';
import type { CaptionSettings, TextReplacement } from '../types/video';

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
  const [captionText, setCaptionText] = useState<string>('');
  const [replacements, setReplacements] = useState<TextReplacement[]>([]);
  const [language, setLanguage] = useState<string>('auto');
  const [isLoading, setIsLoading] = useState(false);

  const [captionSettings, setCaptionSettings] = useState<CaptionSettings>({
    line_color: '#ffffff',
    word_color: '#000000',
    outline_color: '#ffffff',
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
    shadow_offset: 2,
    x: 0,
    y: 0
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

    const handleLanguageChange = (newLanguage: string | undefined) => {
    setLanguage(newLanguage ?? 'auto');
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
    setIsLoading(true);
    setProcessingProgress(0);
    const interval: NodeJS.Timeout | undefined = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 90) {
            return 90;
          }
          return prev + 10;
        });
      }, 500);

    try {
      const {x, y, ...restSettings} = captionSettings;
      const apiSettings = {
        ...restSettings,
        ...(x !== 0 || y !== 0 ? {x, y} : {})
      }
      const response = await captionVideo({
        video_url: videoUrl,
        captions: captionText || undefined,
        settings: apiSettings,
        replace: replacements.length > 0 ? replacements : undefined,
        language: language === 'auto' ? undefined : language,
        id: crypto.randomUUID()
      });

      if (response.response) {
          toast.success('Video processed successfully');
          setVideoUrl(response.response);
          setProcessingProgress(100);
          if (interval) {
            clearInterval(interval);
          }
      }
    } catch (error) {
      setIsProcessing(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to process video');
      }
      if (interval) {
        clearInterval(interval);
      }
    } finally {
        setIsLoading(false);
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
              
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="Or enter video URL"
                  value={videoSourceUrl}
                  onChange={(e) => setVideoSourceUrl(e.target.value)}
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <Button
                  onClick={() => {
                    if (videoSourceUrl) {
                      setVideoUrl(videoSourceUrl);
                      if (videoFile) {
                        URL.revokeObjectURL(videoUrl);
                        setVideoFile(null);
                      }
                      toast.success('Video URL loaded');
                    }
                  }}
                >
                  Load URL
                </Button>
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
                <CaptionStyler
                  settings={captionSettings}
                  onChange={setCaptionSettings}
                  captions={captionText}
                  onCaptionsChange={setCaptionText}
                  replacements={replacements}
                  onReplacementsChange={setReplacements}
                  language={language}
                  onLanguageChange={handleLanguageChange}
                />
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleProcess}
                  disabled={!videoFile && !videoSourceUrl || isLoading}
                  className="w-full"
                >
                  {isLoading ? `Processing... ${processingProgress}%` : 'Process Video'}
                </Button>
                
                {isProcessing && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full video-progress-bar"
                      style={{ width: `${processingProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {videoUrl && (
            <div className="border rounded-lg p-4">
              <h2 className="text-lg font-semibold mb-4">
                Generated Video
              </h2>
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
            </div>
          )}
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
