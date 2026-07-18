import { Sparkles } from 'lucide-react';

export function IDEPreview() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#0A0A0A] flex flex-col transform lg:rotate-[-1deg] lg:scale-105">
      {/* Window Controls */}
      <div className="h-10 bg-[#141414] border-b border-white/5 flex items-center px-4 justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
        <div className="text-[11px] text-text-muted font-mono flex-1 text-center flex items-center justify-center gap-2">
          Acme / Realtime Chat App 
          <span className="bg-white/10 px-1.5 py-0.5 rounded text-[9px] text-white font-sans uppercase tracking-wider">Pro</span>
        </div>
        <div className="flex -space-x-1 items-center">
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sam" className="w-6 h-6 rounded-full bg-[#141414] border-2 border-[#141414] z-30" alt="Sam" />
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" className="w-6 h-6 rounded-full bg-[#141414] border-2 border-[#141414] z-20" alt="Alex" />
           <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan" className="w-6 h-6 rounded-full bg-[#141414] border-2 border-[#141414] z-10" alt="Jordan" />
           <div className="w-6 h-6 rounded-full bg-white/10 border-2 border-[#141414] flex items-center justify-center text-[9px] text-white z-0">+3</div>
           <button className="ml-3 bg-white/10 hover:bg-white/20 text-white text-[10px] px-3 py-1 rounded-full font-medium transition-colors">Share</button>
           <div className="flex items-center gap-2 ml-4 text-text-muted">
             <span className="w-3 h-3 border border-current rounded-sm"></span>
             <span className="w-3 h-3 rounded-full border border-current"></span>
           </div>
        </div>
      </div>
      
      {/* Editor Body */}
      <div className="flex h-[500px]">
        {/* Left Sidebar (Activity Bar + Explorer) */}
        <div className="w-64 flex bg-[#0A0A0A] border-r border-white/5">
          {/* Activity Bar */}
          <div className="w-12 border-r border-white/5 flex flex-col items-center py-4 gap-6 text-text-muted">
            <div className="w-5 h-5 rounded border border-current"></div>
            <div className="w-5 h-5 rounded-full border border-current"></div>
            <div className="w-5 h-5 rounded border border-current opacity-50"></div>
            <div className="w-5 h-5 rounded border border-current opacity-50"></div>
          </div>
          {/* Explorer */}
          <div className="flex-1 flex flex-col p-3">
            <div className="text-[10px] font-bold text-text-muted tracking-wider mb-3 flex justify-between">
              EXPLORER <span className="opacity-50">...</span>
            </div>
            <div className="space-y-1 text-[11px] font-mono text-gray-400">
              <div className="flex items-center gap-1 hover:text-white cursor-pointer px-1">▾ src</div>
              <div className="pl-3 space-y-1">
                <div className="flex items-center gap-1 hover:text-white cursor-pointer px-1">▾ components</div>
                <div className="pl-3 space-y-1">
                  <div className="flex items-center gap-1 text-blue-400 cursor-pointer px-1 py-0.5 hover:bg-white/5 rounded">MessageList.tsx</div>
                  <div className="flex items-center gap-1 text-blue-400 cursor-pointer px-1 py-0.5 hover:bg-white/5 rounded">MessageInput.tsx</div>
                  <div className="flex items-center gap-1 text-gray-400 cursor-pointer px-1 py-0.5 hover:bg-white/5 rounded">Sidebar.tsx</div>
                </div>
                <div className="flex items-center gap-1 hover:text-white cursor-pointer px-1 mt-1">▾ pages</div>
                <div className="pl-3 space-y-1">
                  <div className="flex items-center gap-1 text-white bg-blue-500/20 px-1 py-0.5 rounded border border-blue-500/30">index.tsx</div>
                  <div className="flex items-center gap-1 text-blue-400 cursor-pointer px-1 py-0.5 hover:bg-white/5 rounded">api.ts</div>
                </div>
                <div className="flex items-center gap-1 hover:text-white cursor-pointer px-1 mt-1">▸ lib</div>
                <div className="flex items-center gap-1 hover:text-white cursor-pointer px-1 mt-1">▾ styles</div>
                <div className="pl-3 space-y-1">
                  <div className="flex items-center gap-1 text-blue-400 cursor-pointer px-1 py-0.5 hover:bg-white/5 rounded">globals.css</div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-yellow-400 cursor-pointer px-1 py-0.5 mt-2">.env</div>
              <div className="flex items-center gap-1 text-gray-300 cursor-pointer px-1 py-0.5">package.json</div>
              <div className="flex items-center gap-1 text-blue-300 cursor-pointer px-1 py-0.5">tsconfig.json</div>
            </div>
          </div>
        </div>
        
        {/* Main Editor */}
        <div className="flex-1 bg-[#0A0A0A] relative flex flex-col min-w-0">
          {/* Tabs */}
          <div className="h-9 flex items-center border-b border-white/5 bg-[#0A0A0A]">
            <div className="px-4 py-2 text-[11px] text-white bg-[#141414] border-r border-white/5 flex items-center gap-2 h-full">
              <span className="text-blue-400">⚛</span> index.tsx <span className="text-text-muted hover:text-white cursor-pointer">×</span>
            </div>
          </div>
          {/* Code */}
          <div className="flex-1 p-4 font-mono text-[11.5px] leading-relaxed text-gray-300 relative overflow-hidden bg-[#0a0a0a]">
            <div className="text-[#404040] absolute left-4 top-4 select-none text-right pr-4 border-r border-white/5 h-full">
              1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8<br/>9<br/>10<br/>11<br/>12<br/>13<br/>14<br/>15<br/>16<br/>17<br/>18<br/>19<br/>20<br/>21<br/>22<br/>23<br/>24<br/>25<br/>26
            </div>
            <div className="pl-12">
              <span className="text-pink-400">import</span> {'{'} useState, useEffect {'}'} <span className="text-pink-400">from</span> <span className="text-green-400">'react'</span><br/>
              <span className="text-pink-400">import</span> {'{'} io {'}'} <span className="text-pink-400">from</span> <span className="text-green-400">'socket.io-client'</span><br/>
              <span className="text-pink-400">import</span> MessageList <span className="text-pink-400">from</span> <span className="text-green-400">'@/components/MessageList'</span><br/>
              <span className="text-pink-400">import</span> MessageInput <span className="text-pink-400">from</span> <span className="text-green-400">'@/components/MessageInput'</span><br/><br/>
              <span className="text-pink-400">export default function</span> <span className="text-blue-300">Home</span>() {'{'}<br/>
              &nbsp;&nbsp;<span className="text-pink-400">const</span> [messages, setMessages] = <span className="text-blue-300">useState</span>([])<br/><br/>
              &nbsp;&nbsp;<span className="text-blue-300">useEffect</span>(() = {'>'} {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">const</span> socket = <span className="text-blue-300">io</span>(process.<span className="text-blue-300">env</span>.NEXT_PUBLIC_URL)<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;socket.<span className="text-blue-300">on</span>(<span className="text-green-400">'message'</span>, (msg) = {'>'} {'{'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-300">setMessages</span>(prev = {'>'} [...prev, msg])<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{'}'})<br/><br/>
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-pink-400">return</span> () = {'>'} socket.<span className="text-blue-300">disconnect</span>()<br/>
              &nbsp;&nbsp;{'}'}, [])<br/><br/>
              &nbsp;&nbsp;<span className="text-pink-400">return</span> (<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-blue-300">div</span> <span className="text-blue-200">className</span>=<span className="text-green-400">"chat-container"</span>{'>'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-blue-300">MessageList</span> <span className="text-blue-200">messages</span>={'{messages}'} /{'>'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'<'}<span className="text-blue-300">MessageInput</span> /{'>'}<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;{'</'}<span className="text-blue-300">div</span>{'>'}<br/>
              &nbsp;&nbsp;)<br/>
              {'}'}
            </div>
            
            {/* Mock Avatars in code */}
            <div className="absolute top-[85px] right-[25%] flex flex-col items-center">
              <div className="bg-purple-500 text-white text-[10px] px-2 py-0.5 rounded font-sans shadow-lg flex items-center gap-1">
                 You
              </div>
              <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-purple-500 transform rotate-[135deg] -mt-1 ml-4" />
            </div>
            
            <div className="absolute top-[215px] right-[15%] flex flex-col items-center">
              <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-blue-500 transform rotate-[-45deg] -mb-1 mr-4" />
              <div className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded font-sans shadow-lg">Alex</div>
            </div>

            <div className="absolute bottom-[80px] right-[20%] flex flex-col items-center">
              <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-green-500 transform rotate-[-45deg] -mb-1 mr-4" />
              <div className="bg-green-500 text-white text-[10px] px-2 py-0.5 rounded font-sans shadow-lg">Sam</div>
            </div>
          </div>
          
          {/* Footer Status Bar */}
          <div className="h-6 bg-[#007ACC] flex items-center px-3 text-[9px] text-white justify-between font-sans">
             <div className="flex items-center gap-4">
               <span className="flex items-center gap-1">main*</span>
               <span className="flex items-center gap-1">0 0 0</span>
               <span className="flex items-center gap-1">Live Share</span>
             </div>
             <div className="flex items-center gap-4">
               <span>Ln 23, Col 1</span>
               <span>Spaces: 2</span>
               <span>UTF-8</span>
               <span>TypeScript</span>
               <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-white block"></span> Prettier</span>
             </div>
          </div>
        </div>
        
        {/* Right Panel (Terminal & AI) */}
        <div className="w-72 bg-[#0A0A0A] border-l border-white/5 flex flex-col">
           {/* Terminal */}
           <div className="flex-1 flex flex-col border-b border-white/5 min-h-[200px]">
             <div className="h-9 flex items-center px-4 text-[10px] font-medium text-text-muted gap-4">
               <span className="text-white border-b border-white pb-2 pt-2 cursor-pointer">TERMINAL</span>
               <span className="hover:text-white cursor-pointer">PORTS</span>
               <div className="ml-auto flex items-center gap-2">
                 <span>bash</span>
                 <span>+</span>
               </div>
             </div>
             <div className="p-4 font-mono text-[10px] text-gray-400 space-y-1.5 overflow-hidden">
               <div><span className="text-green-400">➜</span>  <span className="text-blue-400">realtime-chat</span> npm run dev</div>
               <br/>
               <div>{'>'} dev</div>
               <div>{'>'} next dev</div>
               <br/>
               <div className="text-purple-400">▲ Next.js 14.2.3</div>
               <div>- Local:        <span className="text-white hover:underline cursor-pointer">http://localhost:3000</span></div>
               <div>- Environments: .env.local</div>
               <br/>
               <div className="text-green-400">✓ Ready in 1.2s</div>
               <div className="text-gray-500">✓ Compiled / in 342ms</div>
               <div className="text-gray-500">✓ Compiled /api in 180ms</div>
             </div>
           </div>
           
           {/* AI Assistant */}
           <div className="flex-1 flex flex-col bg-[#0A0A0A]">
              <div className="h-9 flex items-center px-4 text-[10px] font-semibold text-text-muted tracking-wider justify-between">
                AI ASSISTANT
                <span className="cursor-pointer hover:text-white">×</span>
              </div>
              <div className="flex-1 p-4 flex flex-col">
                 <div className="flex items-start gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0">
                      <Sparkles size={10} className="text-white" />
                    </div>
                    <div className="bg-white/5 p-2 rounded-md rounded-tl-none text-[11px] text-gray-300 border border-white/5">
                      How can I help you today?
                    </div>
                 </div>
                 
                 <div className="mt-auto space-y-2 mb-4">
                   <div className="bg-[#141414] hover:bg-white/10 cursor-pointer p-2 rounded text-[10px] text-gray-400 border border-white/5 transition-colors">
                     Explain this code
                   </div>
                   <div className="bg-[#141414] hover:bg-white/10 cursor-pointer p-2 rounded text-[10px] text-gray-400 border border-white/5 transition-colors">
                     Refactor this function
                   </div>
                   <div className="bg-[#141414] hover:bg-white/10 cursor-pointer p-2 rounded text-[10px] text-gray-400 border border-white/5 transition-colors">
                     Generate unit tests
                   </div>
                 </div>
                 
                 <div className="bg-[#141414] border border-white/10 rounded-md p-1.5 flex items-center gap-2">
                   <input 
                     type="text" 
                     placeholder="Ask anything..." 
                     className="bg-transparent border-0 text-[11px] text-white w-full px-2 focus:outline-none placeholder:text-gray-600"
                   />
                   <button className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 flex items-center justify-center shrink-0 transition-colors">
                     <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                   </button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
