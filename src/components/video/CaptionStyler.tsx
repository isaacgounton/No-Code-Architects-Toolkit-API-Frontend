import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Switch } from '../ui/Switch';
import { ColorPicker } from '../ui/ColorPicker';
import { Label } from '../ui/Label';
import { Button } from '../ui/Button';
import type { CaptionSettings, VideoPosition, CaptionStyle, TextAlignment, TextReplacement } from '../../types/video';

interface CaptionStylerProps {
  settings: CaptionSettings;
  onChange: (settings: CaptionSettings) => void;
  onCaptionsChange: (text: string) => void;
  onReplacementsChange: (replacements: TextReplacement[]) => void;
  onLanguageChange: (language: string | undefined) => void;
  captions: string;
  replacements: TextReplacement[];  // This is required but might be empty
  language?: string;
}

export const CaptionStyler: React.FC<CaptionStylerProps> = ({
  settings,
  onChange,
  onCaptionsChange,
  onReplacementsChange,
  onLanguageChange,
  captions = '',  // Default value
  replacements = [],  // Default value
  language
}) => {
  const fontFamilies = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Arial Black', label: 'Arial Black' },
    { value: 'Arial CE', label: 'Arial CE' },
    { value: 'Arial CE MT Black', label: 'Arial CE MT Black' },
    { value: 'Arial Light', label: 'Arial Light' },
    { value: 'Comic Neue', label: 'Comic Neue' },
    { value: 'DejaVu Sans', label: 'DejaVu Sans' },
    { value: 'Fredericka the Great', label: 'Fredericka the Great' },
    { value: 'Libre Baskerville', label: 'Libre Baskerville' },
    { value: 'Liberation Mono', label: 'Liberation Mono' },
    { value: 'Liberation Sans', label: 'Liberation Sans' },
    { value: 'Liberation Sans Narrow', label: 'Liberation Sans Narrow' },
    { value: 'Liberation Serif', label: 'Liberation Serif' },
    { value: 'Luckiest Guy', label: 'Luckiest Guy' },
    { value: 'Nanum Pen', label: 'Nanum Pen' },
    { value: 'Noto Sans TC', label: 'Noto Sans TC' },
    { value: 'Nunito', label: 'Nunito' },
    { value: 'Oswald', label: 'Oswald' },
    { value: 'Pacifico', label: 'Pacifico' },
    { value: 'Permanent Marker', label: 'Permanent Marker' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Shrikhand', label: 'Shrikhand' },
    { value: 'The Bold Font', label: 'The Bold Font' }
  ];
  
  const positionOptions = [
    { value: 'bottom_left' as VideoPosition, label: 'Bottom Left' },
    { value: 'bottom_center' as VideoPosition, label: 'Bottom Center' },
    { value: 'bottom_right' as VideoPosition, label: 'Bottom Right' },
    { value: 'middle_left' as VideoPosition, label: 'Middle Left' },
    { value: 'middle_center' as VideoPosition, label: 'Middle Center' },
    { value: 'middle_right' as VideoPosition, label: 'Middle Right' },
    { value: 'top_left' as VideoPosition, label: 'Top Left' },
    { value: 'top_center' as VideoPosition, label: 'Top Center' },
    { value: 'top_right' as VideoPosition, label: 'Top Right' }
  ];

  const styleOptions = [
    { value: 'classic' as CaptionStyle, label: 'Classic (Normal captions)' },
    { value: 'karaoke' as CaptionStyle, label: 'Karaoke (Highlight words in sync)' },
    { value: 'highlight' as CaptionStyle, label: 'Highlight (Emphasize each word)' },
    { value: 'underline' as CaptionStyle, label: 'Underline (Underline each word)' },
    { value: 'word_by_word' as CaptionStyle, label: 'Word by Word (Show one at a time)' }
  ];

  const alignmentOptions = [
    { value: 'left' as TextAlignment, label: 'Left' },
    { value: 'center' as TextAlignment, label: 'Center' },
    { value: 'right' as TextAlignment, label: 'Right' }
  ];

  const languageOptions = [
    { value: 'auto', label: 'Auto Detect' },  // Changed from empty string to 'auto'
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'ru', label: 'Russian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'ko', label: 'Korean' },
    { value: 'zh', label: 'Chinese' }
  ];

  return (
    <div className="space-y-6">
      {/* Captions Input Group */}
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Caption Text</h3>
        
        <div className="space-y-4">
          <textarea
            value={captions}
            onChange={(e) => onCaptionsChange(e.target.value)}
            placeholder="Enter your captions here..."
            className="w-full h-32 px-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          />

          <Select
            label="Caption Language"
            value={language || 'auto'}  // Changed default value to 'auto'
            options={languageOptions}
            onValueChange={(value) => onLanguageChange(value === 'auto' ? undefined : value)}
          />
        </div>
      </div>

      {/* Text Replacements Group */}
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Text Replacements</h3>
        
        <div className="space-y-4">
          {replacements?.map((replacement, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder="Find text"
                value={replacement.find}
                onChange={(e) => {
                  const newReplacements = [...replacements];
                  newReplacements[index].find = e.target.value;
                  onReplacementsChange(newReplacements);
                }}
                className="flex-1"
              />
              <Input
                placeholder="Replace with"
                value={replacement.replace}
                onChange={(e) => {
                  const newReplacements = [...replacements];
                  newReplacements[index].replace = e.target.value;
                  onReplacementsChange(newReplacements);
                }}
                className="flex-1"
              />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  const newReplacements = replacements.filter((_, i) => i !== index);
                  onReplacementsChange(newReplacements);
                }}
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => onReplacementsChange([...(replacements || []), { find: '', replace: '' }])}
            className="w-full"
          >
            Add Replacement
          </Button>
        </div>
      </div>

      {/* Text Appearance Group */}
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
        <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Text Appearance</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <ColorPicker
            label="Line Color"
            value={settings.line_color || '#FFFFFF'}
            onChange={(color: string) => onChange({ ...settings, line_color: color })}
          />
          <ColorPicker
            label="Word Color"
            value={settings.word_color || '#000000'}
            onChange={(color: string) => onChange({ ...settings, word_color: color })}
          />
          <ColorPicker
            label="Outline Color"
            value={settings.outline_color || '#FFFFFF'}
            onChange={(color: string) => onChange({ ...settings, outline_color: color })}
          />
          <ColorPicker
            label="Background Color"
            value={settings.box_color || '#000000'}  // ✓ Correctly implemented
            onChange={(color: string) => onChange({ ...settings, box_color: color })}
          />
        </div>

        <div className="space-y-4">
          <Select
            label="Font Family"
            value={settings.font_family || 'Arial'}
            options={fontFamilies}
            onValueChange={(value: string) => onChange({ ...settings, font_family: value })}
          />

          <div className="space-y-2">
            <Label>Max Words Per Line</Label>
            <Input
              type="number"
              min={1}
              max={20}
              value={settings.max_words_per_line || 10}
              onChange={(e) => onChange({ ...settings, max_words_per_line: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </div>

      {/* Text Size and Spacing Group */}
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Text Size and Spacing</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Font Size (px)</Label>
              <Input
                type="number"
                min={12}
                max={72}
                value={settings.font_size || 24}
                onChange={(e) => onChange({ ...settings, font_size: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Letter Spacing (px)</Label>
              <Input
                type="number"
                min={0}
                max={20}
                value={settings.spacing || 2}
                onChange={(e) => onChange({ ...settings, spacing: parseInt(e.target.value) })}
              />
            </div>
          </div>
        </div>

      {/* Text Effects Group */}
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Text Effects</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Outline Width (px)</Label>
              <Input
                type="number"
                min={0}
                max={10}
                value={settings.outline_width || 2}
                onChange={(e) => onChange({ ...settings, outline_width: parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label>Shadow Offset (px)</Label>
              <Input
                type="number"
                min={0}
                max={20}
                value={settings.shadow_offset || 2}
                onChange={(e) => onChange({ ...settings, shadow_offset: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Text Angle (degrees)</Label>
            <Input
              type="number"
              min={-180}
              max={180}
              value={settings.angle || 0}
              onChange={(e) => onChange({ ...settings, angle: parseInt(e.target.value) })}
            />
          </div>
        </div>

      {/* Position Controls Group */}
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Caption Position</h3>
          
          <Select
            label="Preset Position"
            value={settings.position || 'bottom_center'}
            options={positionOptions}
            onValueChange={(value: VideoPosition) => onChange({ ...settings, position: value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Fine-tune X</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={settings.x || 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  onChange({ ...settings, x: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label>Fine-tune Y</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={settings.y || 0}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                  onChange({ ...settings, y: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>

      {/* Text Alignment Group */}
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Text Alignment</h3>
          
          <Select
            label="Text Alignment"
            value={settings.alignment || 'center'}
            options={alignmentOptions}
            onValueChange={(value: TextAlignment) => onChange({ ...settings, alignment: value })}
          />
        </div>

      {/* Caption Style Group */}
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Caption Animation Style</h3>
          
          <Select
            label="Animation Style"
            value={settings.style || 'classic'}
            options={styleOptions}
            onValueChange={(value: CaptionStyle) => onChange({ ...settings, style: value })}
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Choose how your captions will be displayed and animated on the video
          </p>
        </div>

      {/* Text Style Group */}
      <div className="space-y-4 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
          <h3 className="font-medium text-sm text-gray-900 dark:text-gray-100">Text Style</h3>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Bold</Label>
              <Switch
                checked={settings.bold || false}
                onCheckedChange={(checked: boolean) => onChange({ ...settings, bold: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label>Italic</Label>
              <Switch
                checked={settings.italic || false}
                onCheckedChange={(checked: boolean) => onChange({ ...settings, italic: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label>Underline</Label>
              <Switch
                checked={settings.underline || false}
                onCheckedChange={(checked: boolean) => onChange({ ...settings, underline: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label>Strikeout</Label>
              <Switch
                checked={settings.strikeout || false}
                onCheckedChange={(checked: boolean) => onChange({ ...settings, strikeout: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label>All Caps</Label>
              <Switch
                checked={settings.all_caps || false}
                onCheckedChange={(checked: boolean) => onChange({ ...settings, all_caps: checked })}
              />
            </div>
          </div>
        </div>
    </div>
  );
};
