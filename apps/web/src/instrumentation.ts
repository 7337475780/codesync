export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const fs = await import('fs');
    const path = await import('path');
    const { prisma } = await import('@codesync/database');
    
    console.log('[Startup] Ensuring all projects have workspaces...');
    const baseDir = path.resolve(process.cwd(), '.repos');

    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    try {
      const projects = await prisma.project.findMany();
      for (const project of projects) {
        const repoPath = path.join(baseDir, project.id);
        
        if (!fs.existsSync(repoPath)) {
          console.log(`[Startup] Re-creating missing workspace for project ${project.name} (${project.id})`);
          fs.mkdirSync(repoPath, { recursive: true });
        }
      }
      console.log('[Startup] Finished workspace verification.');
    } catch (e) {
      console.error('[Startup] Failed to ensure workspaces:', e);
    }
  }
}
