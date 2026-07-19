import { create } from 'zustand';
import { PreviewServer, DeviceMode } from '@/lib/runtime/types/preview';

interface PreviewState {
  preview: PreviewServer | null;
  setPreview: (preview: PreviewServer | null) => void;
  setDeviceMode: (mode: DeviceMode) => void;
}

export const usePreviewStore = create<PreviewState>((set) => ({
  preview: null,
  setPreview: (preview) => set({ preview }),
  setDeviceMode: (mode) => set((s) => s.preview ? { preview: { ...s.preview, deviceMode: mode } } : {}),
}));
