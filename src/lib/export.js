import { BLOCKS } from './blocks';

export function generateMarkdown(blocks) {
  return blocks.map(block => {
    const blockConfig = BLOCKS.find(b => b.id === block.type);
    if (!blockConfig) return '';

    let template = blockConfig.template;
    
    // Replace template variables with actual data
    if (block.type === 'header') {
      template = `# Hi there 👋\n\nI'm ${block.data?.name || '[Your Name]'}\n${block.data?.subtitle ? `\n${block.data.subtitle}` : ''}`;
    } else if (block.type === 'techStack') {
      const technologies = block.data?.technologies || [];
      const techBadges = technologies.map(tech => 
        `![${tech}](https://img.shields.io/badge/-${tech}-05122A?style=flat)`
      ).join(' ');
      template = `## Tech Stack\n\n${techBadges || '[Technologies]'}`;
    } else if (block.type === 'contact') {
      let contactInfo = '## Contact Me\n\n';
      if (block.data?.email) {
        contactInfo += `📫 Email: ${block.data.email}\n`;
      }
      if (block.data?.linkedin) {
        contactInfo += `👔 LinkedIn: [LinkedIn Profile](${block.data.linkedin})\n`;
      }
      if (block.data?.twitter) {
        contactInfo += `🐦 Twitter: [Twitter Profile](${block.data.twitter})\n`;
      }
      template = contactInfo;
    } else {
      // Handle other blocks
      Object.entries(block.data || {}).forEach(([key, value]) => {
        template = template.replace(`[${key}]`, value || `[${key}]`);
      });
    }

    return template;
  }).join('\n\n');
}

export async function copyToClipboard(markdown) {
  try {
    await navigator.clipboard.writeText(markdown);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
}

export function downloadMarkdown(markdown, filename = 'README.md') {
  const blob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
