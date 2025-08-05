'use client';

'use client';

import Image from "next/image";
import { EditorProvider } from "@/context/EditorContext";
import { Sidebar } from "@/components/Sidebar";
import { Editor } from "@/components/Editor";
import { Preview } from "@/components/Preview";
import { useEditor } from "@/context/EditorContext";
import { generateMarkdown, copyToClipboard, downloadMarkdown } from "@/lib/export";
import { useState } from "react";

function Navbar() {
  const { blocks } = useEditor();
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    const markdown = generateMarkdown(blocks);
    const success = await copyToClipboard(markdown);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const markdown = generateMarkdown(blocks);
    downloadMarkdown(markdown);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <Image src="/file.svg" alt="ReadmeCraft Logo" width={32} height={32} className="w-8 h-8" />
        <h1 className="text-xl font-semibold text-gray-900">ReadmeCraft</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleCopyToClipboard}
          className={`px-4 py-2 text-sm font-medium ${
            copied
              ? "text-green-700 bg-green-50 border-green-200"
              : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
          } border rounded-md transition-colors`}
        >
          {copied ? "Copied!" : "Copy to Clipboard"}
        </button>
        <button
          onClick={handleDownload}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Download .md
        </button>
      </div>
    </nav>
  );
}

export default function Home() {
  return (
    <EditorProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Editor />
          <Preview />
        </div>
      </div>
    </EditorProvider>
  );
}
