import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Database doesn't have explicit Contributors yet, return empty array
  return NextResponse.json([]);
}
