import { type ChangeEvent } from 'react';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Slider } from '../ui/Slider';

interface Caption {
  text: string;
  startTime: number;
  endTime: number;
}

interface CaptionSettingsProps {
  settings: {
    fontSize: number;
    fontColor: string;
    position: 'bottom_left' | 'bottom_center' | 'bottom_right' |
              'middle_left' | 'middle_center' | 'middle_right' |
              'top_left' | 'top_center' | 'top_right';
    style: 'classic' | 'karaoke' | 'highlight' | 'underline' | 'word_by_word';
    fontFamily: string;
  };
  captions: Caption[];
  onCaptionsChange: (captions: Caption[]) => void;
  onChange: (settings: CaptionSettingsProps['settings']) => void;
}

const fonts = [
  'Arial',
  'Arial Black',
  'Arial CE',
  'Arial CE MT Black',
  'Arial Light',
  'Comic Neue',
  'DejaVu Sans',
  'Fredericka the Great',
  'Libre Baskerville',
  'Liberation Mono',
  'Liberation Sans',
  'Liberation Sans Narrow',
  'Liberation Serif',
  'Luckiest Guy',
  'Nanum Pen',
  'Noto Sans TC',
  'Nunito',
  'Oswald',
  'Pacifico',
  'Permanent Marker',
  'Roboto',
  'Shrikhand',
  'The Bold Font'
];

const positions = [
  { value: 'top_left', label: 'Top Left' },
  { value: 'top_center', label: 'Top Center' },
  { value: 'top_right', label: 'Top Right' },
  { value: 'middle_left', label: 'Middle Left' },
  { value: 'middle_center', label: 'Middle Center' },
  { value: 'middle_right', label: 'Middle Right' },
  { value: 'bottom_left', label: 'Bottom Left' },
  { value: 'bottom_center', label: 'Bottom Center' },
  { value: 'bottom_right', label: 'Bottom Right' },
];

const styles = [
  { value: 'classic', label: 'Classic' },
  { value: 'karaoke', label: 'Karaoke' },
  { value: 'highlight', label: 'Highlight' },
  { value: 'underline', label: 'Underline' },
  { value: 'word_by_word', label: 'Word by Word' },
];

export function CaptionSettings({ settings, captions, onCaptionsChange, onChange }: CaptionSettingsProps) {
  const handleCaptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split('\n');
    const newCaptions = lines.map((text, index) => ({
      text,
      startTime: captions[index]?.startTime || 0,
      endTime: captions[index]?.endTime || 0
    }));
    onCaptionsChange(newCaptions);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium pb-1">Captions</label>
        <textarea
          value={captions.map(c => c.text).join('\n')}
          onChange={handleCaptionChange}
          rows={4}
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-800 dark:border-gray-700"
          placeholder="Enter captions, one per line..."
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium pb-1">Font Family</label>
        <Select
          value={settings.fontFamily}
          onValueChange={(value: string) => onChange({ ...settings, fontFamily: value })}
          options={fonts.map(font => ({ value: font, label: font }))}
          className="z-10"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium pb-1">Font Size</label>
        <Slider
          min={12}
          max={72}
          step={1}
          value={[settings.fontSize]}
          onValueChange={([value]) => onChange({ ...settings, fontSize: value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium pb-1">Font Color</label>
        <Input
          type="color"
          value={settings.fontColor}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ ...settings, fontColor: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium pb-1">Position</label>
        <Select<CaptionSettingsProps['settings']['position']>
          value={settings.position}
          onValueChange={(value) => onChange({ ...settings, position: value })}
          options={positions as Array<{ value: CaptionSettingsProps['settings']['position']; label: string }>}
          className="z-10"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium pb-1">Style</label>
        <Select<CaptionSettingsProps['settings']['style']>
          value={settings.style}
          onValueChange={(value) => onChange({ ...settings, style: value })}
          options={styles as Array<{ value: CaptionSettingsProps['settings']['style']; label: string }>}
          className="z-10"
        />
      </div>
    </div>
  );
}
