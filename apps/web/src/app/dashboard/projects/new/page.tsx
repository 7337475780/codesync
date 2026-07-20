"use client";

import { useState } from "react";
import { FolderGit2, Github, Copy, ArrowLeft } from "lucide-react";
import { Button } from "@codesync/ui/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCreate = () => {
    setLoading(true);
    // Simulate creation and navigate to a new dummy project ID
    setTimeout(() => {
      const newId = Math.random().toString(36).substring(7);
      router.push(`/dashboard/projects/${newId}/editor`);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto p-4 md:p-8">
      
      {/* Header */}
      <div className="flex flex-col gap-2">
        <Link href="/dashboard/projects" className="text-sm text-gray-500 hover:text-white flex items-center gap-1 transition-colors w-fit mb-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
        <h1 className="text-2xl font-bold text-white tracking-tight">Create a new Project</h1>
        <p className="text-gray-400 text-sm">Choose how you want to start building.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Blank Project */}
        <div 
          onClick={handleCreate}
          className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 hover:border-[#8b5cf6]/50 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8b5cf6]/20 to-[#8b5cf6]/5 flex items-center justify-center border border-white/5 group-hover:bg-[#8b5cf6]/20 transition-colors">
            <FolderGit2 className="w-6 h-6 text-[#8b5cf6]" />
          </div>
          <div>
            <h3 className="text-white font-medium text-lg">Blank Project</h3>
            <p className="text-sm text-gray-500 mt-1">Start from an empty directory with basic Next.js setup.</p>
          </div>
          <Button 
            className="w-full mt-auto bg-white/5 hover:bg-white/10 text-white"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Select'}
          </Button>
        </div>

        {/* Templates */}
        <Link href="/dashboard/templates">
          <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 hover:border-emerald-500/50 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col gap-4 h-full">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center border border-white/5 group-hover:bg-emerald-500/20 transition-colors">
              <Copy className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-white font-medium text-lg">Use a Template</h3>
              <p className="text-sm text-gray-500 mt-1">Jumpstart your project with a pre-configured template.</p>
            </div>
            <Button className="w-full mt-auto bg-white/5 hover:bg-white/10 text-white">
              Browse Templates
            </Button>
          </div>
        </Link>

        {/* GitHub Import */}
        <Link href="/dashboard/projects/import">
          <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 hover:border-blue-500/50 hover:-translate-y-1 transition-all cursor-pointer group flex flex-col gap-4 h-full">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 flex items-center justify-center border border-white/5 group-hover:bg-blue-500/20 transition-colors">
              <Github className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-white font-medium text-lg">Import Repository</h3>
              <p className="text-sm text-gray-500 mt-1">Import an existing project directly from GitHub.</p>
            </div>
            <Button className="w-full mt-auto bg-white/5 hover:bg-white/10 text-white">
              Import
            </Button>
          </div>
        </Link>
      </div>
    </div>
  );
}
