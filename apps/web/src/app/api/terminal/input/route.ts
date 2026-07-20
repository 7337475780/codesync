import { NextResponse } from 'next/server';
import { terminalManager } from '@/lib/terminal/server-terminal-manager';

export async function POST(request: Request) {
  try {
    const { terminalId, data } = await request.json();
    
    if (!terminalId || data === undefined) {
      return NextResponse.json({ error: 'terminalId and data are required' }, { status: 400 });
    }

    terminalManager.writeToTerminal(terminalId, data);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
