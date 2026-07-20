import { NextResponse } from 'next/server';
import { terminalManager } from '@/lib/terminal/server-terminal-manager';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const terminalId = searchParams.get('terminalId');
    
    if (!terminalId) {
      return NextResponse.json({ error: 'terminalId is required' }, { status: 400 });
    }

    if (!terminalManager.hasTerminal(terminalId)) {
      return NextResponse.json({ error: 'Terminal not found or process exited' }, { status: 404 });
    }

    const output = terminalManager.readTerminalOutput(terminalId);

    return NextResponse.json({ success: true, output });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
