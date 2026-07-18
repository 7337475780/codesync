import { Button } from '@codesync/ui/components/ui/button';
import { Container } from '@codesync/ui/components/layout/container';
import { Play, ArrowRight, Zap, CheckCircle2, Sparkles, Rocket } from 'lucide-react';
import { IDEPreview } from './ide-preview';

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
      <Container className="max-w-[1400px] px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left Text */}
          <div className="flex-1 space-y-8 w-full max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium">
              <Zap size={14} /> The next-gen collaborative IDE
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Code Together.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                Ship Smarter.
              </span>
            </h1>
            
            <p className="text-lg text-text-secondary max-w-lg leading-relaxed">
              CodeSync is an AI-powered collaborative cloud IDE that helps developers write, run, and deploy applications together in real-time.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 rounded-full px-8 h-12 shadow-[0_0_20px_rgba(59,130,246,0.4)] font-semibold">
                Start Coding Free <ArrowRight size={18} />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 rounded-full px-8 h-12 border-white/10 hover:bg-white/5 text-white font-medium">
                <Play size={18} /> Live Demo
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-text-muted font-medium pt-4">
              <span className="flex items-center gap-2"><CheckCircle2 size={14} className="text-purple-400"/> No setup</span>
              <span className="flex items-center gap-2"><Zap size={14} className="text-blue-400"/> Real-time sync</span>
              <span className="flex items-center gap-2"><Sparkles size={14} className="text-blue-400"/> AI Assistant</span>
              <span className="flex items-center gap-2"><Rocket size={14} className="text-purple-400"/> Deploy in one click</span>
            </div>
          </div>
          
          {/* Right IDE Preview */}
          <div className="flex-1 w-full lg:w-auto relative lg:-mr-[10%]">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-[120px] rounded-full -z-10" />
             <IDEPreview />
          </div>
        </div>
      </Container>
    </section>
  );
}
