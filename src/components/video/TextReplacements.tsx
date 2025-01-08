import React from 'react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { TextReplacement } from '../../types/video';

interface TextReplacementsProps {
  replacements: TextReplacement[];
  onChange: (replacements: TextReplacement[]) => void;
}

export const TextReplacements: React.FC<TextReplacementsProps> = ({ replacements, onChange }) => {
  const addReplacement = () => {
    onChange([...replacements, { find: '', replace: '' }]);
  };

  const updateReplacement = (index: number, field: keyof TextReplacement, value: string) => {
    const updated = replacements.map((rep, i) => 
      i === index ? { ...rep, [field]: value } : rep
    );
    onChange(updated);
  };

  const removeReplacement = (index: number) => {
    onChange(replacements.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Text Replacements</h3>
      
      {replacements.map((replacement, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Input
            placeholder="Find text"
            value={replacement.find}
            onChange={(e) => updateReplacement(index, 'find', e.target.value)}
          />
          <Input
            placeholder="Replace with"
            value={replacement.replace}
            onChange={(e) => updateReplacement(index, 'replace', e.target.value)}
          />
          <Button
            variant="destructive"
            size="icon"
            onClick={() => removeReplacement(index)}
          >
            ×
          </Button>
        </div>
      ))}

      <Button
        variant="outline"
        onClick={addReplacement}
        className="w-full"
      >
        Add Replacement
      </Button>
    </div>
  );
};
