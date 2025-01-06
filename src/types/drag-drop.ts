export interface DraggableLocation {
  droppableId: string;
  index: number;
}

export interface DraggableDroppableResult {
  draggableId: string;
  type: string;
  source: DraggableLocation;
  destination: DraggableLocation | null;
  reason: 'DROP' | 'CANCEL';
  mode: 'FLUID' | 'SNAP';
}
