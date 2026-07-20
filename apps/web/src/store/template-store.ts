import { create } from 'zustand';
import type { ProjectTemplate } from '@prisma/client';

export interface TemplateState {
  templates: Partial<ProjectTemplate>[];
  selectedTemplateId: string | null;
  isLoading: boolean;
  setTemplates: (templates: Partial<ProjectTemplate>[]) => void;
  setSelectedTemplate: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
  fetchTemplates: () => Promise<void>;
}

export const useTemplateStore = create<TemplateState>((set) => ({
  templates: [],
  selectedTemplateId: null,
  isLoading: false,
  setTemplates: (templates) => set({ templates }),
  setSelectedTemplate: (id) => set({ selectedTemplateId: id }),
  setLoading: (loading) => set({ isLoading: loading }),
  fetchTemplates: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch('/api/templates');
      const data = await res.json();
      if (data.success) {
        set({ templates: data.templates });
      }
    } catch (e) {
      console.error(e);
    } finally {
      set({ isLoading: false });
    }
  },
}));
