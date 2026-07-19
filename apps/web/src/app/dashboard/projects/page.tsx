"use client";

import { useState, useEffect } from "react";
import { FolderGit2, Search, Plus, Filter, Grid, List as ListIcon } from "lucide-react";
import { Button } from "@codesync/ui/components/ui/button";
import { EmptyState } from "@codesync/ui/components/dashboard/empty-state";
import { ProjectSkeleton } from "@codesync/ui/components/dashboard/skeletons";
import Link from "next/link";
import { useDashboardStore } from "@/store/dashboard-store";

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const { projectViewMode, setProjectViewMode } = useDashboardStore();

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setProjects([
        { id: 1, name: "acme-frontend", framework: "Next.js", updated: "2h ago", status: "production" },
        { id: 2, name: "codesync-api", framework: "Express", updated: "5h ago", status: "preview" },
        { id: 3, name: "landing-page", framework: "Vite", updated: "1d ago", status: "production" },
      ]);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Projects</h1>
          <p className="text-gray-400 text-sm">Manage and deploy your workspaces.</p>
        </div>
        <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex items-center gap-3 w-full">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="w-full bg-[#111] border border-white/5 focus:border-[#8b5cf6]/50 rounded-lg h-10 pl-9 pr-4 text-sm text-white placeholder-gray-500 outline-none transition-colors"
          />
        </div>
        <Button variant="outline" className="bg-[#111] border-white/5 hover:bg-[#1a1a1a] text-gray-300">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        <div className="hidden sm:flex items-center p-1 bg-[#111] border border-white/5 rounded-lg ml-auto">
          <button 
            onClick={() => setProjectViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${projectViewMode === 'grid' ? 'bg-[#222] text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setProjectViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${projectViewMode === 'list' ? 'bg-[#222] text-white' : 'text-gray-500 hover:text-gray-300'}`}
          >
            <ListIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className={`grid gap-4 ${projectViewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {[1, 2, 3, 4, 5, 6].map(i => <ProjectSkeleton key={i} />)}
        </div>
      ) : projects.length > 0 ? (
        <div className={`grid gap-4 ${projectViewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {projects.map((project) => (
            <Link href={`/dashboard/projects/${project.id}`} key={project.id}>
              <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5 hover:border-white/10 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all cursor-pointer group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#222] to-[#111] border border-white/5 rounded-xl flex items-center justify-center shrink-0">
                    <FolderGit2 className="w-6 h-6 text-[#8b5cf6]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium group-hover:text-[#8b5cf6] transition-colors">{project.name}</h3>
                    <p className="text-[12px] text-gray-500">{project.framework} • Updated {project.updated}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${project.status === 'production' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span className="text-[12px] text-gray-400 capitalize">{project.status}</span>
                  </div>
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[10px] text-white">JD</div>
                    <div className="w-6 h-6 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-[10px] text-white">AS</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FolderGit2}
          title="No projects found"
          description="Get started by creating a new project or importing from GitHub."
          actionLabel="Create Project"
          onAction={() => {}}
        />
      )}
    </div>
  );
}
