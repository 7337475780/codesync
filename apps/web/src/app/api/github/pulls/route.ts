import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Database doesn't have Pull Requests yet, return empty array
  return NextResponse.json([]);
}
