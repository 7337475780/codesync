import { Container } from '@codesync/ui/components/layout/container';
import { Button } from '@codesync/ui/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="pb-32 pt-8">
      <Container className="max-w-[1400px] px-4 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          {/* Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
            <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <span className="text-2xl text-white font-bold leading-none mt-1">C</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">Ready to level up your coding experience?</h2>
              <p className="text-sm text-text-secondary">Join thousands of developers building the future with CodeSync.</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
             <Button size="lg" className="w-full sm:w-auto gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white border-0 shadow-[0_0_15px_rgba(59,130,246,0.4)] rounded-full px-8 h-11">
                Get Started Free <ArrowRight size={16} />
             </Button>
             <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8 h-11 border-white/10 text-white hover:bg-white/5 font-medium">
                Explore Features
             </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
