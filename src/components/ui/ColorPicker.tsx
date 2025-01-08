import React from 'react';

interface ColorPickerProps {
  label?: string;
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  className = '',
}) => {
  const id = React.useId();
  const colorPickerId = `${id}-color-picker`;
  const hexInputId = `${id}-hex-input`;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label 
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor={colorPickerId}
        >
          {label}
        </label>
      )}
      <div className="flex gap-2 items-center">
        <input
          id={colorPickerId}
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-8 rounded border border-gray-300 dark:border-gray-700 cursor-pointer"
          aria-label={label || "Color picker"}
          title={label || "Choose color"}
        />
        <input
          id={hexInputId}
          type="text"
          value={value}
          onChange={(e) => {
            const validHexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
            if (validHexColor.test(e.target.value)) {
              onChange(e.target.value);
            }
          }}
          className="flex-1 px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
          placeholder="Enter hex color (#000000)"
          aria-label={`${label || "Color"} hex value`}
        />
      </div>
    </div>
  );
};
