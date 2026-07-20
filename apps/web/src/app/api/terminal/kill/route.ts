import { NextResponse } from 'next/server';
import { terminalManager } from '@/lib/terminal/server-terminal-manager';

export async function POST(request: Request) {
  try {
    const { terminalId } = await request.json();
    
    if (!terminalId) {
      return NextResponse.json({ error: 'terminalId is required' }, { status: 400 });
    }

    terminalManager.killTerminal(terminalId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
