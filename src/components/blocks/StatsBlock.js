'use client';

import { FaTrophy, FaGithub } from 'react-icons/fa';
import { useEditor } from '@/context/EditorContext';

const THEMES = [
  { value: 'transparent', label: 'Transparent' },
  { value: 'dark', label: 'Dark' },
  { value: 'radical', label: 'Radical' },
  { value: 'merko', label: 'Merko' },
  { value: 'gruvbox', label: 'Gruvbox' },
  { value: 'tokyonight', label: 'Tokyo Night' },
  { value: 'onedark', label: 'One Dark' },
  { value: 'cobalt', label: 'Cobalt' },
  { value: 'dracula', label: 'Dracula' },
];

const STAT_OPTIONS = [
  { key: 'showCommits', label: 'All Commits', param: 'include_all_commits=true' },
  { key: 'showPRs', label: 'Pull Requests', param: 'count_prs=true' },
  { key: 'showIssues', label: 'Issues', param: 'count_issues=true' },
  { key: 'showStars', label: 'Stars', param: 'show_stars=true' },
  { key: 'showPrivate', label: 'Private Contributions', param: 'count_private=true' },
  { key: 'showIcons', label: 'Show Icons', param: 'show_icons=true' },
  { key: 'showRank', label: 'Show Rank Card', param: 'rank_icon=github' },
  { key: 'hideTitle', label: 'Hide Title', param: 'hide_title=true' },
  { key: 'hideBorder', label: 'Hide Border', param: 'hide_border=true' },
];

const generateStatsUrl = (username, options) => {
  if (!username) return null;
  
  const baseUrl = 'https://github-readme-stats.vercel.app/api';
  const params = [];
  
  // Add selected stat parameters
  Object.entries(options).forEach(([key, value]) => {
    if (value && key !== 'username' && key !== 'theme') {
      const option = STAT_OPTIONS.find(opt => opt.key === key);
      if (option) params.push(option.param);
    }
  });

  // Add theme
  params.push(`theme=${options.theme || 'transparent'}`);

  return `${baseUrl}?username=${username}&${params.join('&')}`;
};

const generateMdxCode = (data) => {
  if (!data?.username) return '';
  
  return `## 📊 GitHub Stats

![GitHub Stats](${generateStatsUrl(data.username, data)})`;
};

export default function StatsBlock({ data, onChange }) {
  const { preview } = useEditor();
  const handleCheckboxChange = (key) => {
    onChange(key, !data?.[key]);
  };

  const handleUsernameChange = (e) => {
    onChange('username', e.target.value);
  };

  return (
    <div className="space-y-4 p-4 border border-gray-300 rounded-md">
      {/* Title */}
      <div className="flex items-center space-x-2">
        <FaTrophy className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-900">GitHub Stats</h3>
      </div>

      {/* Username input */}
      <div>
        <label htmlFor="github-username" className="block text-sm font-medium text-gray-700">
          GitHub Username
        </label>
        <input
          id="github-username"
          type="text"
          value={data?.username || ''}
          onChange={(e) => onChange('username', e.target.value)}
          placeholder="e.g. octocat"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Theme Selection */}
      <div>
        <label htmlFor="theme-select" className="block text-sm font-medium text-gray-700">
          Theme
        </label>
        <select
          id="theme-select"
          value={data?.theme || 'transparent'}
          onChange={(e) => onChange('theme', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {THEMES.map(theme => (
            <option key={theme.value} value={theme.value}>
              {theme.label}
            </option>
          ))}
        </select>
      </div>

      {/* Checkboxes */}
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Select Stats to Show</p>
        <div className="space-y-2">
          {STAT_OPTIONS.map(({ key, label }) => (
            <label key={key} className="flex items-center space-x-2 text-sm text-gray-800">
              <input
                type="checkbox"
                checked={data?.[key] || false}
                onChange={() => handleCheckboxChange(key)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Preview Section */}
      {data?.username && (
        <div className="mt-6 border-t pt-4">
          <p className="text-sm font-medium text-gray-700 mb-3">Live Preview</p>
          
          {preview ? (
            // Preview Mode - Show MDX
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap text-sm font-mono text-gray-700">
                {generateMdxCode(data)}
              </pre>
            </div>
          ) : (
            // Edit Mode - Show Live Preview
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-2 mb-2">
                <FaGithub className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">GitHub Stats Preview</span>
              </div>
              <img 
                src={generateStatsUrl(data.username, data)}
                alt="GitHub Stats"
                className="w-full h-auto"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden text-sm text-red-500 mt-2">
                Failed to load GitHub stats. Please check the username.
              </div>
            </div>
          )}

          {/* Message when nothing is selected */}
          {!Object.values(data).slice(1).some(Boolean) && (
            <p className="text-sm text-gray-500 text-center py-4">
              Select some stats to display them in your README
            </p>
          )}
        </div>
      )}
    </div>
  );
}
