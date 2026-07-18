import { Container } from '@codesync/ui/components/layout/container';

export function LogoCloud() {
  return (
    <section className="py-16 bg-background border-b border-white/5">
      <Container className="text-center space-y-8 max-w-[1200px]">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-text-muted uppercase">Trusted by developers and teams at</p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <span className="text-xl font-bold tracking-tighter text-white font-sans">Google</span>
          <span className="text-xl font-semibold flex items-center gap-1.5 text-white"><div className="w-4 h-4 grid grid-cols-2 gap-[1px]"><div className="bg-white"/><div className="bg-white"/><div className="bg-white"/><div className="bg-white"/></div> Microsoft</span>
          <span className="text-xl font-bold tracking-tighter text-white">stripe</span>
          <span className="text-xl font-bold tracking-tight text-white">▲ vercel</span>
          <span className="text-xl font-bold tracking-tight text-white font-sans">Linear</span>
          <span className="text-xl font-semibold text-white">GitHub</span>
          <span className="text-xl font-bold tracking-tight text-white">⬡ hashnode</span>
          <span className="text-xl font-bold tracking-tight text-white">netlify</span>
        </div>
      </Container>
    </section>
  );
}
