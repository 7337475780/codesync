import { Container } from '@codesync/ui/components/layout/container';

export function Stats() {
  return (
    <section className="pb-24">
      <Container className="mx-auto w-full">
        <div className="rounded-xl border border-white/10 bg-[#0a0a0a] p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent blur-3xl"></div>
          
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.99%</div>
              <div className="text-sm text-text-secondary">Uptime</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-sm text-text-secondary">Developers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">1M+</div>
              <div className="text-sm text-text-secondary">Projects Created</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">10M+</div>
              <div className="text-sm text-text-secondary">Lines of Code</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
