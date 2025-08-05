'use client';

import { createContext, useContext, useReducer } from 'react';

const EditorContext = createContext(null);
const EditorDispatchContext = createContext(null);

const initialState = {
  blocks: [],
  activeBlock: null,
  preview: true,
};

export function EditorProvider({ children }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);

  return (
    <EditorContext.Provider value={state}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}

export function useEditorDispatch() {
  const context = useContext(EditorDispatchContext);
  if (!context) {
    throw new Error('useEditorDispatch must be used within an EditorProvider');
  }
  return context;
}

function editorReducer(state, action) {
  switch (action.type) {
    case 'ADD_BLOCK': {
      return {
        ...state,
        blocks: [...state.blocks, action.block],
      };
    }
case 'UPDATE_BLOCK': {
  return {
    ...state,
    blocks: state.blocks.map(block => {
      if (block.id !== action.blockId) return block;

      return {
        ...block,
        ...action.updates,
        data: {
          ...block.data,
          ...(action.updates.data || {}),
        },
      };
    }),
  };
}


    case 'REMOVE_BLOCK': {
      return {
        ...state,
        blocks: state.blocks.filter(block => block.id !== action.blockId),
      };
    }
    case 'REORDER_BLOCKS': {
      return {
        ...state,
        blocks: action.blocks,
      };
    }
    case 'SET_ACTIVE_BLOCK': {
      return {
        ...state,
        activeBlock: action.blockId,
      };
    }
    case 'TOGGLE_PREVIEW': {
      return {
        ...state,
        preview: !state.preview,
      };
    }
    default: {
      throw new Error('Unknown action: ' + action.type);
    }
  }
}
