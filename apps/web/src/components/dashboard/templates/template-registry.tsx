import React from 'react';
import { useTemplateStore } from '@/store/template-store';
import { Button } from '@codesync/ui/components/ui/button';
import { TemplateSkeleton } from '../skeletons';



export const TemplateRegistry = () => {
  const { templates, isLoading, selectedTemplateId, setSelectedTemplate, fetchTemplates } = useTemplateStore();

  React.useEffect(() => {
    fetchTemplates();
  }, [fetchTemplates]);

  if (isLoading) {
    return <TemplateSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Template Registry</h2>
        <div className="flex space-x-2">
          {/* Filters would go here */}
          <Button variant="outline" size="sm">All Categories</Button>
          <Button variant="outline" size="sm">Frameworks</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div 
            key={template.id} 
            className={`border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${
              selectedTemplateId === template.id ? 'border-primary ring-1 ring-primary' : 'border-border'
            }`}
            onClick={() => setSelectedTemplate(template.id as string)}
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{template.name}</h3>
              {template.isAiOptimized && (
                <span className="bg-blue-500/10 text-blue-500 text-[10px] uppercase font-bold px-2 py-1 rounded">AI Ready</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{template.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="text-xs bg-muted px-2 py-1 rounded">{template.framework}</span>
              <span className="text-xs bg-muted px-2 py-1 rounded">{template.category}</span>
              <span className="text-xs bg-muted px-2 py-1 rounded">{template.difficulty}</span>
            </div>

            {selectedTemplateId === template.id && (
              <Button className="w-full mt-2" size="sm">Use Template</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
