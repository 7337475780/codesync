const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:codesync%401234@db.tzdqjbmjtakwwuylzkhp.supabase.co:5432/postgres'
});

const sql = `
CREATE TABLE IF NOT EXISTS "ProjectDomain" (
  "id" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'Pending',
  "type" TEXT NOT NULL DEFAULT 'Primary',
  "target" TEXT,
  "ssl" TEXT NOT NULL DEFAULT 'Pending',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ProjectDomain_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "ProjectDomain_name_key" ON "ProjectDomain"("name");
CREATE INDEX IF NOT EXISTS "ProjectDomain_projectId_idx" ON "ProjectDomain"("projectId");

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'ProjectDomain_projectId_fkey'
    ) THEN
        ALTER TABLE "ProjectDomain"
        ADD CONSTRAINT "ProjectDomain_projectId_fkey"
        FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
    END IF;
END $$;
`;

client.connect().then(async () => {
  console.log('Connected! Executing SQL...');
  await client.query(sql);
  console.log('SQL Executed successfully!');
  process.exit(0);
}).catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
