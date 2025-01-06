import React from 'react';
import { Plus } from 'lucide-react';

interface VideoUrlInputProps {
  onAdd: (url: string) => void;
}

export function VideoUrlInput({ onAdd }: VideoUrlInputProps) {
  const [url, setUrl] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAdd(url.trim());
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter video URL"
        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        aria-label="Add video URL"
        title="Add video URL"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Add video URL</span>
      </button>
    </form>
  );
}