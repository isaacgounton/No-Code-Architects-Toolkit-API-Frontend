import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPreviewProps {
  url: string;
  onReady?: () => void;
  onError?: (error: Error) => void;
}

export function VideoPreview({ url, onReady, onError }: VideoPreviewProps) {
  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        controls
        onReady={onReady}
        onError={onError}
      />
    </div>
  );
}