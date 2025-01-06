import { useState } from 'react';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';

interface TranscriptionSettingsProps {
  onTranscribe: (settings: TranscriptionSettings) => void;
  progress?: number;
}

export interface TranscriptionSettings {
  language: string;
  format: 'srt' | 'txt';
  wordTimestamps: boolean;
}

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
];

const formats: Array<{ value: TranscriptionSettings['format']; label: string }> = [
  { value: 'srt', label: 'SubRip (SRT)' },
  { value: 'txt', label: 'Plain Text' },
];

export function TranscriptionSettings({ onTranscribe, progress }: TranscriptionSettingsProps) {
  const [settings, setSettings] = useState<TranscriptionSettings>({
    language: 'en',
    format: 'srt',
    wordTimestamps: false,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Language</label>
        <Select
          value={settings.language}
          onValueChange={(value: string) => 
            setSettings(s => ({ ...s, language: value }))}
          options={languages}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Output Format</label>
        <Select<TranscriptionSettings['format']>
          value={settings.format}
          onValueChange={(value) => 
            setSettings(s => ({ ...s, format: value }))}
          options={formats}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Word-level Timestamps</label>
        <Switch
          checked={settings.wordTimestamps}
          onCheckedChange={(checked) => 
            setSettings(s => ({ ...s, wordTimestamps: checked }))
          }
        />
      </div>

      {progress !== undefined && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Transcribing...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>
      )}

      <Button 
        onClick={() => onTranscribe(settings)}
        className="w-full"
        disabled={progress !== undefined}
      >
        Start Transcription
      </Button>
    </div>
  );
}
