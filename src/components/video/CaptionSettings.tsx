import React from 'react';

interface CaptionSettingsProps {
  onChange: (settings: CaptionSettings) => void;
  settings: CaptionSettings;
}

interface CaptionSettings {
  fontSize: number;
  fontColor: string;
  position: 'top' | 'bottom';
  style: 'default' | 'highlight' | 'karaoke';
}

export function CaptionSettings({ onChange, settings }: CaptionSettingsProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Font Size
        </label>
        <input
          type="range"
          min="12"
          max="48"
          value={settings.fontSize}
          onChange={(e) => onChange({ ...settings, fontSize: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Font Color
        </label>
        <input
          type="color"
          value={settings.fontColor}
          onChange={(e) => onChange({ ...settings, fontColor: e.target.value })}
          className="h-8 w-8"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Position
        </label>
        <select
          value={settings.position}
          onChange={(e) => onChange({ ...settings, position: e.target.value as 'top' | 'bottom' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="top">Top</option>
          <option value="bottom">Bottom</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Style
        </label>
        <select
          value={settings.style}
          onChange={(e) => onChange({ ...settings, style: e.target.value as 'default' | 'highlight' | 'karaoke' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="default">Default</option>
          <option value="highlight">Highlight</option>
          <option value="karaoke">Karaoke</option>
        </select>
      </div>
    </div>
  );
}