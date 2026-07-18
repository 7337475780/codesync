import { Container } from '@codesync/ui/components/layout/container';
import { Card } from '@codesync/ui/components/ui/card';
import { Users, Bot, Cloud, Rocket } from 'lucide-react';

export function Features() {
  return (
    <section className="py-16">
      <Container className="max-w-[1400px] px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="p-6 bg-[#0a0a0a] border-white/5 hover:border-purple-500/30 transition-colors rounded-xl shadow-lg">
            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-5 border border-purple-500/20">
              <Users size={18} className="text-purple-400" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-white">Real-time Collaboration</h3>
            <p className="text-sm text-text-secondary leading-relaxed">Code together with your team in real-time. See changes instantly and never lose sync.</p>
          </Card>
          
          <Card className="p-6 bg-[#0a0a0a] border-white/5 hover:border-blue-500/30 transition-colors rounded-xl shadow-lg">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-5 border border-blue-500/20">
              <Bot size={18} className="text-blue-400" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-white">AI Code Assistant</h3>
            <p className="text-sm text-text-secondary leading-relaxed">Get intelligent suggestions, explanations, and auto-complete to write better code, faster.</p>
          </Card>

          <Card className="p-6 bg-[#0a0a0a] border-white/5 hover:border-green-500/30 transition-colors rounded-xl shadow-lg">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-5 border border-green-500/20">
              <Cloud size={18} className="text-green-400" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-white">Cloud Workspaces</h3>
            <p className="text-sm text-text-secondary leading-relaxed">Access your projects from anywhere. Your code is safe, secure, and always in sync.</p>
          </Card>

          <Card className="p-6 bg-[#0a0a0a] border-white/5 hover:border-orange-500/30 transition-colors rounded-xl shadow-lg">
            <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center mb-5 border border-orange-500/20">
              <Rocket size={18} className="text-orange-400" />
            </div>
            <h3 className="text-base font-semibold mb-2 text-white">One-Click Deploy</h3>
            <p className="text-sm text-text-secondary leading-relaxed">Deploy your applications instantly to the cloud with zero configuration.</p>
          </Card>
          
          {/* Stats Card taking up 1 column in this 5-col layout */}
          <Card className="p-6 bg-[#0a0a0a] border-white/5 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-center">
            {/* Grid background effect */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e51a_1px,transparent_1px),linear-gradient(to_bottom,#4f46e51a_1px,transparent_1px)] bg-[size:14px_14px]"></div>
            <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-bl from-purple-500/10 to-transparent blur-2xl"></div>
            
            <div className="relative z-10 grid grid-cols-2 gap-y-6 gap-x-4">
              <div>
                <div className="text-2xl font-bold text-white mb-1">99.99%</div>
                <div className="text-[11px] text-text-muted">Uptime</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">50K+</div>
                <div className="text-[11px] text-text-muted">Developers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">1M+</div>
                <div className="text-[11px] text-text-muted">Projects Created</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white mb-1">10M+</div>
                <div className="text-[11px] text-text-muted">Lines of Code</div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
