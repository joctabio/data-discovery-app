import { NextRequest, NextResponse } from 'next/server';

const sleep = (ms: string | number | undefined) =>
  new Promise((resolve) => setTimeout(resolve, ms ? Number(ms) : 0));

export async function DELETE(request: NextRequest) {
  const data = await request.json();

  try {
    const results = await fetch(`${process.env.JSON_SERVER_ENDPOINT}/api/companies/${data.toString()}`, {
        method: 'DELETE'
      });

    return NextResponse.json({ success: true, results });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: e instanceof Error ? e.message : String(e)
    });
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pathWithParams = url.pathname + url.search;

  try {
    const response = await fetch(
      `${process.env.JSON_SERVER_ENDPOINT}${pathWithParams}`
    );

    const data = await response.json();

    await sleep(process.env.JSON_SERVER_DELAY); // Simulate delay

    return NextResponse.json({
      success: true,
      results: data
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: e instanceof Error ? e.message : String(e),
      requestUrl: `${process.env.JSON_SERVER_ENDPOINT}${pathWithParams}`
    });
  }
}
