import React from 'react';
import { cn } from '../../lib/utils';

export interface VideoPreviewProps {
  url: string;
  onError?: () => void;
  showControls?: boolean;
  className?: string;
}

export function VideoPreview({ url, onError, showControls = false, className }: VideoPreviewProps) {
  return (
    <video
      src={url}
      controls={showControls}
      onError={onError}
      className={cn("w-full h-full object-cover", className)}
    />
  );
}