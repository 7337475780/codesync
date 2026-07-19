import React from 'react';

export const metadata = {
  title: 'Editor | CodeSync',
};

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] bg-[#1e1e1e]">
      {children}
    </div>
  );
}
