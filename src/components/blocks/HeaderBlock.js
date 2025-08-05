'use client';
import { FaUser } from 'react-icons/fa';
export default function HeaderBlock({ data, onChange }) {
  return (
    <div>
      <div className="flex items-center mb-3">
        <FaUser className="w-5 h-5 text-gray-500 mr-2" />
        <h3 className="font-medium text-gray-900">Header / Title</h3>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            value={data?.name || ''}
            onChange={e => onChange('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
          <input
            type="text"
            value={data?.subtitle || ''}
            onChange={e => onChange('subtitle', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
