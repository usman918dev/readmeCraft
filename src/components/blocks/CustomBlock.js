'use client';
import { FaMarkdown } from 'react-icons/fa';
export default function CustomBlock({ data, onChange }) {
  return (
    <div>
      <div className="flex items-center mb-3">
        <FaMarkdown className="w-5 h-5 text-gray-500 mr-2" />
        <h3 className="font-medium text-gray-900">Custom Text</h3>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Content (Markdown)</label>
        <textarea
          value={data?.content || ''}
          onChange={e => onChange('content', e.target.value)}
          rows={6}
          className="w-full px-3 py-2 font-mono text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter markdown content..."
        />
      </div>
    </div>
  );
}
