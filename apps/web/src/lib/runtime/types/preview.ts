export type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export interface PreviewServer {
  id: string;
  url: string;
  port: number;
  isReady: boolean;
  deviceMode: DeviceMode;
  history: string[];
}
