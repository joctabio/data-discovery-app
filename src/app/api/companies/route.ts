import { NextRequest, NextResponse } from 'next/server';

const TIMEOUT_INTERVAL = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function DELETE(request: NextRequest) {
  const data = await request.json();

  try {
    const deleteMultipleRequest = await Promise.all(
      data.map(async (id: number) => {
        const deleteCompanyRequest = await fetch(
          `${process.env.JSON_SERVER_ENDPOINT}/api/companies/${id}`,
          {
            method: 'DELETE'
          }
        );

        return await deleteCompanyRequest.json();
      })
    );

    await sleep(TIMEOUT_INTERVAL); // Simulate delay

    return NextResponse.json({ success: true, data: deleteMultipleRequest });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const pathWithParams = url.pathname + url.search;

  const response = await fetch(
    `${process.env.JSON_SERVER_ENDPOINT}${pathWithParams}`
  );

  const data = await response.json();

  await sleep(TIMEOUT_INTERVAL); // Simulate delay

  return NextResponse.json(data);
}
