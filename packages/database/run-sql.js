const fs = require('fs');
const { Pool } = require('pg');

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("No DATABASE_URL");
    process.exit(1);
  }

  // Handle UTF-16LE encoding from PowerShell
  let sql = fs.readFileSync('init.sql', 'utf16le');
  
  // If it's actually UTF-8, it will look weird. Let's read it as buffer first.
  const buf = fs.readFileSync('init.sql');
  if (buf[0] === 0xff && buf[1] === 0xfe) {
    sql = buf.toString('utf16le');
  } else {
    sql = buf.toString('utf8');
  }

  const lines = sql.split('\n');
  const validLines = lines.filter(line => !line.includes('Loaded Prisma config'));
  let cleanSql = validLines.join('\n');
  if (cleanSql.charCodeAt(0) === 0xFEFF) {
    cleanSql = cleanSql.slice(1);
  }

  console.log("Connecting to DB...");
  const pool = new Pool({ connectionString: url, connectionTimeoutMillis: 30000 });
  
  try {
    const client = await pool.connect();
    console.log("Executing SQL...");
    await client.query(cleanSql);
    console.log("SQL executed successfully!");
    client.release();
  } catch (err) {
    console.error("Error executing SQL:", err);
    process.exit(1);
  } finally {
    pool.end();
  }
}

main();
