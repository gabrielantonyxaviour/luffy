import { NextResponse } from 'next/server';
import data from '../../../../sample_data.json';

export async function GET(_req: Request) {
  return NextResponse.json({ data });
}
