'use client';
import { FaCode } from 'react-icons/fa';
export default function TechStackBlock({ data, onChange }) {
  return (
    <div>
      <div className="flex items-center mb-3">
        <FaCode className="w-5 h-5 text-gray-500 mr-2" />
        <h3 className="font-medium text-gray-900">Tech Stack</h3>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma separated)</label>
        <input
          type="text"
          value={data?.technologies ? data.technologies.join(', ') : ''}
          onChange={e => onChange('technologies', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
