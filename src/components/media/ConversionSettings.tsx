import { useState } from 'react';
import { Slider } from '../ui/Slider';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Progress } from '../ui/Progress';
import { Download } from 'lucide-react';

interface ConversionSettingsProps {
  onConvert: (settings: ConversionSettings) => void;
  progress?: number;
}

export interface ConversionSettings {
  bitrate: number;
  quality: 'low' | 'medium' | 'high';
}

const qualities: Array<{ value: ConversionSettings['quality']; label: string }> = [
  { value: 'low', label: 'Low (128kbps)' },
  { value: 'medium', label: 'Medium (192kbps)' },
  { value: 'high', label: 'High (320kbps)' },
];

export function ConversionSettings({ onConvert, progress }: ConversionSettingsProps) {
  const [settings, setSettings] = useState<ConversionSettings>({
    bitrate: 192,
    quality: 'medium',
  });

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Quality Preset</label>
        <Select<ConversionSettings['quality']>
          value={settings.quality}
          onValueChange={(value) => setSettings(s => ({ ...s, quality: value }))}
          options={qualities}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Custom Bitrate (kbps)</label>
        <Slider
          min={64}
          max={320}
          step={32}
          value={[settings.bitrate]}
          onValueChange={([value]) => setSettings(s => ({ ...s, bitrate: value }))}
        />
        <span className="text-sm text-gray-500">{settings.bitrate} kbps</span>
      </div>

      {progress !== undefined && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Converting...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} />
        </div>
      )}

      <div className="flex gap-2">
        <Button 
          onClick={() => onConvert(settings)}
          className="flex-1"
          disabled={progress !== undefined}
        >
          Convert to MP3
        </Button>
        {progress === 100 && (
          <Button className="bg-white text-gray-900 hover:bg-gray-100 border border-gray-200">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        )}
      </div>
    </div>
  );
}
