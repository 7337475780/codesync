import { create } from 'zustand';
import type { ProjectTemplate } from '@prisma/client';

export interface TemplateState {
  templates: Partial<ProjectTemplate>[];
  selectedTemplateId: string | null;
  isLoading: boolean;
  setTemplates: (templates: Partial<ProjectTemplate>[]) => void;
  setSelectedTemplate: (id: string | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useTemplateStore = create<TemplateState>((set) => ({
  templates: [],
  selectedTemplateId: null,
  isLoading: false,
  setTemplates: (templates) => set({ templates }),
  setSelectedTemplate: (id) => set({ selectedTemplateId: id }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
