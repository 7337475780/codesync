import { NextResponse } from 'next/server';
import { terminalManager } from '@/lib/terminal/server-terminal-manager';

export async function POST(request: Request) {
  try {
    const { terminalId, cols, rows } = await request.json();
    
    if (!terminalId || !cols || !rows) {
      return NextResponse.json({ error: 'terminalId, cols, rows are required' }, { status: 400 });
    }

    terminalManager.resizeTerminal(terminalId, cols, rows);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
