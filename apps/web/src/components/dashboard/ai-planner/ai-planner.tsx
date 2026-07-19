import React, { useState } from 'react';
import { Button } from '@codesync/ui/components/ui/button';
import { Sparkles, ArrowRight, Code } from 'lucide-react';

export const AiProjectPlanner = () => {
  const [prompt, setPrompt] = useState('');
  const [isPlanning, setIsPlanning] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  const handlePlan = () => {
    setIsPlanning(true);
    // Simulate AI delay
    setTimeout(() => {
      setPlan({
        stack: {
          framework: 'Next.js App Router',
          database: 'Supabase PostgreSQL',
          auth: 'NextAuth.js',
          styling: 'Tailwind CSS',
        },
        complexity: 'Medium',
        estimatedTokens: 2500,
        structure: [
          'app/(auth)/login/page.tsx',
          'app/(dashboard)/layout.tsx',
          'components/ui/button.tsx',
          'lib/db/schema.ts'
        ]
      });
      setIsPlanning(false);
    }, 2000);
  };

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h3 className="text-xl font-semibold">AI Project Planner</h3>
      </div>
      
      {!plan ? (
        <div className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Describe the application you want to build, and our AI will generate a comprehensive architecture, select the optimal stack, and scaffold the boilerplate.
          </p>
          <textarea 
            className="w-full h-32 p-3 border rounded-lg bg-background resize-none focus:ring-2 focus:ring-primary"
            placeholder="E.g., A SaaS CRM for real estate agents with Stripe billing, user authentication, and a dashboard for property listings."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button className="w-full" onClick={handlePlan} disabled={!prompt || isPlanning}>
            {isPlanning ? (
              <span className="flex items-center">
                <div className="animate-spin mr-2 h-4 w-4 border-b-2 border-white rounded-full"></div>
                Analyzing Requirements...
              </span>
            ) : (
              <span className="flex items-center">
                Generate Architecture <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Recommended Stack</span>
              <ul className="mt-2 space-y-1 text-sm font-medium">
                <li>• {plan.stack.framework}</li>
                <li>• {plan.stack.database}</li>
                <li>• {plan.stack.auth}</li>
                <li>• {plan.stack.styling}</li>
              </ul>
            </div>
            <div className="bg-muted p-4 rounded-lg flex flex-col justify-between">
              <div>
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Analysis Metrics</span>
                <div className="mt-2 text-sm space-y-1">
                  <p>Complexity: <span className="font-semibold text-yellow-500">{plan.complexity}</span></p>
                  <p>Est. Tokens: <span className="font-mono">{plan.estimatedTokens}</span></p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-2 block">Proposed Structure</span>
            <div className="bg-background border rounded-lg p-3 font-mono text-xs text-muted-foreground">
              {plan.structure.map((path: string, i: number) => (
                <div key={i} className="flex items-center py-1">
                  <Code className="w-3 h-3 mr-2" /> {path}
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1" onClick={() => setPlan(null)}>
              Refine Prompt
            </Button>
            <Button className="flex-1">
              Create Project
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
