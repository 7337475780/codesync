import { Button } from "@codesync/ui/components/ui/button";
import { Card, GlassCard } from "@codesync/ui/components/ui/card";
import { Input } from "@codesync/ui/components/ui/input";
import { Container } from "@codesync/ui/components/layout/container";

export default function DesignSystemShowcase() {
  return (
    <div className="min-h-screen bg-background text-text-primary py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background -z-10" />
      <Container className="space-y-16">
        
        <header className="space-y-4">
          <h1 className="display-xl">CodeSync Design System</h1>
          <p className="body-large text-text-secondary">Premium, fast, and minimal. The world-class foundation.</p>
        </header>

        <section className="space-y-6">
          <h2 className="heading border-b border-border pb-2">Typography</h2>
          <div className="space-y-4">
            <div className="display-xl">Display XL</div>
            <div className="display-lg">Display LG</div>
            <div className="heading">Heading</div>
            <div className="subheading">Subheading</div>
            <div className="body-large">Body Large</div>
            <div className="body">Body Normal</div>
            <div className="body-small">Body Small</div>
            <div className="caption">Caption text</div>
            <div className="code">const system = "CodeSync";</div>
            <div className="label">Label</div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="heading border-b border-border pb-2">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="heading border-b border-border pb-2">Inputs</h2>
          <div className="max-w-sm space-y-4">
            <Input placeholder="Search files..." />
            <Input type="email" placeholder="Email address" disabled />
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="heading border-b border-border pb-2">Cards & Glass System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="subheading mb-2">Standard Card</h3>
              <p className="body-small text-text-secondary">Solid surface background with subtle borders and shadows.</p>
            </Card>
            <GlassCard className="p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-slow" />
              <h3 className="subheading mb-2">Glass Card</h3>
              <p className="body-small text-text-secondary">Translucent surface with background blur and premium glass borders.</p>
            </GlassCard>
          </div>
        </section>

      </Container>
    </div>
  );
}
