import { ProvisionTimeline } from '@/components/workspace/provision-timeline';
import { LiveLogViewer } from '@/components/workspace/live-log-viewer';
import { AiAnalyzerCard } from '@/components/workspace/ai-analyzer-card';

export default function LaunchPage({ params }: { params: { projectId: string } }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <div className="px-8 py-6 border-b border-border bg-card">
        <h1 className="text-3xl font-bold tracking-tight">Provisioning Workspace</h1>
        <p className="text-muted-foreground mt-2">Setting up a secure, dedicated environment for your project.</p>
      </div>

      <div className="flex-1 p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto w-full">
        {/* Left Column: Timeline */}
        <div className="lg:col-span-1 space-y-6">
          <ProvisionTimeline projectId={params.projectId} />
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6 flex flex-col h-[calc(100vh-12rem)]">
          {/* AI Analysis (shown dynamically when generated) */}
          <AiAnalyzerCard />
          
          {/* Live Logs */}
          <div className="flex-1 min-h-0 border rounded-xl overflow-hidden shadow-sm">
            <LiveLogViewer />
          </div>
        </div>
      </div>
    </div>
  );
}
