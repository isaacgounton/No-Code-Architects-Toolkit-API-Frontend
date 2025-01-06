import { type ChangeEvent } from 'react';
import { Select } from '../ui/Select';
import { Input } from '../ui/Input';
import { Slider } from '../ui/Slider';

interface CaptionSettingsProps {
  settings: {
    fontSize: number;
    fontColor: string;
    position: 'top' | 'middle' | 'bottom';
    style: 'default' | 'highlight' | 'karaoke' | 'outline';
    fontFamily: string;
  };
  onChange: (settings: CaptionSettingsProps['settings']) => void;
}

const fonts = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Courier New',
  'Georgia',
  'Impact',
];

const positions = [
  { value: 'top', label: 'Top' },
  { value: 'middle', label: 'Middle' },
  { value: 'bottom', label: 'Bottom' },
];

const styles = [
  { value: 'default', label: 'Default' },
  { value: 'highlight', label: 'Highlight' },
  { value: 'karaoke', label: 'Karaoke' },
  { value: 'outline', label: 'Outline' },
];

export function CaptionSettings({ settings, onChange }: CaptionSettingsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Font Family</label>
        <Select
          value={settings.fontFamily}
          onValueChange={(value: string) => onChange({ ...settings, fontFamily: value })}
          options={fonts.map(font => ({ value: font, label: font }))}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Font Size</label>
        <Slider
          min={12}
          max={72}
          step={1}
          value={[settings.fontSize]}
          onValueChange={([value]) => onChange({ ...settings, fontSize: value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Font Color</label>
        <Input
          type="color"
          value={settings.fontColor}
          onChange={(e: ChangeEvent<HTMLInputElement>) => onChange({ ...settings, fontColor: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Position</label>
        <Select<CaptionSettingsProps['settings']['position']>
          value={settings.position}
          onValueChange={(value) => onChange({ ...settings, position: value })}
          options={positions as Array<{ value: CaptionSettingsProps['settings']['position']; label: string }>}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Style</label>
        <Select<CaptionSettingsProps['settings']['style']>
          value={settings.style}
          onValueChange={(value) => onChange({ ...settings, style: value })}
          options={styles as Array<{ value: CaptionSettingsProps['settings']['style']; label: string }>}
        />
      </div>
    </div>
  );
}