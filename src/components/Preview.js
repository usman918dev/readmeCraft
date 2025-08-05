'use client';

import { useEditor, useEditorDispatch } from '@/context/EditorContext';
import { marked } from 'marked';
import { generateMarkdown } from '@/lib/export';
import { useEffect } from 'react';

// Configure marked for GitHub-style rendering
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
});

export function Preview() {
  const { blocks, preview } = useEditor();
  const dispatch = useEditorDispatch();

  const markdown = generateMarkdown(blocks);
  const html = marked(markdown);

  useEffect(() => {
    // Apply GitHub-style syntax highlighting
    if (typeof window !== 'undefined' && window.Prism) {
      window.Prism.highlightAll();
    }
  }, [html]);

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-900">Preview</h2>
          <button 
            onClick={() => dispatch({ type: 'TOGGLE_PREVIEW' })}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {preview ? 'View Markdown' : 'View Preview'}
          </button>
        </div>
        
        {preview ? (
          <div 
            className="prose prose-sm max-w-none markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-700 p-4 bg-gray-50 rounded-lg">
            {markdown}
          </pre>
        )}
      </div>
    </div>
  );
}
