'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEditor, useEditorDispatch } from '@/context/EditorContext';
import { BLOCK_TYPES } from '@/lib/blocks';

import HeaderBlock from './blocks/HeaderBlock';
import AboutBlock from './blocks/AboutBlock';
import TechStackBlock from './blocks/TechStackBlock';
import StatsBlock from './blocks/StatsBlock';
import ContactBlock from './blocks/ContactBlock';
import CustomBlock from './blocks/CustomBlock';

const BlockComponents = {
  [BLOCK_TYPES.HEADER]: HeaderBlock,
  [BLOCK_TYPES.ABOUT]: AboutBlock,
  [BLOCK_TYPES.TECH_STACK]: TechStackBlock,
  [BLOCK_TYPES.STATS]: StatsBlock,
  [BLOCK_TYPES.CONTACT]: ContactBlock,
  [BLOCK_TYPES.CUSTOM]: CustomBlock,
};

export function Block({ block }) {
  const dispatch = useEditorDispatch();
  const { activeBlock } = useEditor();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: block.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Safely update nested fields in block.data
  const handleFieldChange = (fieldId, value) => {
    dispatch({
      type: 'UPDATE_BLOCK',
      blockId: block.id,
      updates: {
        data: {
          ...block.data,
          [fieldId]: value,
        },
      },
    });
  };

  const BlockComponent = BlockComponents[block.type];
  if (!BlockComponent) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative p-4 mb-4 border rounded-lg transition-all ${
        activeBlock === block.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      }`}
    >
      {/* Drag handle */}
      <div
        {...attributes}
        {...listeners}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 cursor-move p-1 hover:bg-gray-100 rounded"
      >
        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zM13 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
        </svg>
      </div>

      {/* Delete button */}
      <button
        onClick={() => dispatch({ type: 'REMOVE_BLOCK', blockId: block.id })}
        className="absolute top-2 right-8 opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded"
      >
        <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Render the specific block component */}
      <BlockComponent data={block.data} onChange={handleFieldChange} />
    </div>
  );
}
