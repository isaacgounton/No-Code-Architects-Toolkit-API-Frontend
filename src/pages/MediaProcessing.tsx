import { useState } from 'react';
import { FileUpload } from '../components/ui/FileUpload';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { ConversionSettings, type ConversionSettings as ConversionSettingsType } from '../components/media/ConversionSettings';
import { TranscriptionSettings, type TranscriptionSettings as TranscriptionSettingsType } from '../components/media/TranscriptionSettings';
import toast from 'react-hot-toast';

type MediaType = 'audio' | 'video';
type ProcessingType = 'convert' | 'transcribe';

export default function MediaProcessing() {
  const [files, setFiles] = useState<File[]>([]);
  const [mediaType, setMediaType] = useState<MediaType>('audio');
  const [processingType, setProcessingType] = useState<ProcessingType>('convert');
  const [progress, setProgress] = useState<number>();

  const handleFileSelect = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    toast.success(`${selectedFiles.length} files uploaded`);
  };

  const handleConvert = (settings: ConversionSettingsType) => {
    console.log('Converting with settings:', settings);
    // Start conversion with settings
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p === undefined) return 0;
        if (p >= 100) {
          clearInterval(interval);
          toast.success(`Conversion completed at ${settings.bitrate}kbps (${settings.quality} quality)`);
          return 100;
        }
        return p + 10;
      });
    }, 500);
  };

  const handleTranscribe = (settings: TranscriptionSettingsType) => {
    console.log('Transcribing with settings:', settings);
    // Start transcription with settings
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p === undefined) return 0;
        if (p >= 100) {
          clearInterval(interval);
          toast.success(`Transcription completed in ${settings.format} format (${settings.language})`);
          return 100;
        }
        return p + 5;
      });
    }, 500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Media Processing</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Convert and transcribe media files with advanced tools.
        </p>
      </div>

      <Tabs value={mediaType} onValueChange={(v) => setMediaType(v as MediaType)}>
        <TabsList>
          <TabsTrigger value="audio">Audio Files</TabsTrigger>
          <TabsTrigger value="video">Video Files</TabsTrigger>
        </TabsList>

        <TabsContent value="audio" className="space-y-6">
          <FileUpload
            onFileSelect={handleFileSelect}
            accept={{ 'audio/*': ['.mp3', '.wav', '.ogg', '.m4a'] }}
            maxSize={50 * 1024 * 1024}
            multiple
          />
        </TabsContent>

        <TabsContent value="video" className="space-y-6">
          <FileUpload
            onFileSelect={handleFileSelect}
            accept={{ 'video/*': ['.mp4', '.mov', '.avi', '.mkv'] }}
            maxSize={200 * 1024 * 1024}
            multiple
          />
        </TabsContent>
      </Tabs>

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Selected Files:</h3>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
                  {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </li>
              ))}
            </ul>
          </div>

          <Tabs value={processingType} onValueChange={(v) => setProcessingType(v as ProcessingType)}>
            <TabsList>
              <TabsTrigger value="convert">Convert to MP3</TabsTrigger>
              <TabsTrigger value="transcribe">Transcribe</TabsTrigger>
            </TabsList>

            <TabsContent value="convert" className="space-y-6">
              <ConversionSettings
                onConvert={handleConvert}
                progress={progress}
              />
            </TabsContent>

            <TabsContent value="transcribe" className="space-y-6">
              <TranscriptionSettings
                onTranscribe={handleTranscribe}
                progress={progress}
              />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}