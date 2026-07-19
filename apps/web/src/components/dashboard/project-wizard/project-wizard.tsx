import React from 'react';
import { useProjectWizardStore } from '@/store/project-wizard-store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@codesync/ui/components/ui/button';

const wizardSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  framework: z.string().min(1),
  runtime: z.string().min(1),
  gitProvider: z.string(),
  isAiEnabled: z.boolean(),
});

type WizardFormData = z.infer<typeof wizardSchema>;

export const ProjectWizard = () => {
  const { currentStep, setStep, isOpen, setIsOpen } = useProjectWizardStore();
  
  const form = useForm<WizardFormData>({
    resolver: zodResolver(wizardSchema),
    defaultValues: {
      name: '',
      description: '',
      framework: 'nextjs',
      runtime: 'node',
      gitProvider: 'github',
      isAiEnabled: true,
    }
  });

  if (!isOpen) return null;

  const onSubmit = (data: WizardFormData) => {
    console.log("Creating project with:", data);
    // Submit to server action -> service -> repo
    setIsOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card w-full max-w-4xl rounded-2xl shadow-2xl border flex overflow-hidden">
        
        {/* Sidebar Steps */}
        <div className="w-1/3 bg-muted/30 p-8 border-r">
          <h2 className="text-xl font-bold mb-8">Create Project</h2>
          <div className="space-y-4">
            <div className={`p-3 rounded-lg ${currentStep === 'details' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>1. Details</div>
            <div className={`p-3 rounded-lg ${currentStep === 'stack' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>2. Stack</div>
            <div className={`p-3 rounded-lg ${currentStep === 'git' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>3. Repository</div>
            <div className={`p-3 rounded-lg ${currentStep === 'variables' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>4. Variables & AI</div>
            <div className={`p-3 rounded-lg ${currentStep === 'review' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}`}>5. Review</div>
          </div>
        </div>

        {/* Content */}
        <div className="w-2/3 p-8 flex flex-col">
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 flex flex-col">
            <div className="flex-1">
              {currentStep === 'details' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Project Details</h3>
                  <input {...form.register('name')} className="w-full p-2 border rounded bg-background" placeholder="Project Name" />
                  <textarea {...form.register('description')} className="w-full p-2 border rounded bg-background h-32" placeholder="Description" />
                </div>
              )}
              {currentStep === 'review' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold">Review & Launch</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p><strong>Name:</strong> {form.watch('name')}</p>
                    <p><strong>Framework:</strong> {form.watch('framework')}</p>
                    <p><strong>AI Enabled:</strong> {form.watch('isAiEnabled') ? 'Yes' : 'No'}</p>
                    <p className="text-sm text-muted-foreground mt-4">Estimated Setup Time: 45 seconds</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between mt-8 pt-4 border-t">
              <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
              <div className="space-x-4">
                {currentStep !== 'details' && (
                  <Button type="button" variant="outline" onClick={() => setStep('details')}>Back</Button>
                )}
                {currentStep !== 'review' ? (
                  <Button type="button" onClick={() => setStep('review')}>Next Step</Button>
                ) : (
                  <Button type="submit">Deploy Project</Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
