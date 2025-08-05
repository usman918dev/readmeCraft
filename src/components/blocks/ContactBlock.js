'use client';
import { FaEnvelope } from 'react-icons/fa';
export default function ContactBlock({ data, onChange }) {
  return (
    <div>
      <div className="flex items-center mb-3">
        <FaEnvelope className="w-5 h-5 text-gray-500 mr-2" />
        <h3 className="font-medium text-gray-900">Contact Me</h3>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            value={data?.email || ''}
            onChange={e => onChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <input
            type="text"
            value={data?.linkedin || ''}
            onChange={e => onChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
          <input
            type="text"
            value={data?.twitter || ''}
            onChange={e => onChange('twitter', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}
