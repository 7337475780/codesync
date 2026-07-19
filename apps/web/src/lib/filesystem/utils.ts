export const joinPath = (...parts: string[]): string => {
  return parts.join('/').replace(/\/+/g, '/').replace(/^\/+/, '');
};

export const dirname = (path: string): string => {
  const parts = path.split('/');
  parts.pop();
  return parts.join('/') || '';
};

export const basename = (path: string): string => {
  return path.split('/').pop() || '';
};

export const extname = (path: string): string => {
  const base = basename(path);
  const match = base.match(/\.([^.]+)$/);
  return match ? match[1] : '';
};
