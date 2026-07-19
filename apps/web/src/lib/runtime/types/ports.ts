export type PortVisibility = 'private' | 'public';
export type PortProtocol = 'http' | 'https' | 'tcp';

export interface ForwardedPort {
  id: string;
  port: number;
  protocol: PortProtocol;
  visibility: PortVisibility;
  localUrl: string;
  publicUrl?: string;
  label?: string;
  isOpen: boolean;
}
