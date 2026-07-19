export type ActivityType = 'github' | 'deployment' | 'ai' | 'team' | 'workspace' | 'project';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
  };
  metadata?: Record<string, any>;
}

const FIRST_NAMES = ['Alex', 'Sarah', 'Michael', 'Emma', 'David', 'Jessica', 'James', 'Emily'];
const LAST_NAMES = ['Chen', 'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];

const generateRandomName = () => {
  const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${first} ${last}`;
};

const generateActivity = (id: string, index: number): ActivityEvent => {
  const types: ActivityType[] = ['github', 'deployment', 'ai', 'team', 'workspace', 'project'];
  const type = types[Math.floor(Math.random() * types.length)];
  
  const now = new Date();
  // Generate timestamps spreading out backwards in time
  const timestamp = new Date(now.getTime() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)); // up to 30 days ago

  const user = {
    name: generateRandomName(),
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
  };

  switch (type) {
    case 'github':
      return {
        id,
        type,
        title: 'Pushed to main',
        description: `Commits: "Update dependencies" and "Fix layout shift"`,
        timestamp,
        user,
        metadata: {
          repo: 'codesync/web-client',
          branch: 'main',
          commits: 2
        }
      };
    case 'deployment':
      const success = Math.random() > 0.2;
      return {
        id,
        type,
        title: success ? 'Deployment successful' : 'Deployment failed',
        description: `Production deployment for codesync-web`,
        timestamp,
        user,
        metadata: {
          environment: 'production',
          status: success ? 'success' : 'failure',
          url: 'https://codesync.dev'
        }
      };
    case 'ai':
      return {
        id,
        type,
        title: 'AI Code Generation',
        description: 'Generated 3 files for the new billing dashboard',
        timestamp,
        user,
        metadata: {
          model: 'gemini-1.5-pro',
          tokens: 2450
        }
      };
    case 'team':
      return {
        id,
        type,
        title: 'New team member invited',
        description: 'Invited to the "Frontend Core" team',
        timestamp,
        user,
        metadata: {
          role: 'developer'
        }
      };
    case 'workspace':
      return {
        id,
        type,
        title: 'Workspace settings updated',
        description: 'Changed default region and billing details',
        timestamp,
        user
      };
    case 'project':
      return {
        id,
        type,
        title: 'New project created',
        description: 'Project "Analytics Service" was initialized',
        timestamp,
        user,
        metadata: {
          framework: 'nextjs'
        }
      };
  }
};

// Generate 1000 mock events and sort them by descending timestamp
export const mockActivities: ActivityEvent[] = Array.from({ length: 1000 }, (_, i) => 
  generateActivity(`act_${i}`, i)
).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
