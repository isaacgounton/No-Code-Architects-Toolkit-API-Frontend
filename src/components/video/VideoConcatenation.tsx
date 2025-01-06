import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, X } from 'lucide-react';

interface Video {
  id: string;
  url: string;
}

interface VideoConcatenationProps {
  videos: Video[];
  onVideosChange: (videos: Video[]) => void;
}

export function VideoConcatenation({ videos, onVideosChange }: VideoConcatenationProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(videos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onVideosChange(items);
  };

  const removeVideo = (id: string) => {
    onVideosChange(videos.filter(video => video.id !== id));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="videos">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {videos.map((video, index) => (
              <Draggable key={video.id} draggableId={video.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm"
                  >
                    <div {...provided.dragHandleProps} className="mr-3">
                      <GripVertical className="text-gray-400" />
                    </div>
                    <span className="flex-1 truncate">{video.url}</span>
                    <button
                      onClick={() => removeVideo(video.id)}
                      className="ml-2 text-gray-400 hover:text-red-500"
                    >
                      <X size={18} />
                    </button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}