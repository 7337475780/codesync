import React from 'react';
import { Panel, Group as PanelGroup, Separator as PanelResizeHandle } from 'react-resizable-panels';
import { useEditorLayoutStore } from '@/store/editor-layout-store';
import { ActivityBar } from './activity-bar';
import { Sidebar } from './sidebar';
import { EditorArea } from './editor-area';
import { AIChatPanel } from '../ai/AIChatPanel';
import { BottomPanel } from './bottom-panel';
import { StatusBar } from './status-bar';

export function PanelLayout() {
  const { sidebarVisible, aiPanelVisible, bottomPanelVisible } = useEditorLayoutStore();

  return (
    <div className="flex flex-col h-screen w-screen bg-[#1e1e1e] text-gray-300 overflow-hidden font-sans">
      <div className="flex-1 flex overflow-hidden">
        <ActivityBar />
        
        <PanelGroup id="codesync-layout" orientation="horizontal" className="flex-1">
          {sidebarVisible && (
            <>
            <Panel id="sidebar" defaultSize={20} minSize={10} className="flex flex-col">
              <Sidebar />
            </Panel>
            <PanelResizeHandle className="w-1.5 bg-[#2d2d2d] hover:bg-[#007acc] active:bg-[#007acc] transition-colors cursor-col-resize flex-shrink-0 flex items-center justify-center group">
              <div className="w-0.5 h-8 rounded-full bg-[#555] group-hover:bg-[#007acc] group-active:bg-[#007acc] transition-colors" />
            </PanelResizeHandle>
          </>
          )}

          <Panel id="main-content" className="flex flex-col">
            <PanelGroup id="codesync-main-layout" orientation="vertical">
              <Panel id="editor-area" className="flex flex-col">
                <EditorArea />
              </Panel>

              {bottomPanelVisible && (
                <>
                <PanelResizeHandle className="h-2 bg-[#1e1e1e] hover:bg-[#007acc]/30 active:bg-[#007acc]/40 transition-colors cursor-row-resize flex-shrink-0 z-10 flex items-center justify-center group border-t border-[#2d2d2d]">
                  <div className="h-0.5 w-8 rounded-full bg-[#555] group-hover:bg-[#007acc] group-active:bg-[#007acc] transition-colors" />
                </PanelResizeHandle>
                <Panel id="bottom-panel" defaultSize={30} minSize={10}>
                  <BottomPanel />
                </Panel>
              </>
              )}
            </PanelGroup>
          </Panel>

          {aiPanelVisible && (
            <>
            <PanelResizeHandle className="w-1.5 bg-[#2d2d2d] hover:bg-[#007acc] active:bg-[#007acc] transition-colors cursor-col-resize flex-shrink-0 flex items-center justify-center group">
              <div className="w-0.5 h-8 rounded-full bg-[#555] group-hover:bg-[#007acc] group-active:bg-[#007acc] transition-colors" />
            </PanelResizeHandle>
            <Panel id="ai-panel" defaultSize={25} minSize={15} className="flex flex-col">
              <AIChatPanel />
            </Panel>
          </>
          )}
        </PanelGroup>
      </div>
      
      <StatusBar />
    </div>
  );
}
