'use client';

import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useEditor, useEditorDispatch } from '@/context/EditorContext';
import { Block } from './Block';

export function Editor() {
  const { blocks } = useEditor();
  const dispatch = useEditorDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = blocks.findIndex(block => block.id === active.id);
      const newIndex = blocks.findIndex(block => block.id === over.id);
      
      const newBlocks = [...blocks];
      const [movedBlock] = newBlocks.splice(oldIndex, 1);
      newBlocks.splice(newIndex, 0, movedBlock);
      
      dispatch({ type: 'REORDER_BLOCKS', blocks: newBlocks });
    }
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm min-h-[calc(100vh-10rem)]">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="p-8">
            {blocks.length === 0 ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <p className="text-gray-500">Drag and drop blocks here or click blocks from the sidebar to add them</p>
              </div>
            ) : (
              <SortableContext items={blocks} strategy={verticalListSortingStrategy}>
                {blocks.map(block => (
                  <Block key={block.id} block={block} />
                ))}
              </SortableContext>
            )}
          </div>
        </DndContext>
      </div>
    </div>
  );
}
