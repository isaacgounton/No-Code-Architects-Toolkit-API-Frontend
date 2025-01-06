import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { GripVertical, X } from 'lucide-react';
import { VideoPreview } from './VideoPreview';

interface Video {
  id: string;
  url: string;
}

interface VideoConcatenationProps {
  videos: Video[];
  onVideosChange: (videos: Video[]) => void;
}

export function VideoConcatenation({ videos, onVideosChange }: VideoConcatenationProps) {
  const handleDragEnd = (result: DropResult) => {
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
            className="space-y-4"
          >
            {videos.map((video, index) => (
              <Draggable key={video.id} draggableId={video.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg"
                  >
                    <div {...provided.dragHandleProps}>
                      <GripVertical className="h-5 w-5 text-gray-500" />
                    </div>
                    <div className="w-48 h-24 relative">
                      <VideoPreview url={video.url} />
                    </div>
                    <div className="flex-1 truncate">{video.url}</div>
                    <button
                      onClick={() => removeVideo(video.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      aria-label={`Remove video ${video.url}`}
                    >
                      <X className="h-5 w-5" />
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