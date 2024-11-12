import { NextResponse } from 'next/server';

export function success(json: Array<any> | Record<string, any>) {
  return NextResponse.json({
    success: true,
    results: json
  });
}

export function error(message: string) {
  return NextResponse.json({
    success: false,
    message
  });
}
