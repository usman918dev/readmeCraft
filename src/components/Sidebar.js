'use client';

function getDefaultDataForBlock(type) {
  switch (type) {
    case 'stats':
      return {
        username: '',
        showCommits: true,
        showPRs: true,
        showIssues: true,
        showStars: true,
        showRepos: true,
      };
    case 'header':
      return {
        title: 'Welcome to My README',
        subtitle: '',
      };
    case 'about':
      return {
        bio: '',
      };
    // Add more cases for other block types as needed
    default:
      return {};
  }
}

import { useState } from 'react';
import { useEditorDispatch } from '@/context/EditorContext';
import { BLOCKS } from '@/lib/blocks';

export function Sidebar() {
  const dispatch = useEditorDispatch();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlocks = BLOCKS.filter(block =>
    block.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddBlock = (blockType) => {
    const blockMeta = BLOCKS.find(b => b.id === blockType);
    const block = {
      id: `block-${Date.now()}`,
      type: blockType,
      data: blockMeta?.defaultData || getDefaultDataForBlock(blockType),
    };

    dispatch({ type: 'ADD_BLOCK', block });
  };

  return (
    <div className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search blocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {filteredBlocks.map((block) => (
            <div
              key={block.id}
              onClick={() => handleAddBlock(block.id)}
              className="p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center mb-1">
                <block.icon className="w-4 h-4 text-gray-500 mr-2" />
                <h3 className="font-medium text-gray-900">{block.title}</h3>
              </div>
              <p className="text-sm text-gray-500">{block.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
