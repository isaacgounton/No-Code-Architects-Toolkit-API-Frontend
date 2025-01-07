import React from 'react';
import { cn } from '../../lib/utils';

export interface VideoPreviewProps {
  url: string;
  showControls?: boolean;
  className?: string;
  isLoading?: boolean;
}

export function VideoPreview({ 
  url, 
  showControls = false, 
  className,
  isLoading = false
}: VideoPreviewProps) {
  return (
    <div className={cn('relative', className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/50 dark:bg-gray-800/50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-gray-100" />
        </div>
      )}
      <video
        src={url}
        controls={showControls}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
