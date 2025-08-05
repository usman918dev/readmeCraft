import {
  FaUser,
  FaCode,
  FaBriefcase,
  FaTrophy,
  FaEnvelope,
  FaMarkdown
} from 'react-icons/fa';

export const BLOCK_TYPES = {
  HEADER: 'header',
  ABOUT: 'about',
  TECH_STACK: 'techStack',
  STATS: 'stats',
  TROPHIES: 'trophies',
  PROJECTS: 'projects',
  CONTACT: 'contact',
  CUSTOM: 'custom',
};

export const BLOCKS = [
  {
    id: BLOCK_TYPES.HEADER,
    title: 'Header / Title',
    description: 'Add your name and introduction',
    icon: FaUser,
    template: '# Hi there 👋\n\nI\'m [Your Name]',
    fields: [
      { id: 'name', label: 'Your Name', type: 'text' },
      { id: 'subtitle', label: 'Subtitle', type: 'text' },
    ]
  },
  {
    id: BLOCK_TYPES.ABOUT,
    title: 'About Me',
    description: 'Describe yourself and your work',
    icon: FaBriefcase,
    template: '## About Me\n\n[Your description]',
    fields: [
      { id: 'description', label: 'Description', type: 'textarea' },
    ]
  },
  {
    id: BLOCK_TYPES.TECH_STACK,
    title: 'Tech Stack',
    description: 'Showcase your skills and tools',
    icon: FaCode,
    template: '## Tech Stack\n\n[Technologies]',
    fields: [
      { id: 'technologies', label: 'Technologies', type: 'tags' },
    ]
  },
  {
    id: BLOCK_TYPES.STATS,
    title: 'GitHub Stats',
    description: 'Display your GitHub statistics',
    icon: FaTrophy,
    template: '## GitHub Stats\n\n![Stats](https://github-readme-stats.vercel.app/api?username=[username])',
    fields: [
      { id: 'username', label: 'GitHub Username', type: 'text' },
    ],
    defaultData: {
      username: '',
      showCommits: true,
      showPRs: true,
      showIssues: true,
      showStars: true,
      showRepos: true,
    }
  }
  ,
  {
    id: BLOCK_TYPES.CONTACT,
    title: 'Contact Me',
    description: 'Add your contact information',
    icon: FaEnvelope,
    template: '## Contact\n\n[Contact information]',
    fields: [
      { id: 'email', label: 'Email', type: 'text' },
      { id: 'linkedin', label: 'LinkedIn', type: 'text' },
      { id: 'twitter', label: 'Twitter', type: 'text' },
    ]
  },
  {
    id: BLOCK_TYPES.CUSTOM,
    title: 'Custom Text',
    description: 'Add custom markdown content',
    icon: FaMarkdown,
    template: '',
    fields: [
      { id: 'content', label: 'Content', type: 'markdown' },
    ]
  },
];
