'use client';
import { FaBriefcase } from 'react-icons/fa';
export default function AboutBlock({ data, onChange }) {
  return (
    <div>
      <div className="flex items-center mb-3">
        <FaBriefcase className="w-5 h-5 text-gray-500 mr-2" />
        <h3 className="font-medium text-gray-900">About Me</h3>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          value={data?.description || ''}
          onChange={e => onChange('description', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
