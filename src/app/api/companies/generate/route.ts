import { NextResponse } from 'next/server';
import { success, error } from '@/app/utils/jsonResponse';

import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const dbFile = path.resolve('./db.json');
    const initialDbData = await JSON.parse(fs.readFileSync(dbFile, 'utf-8'));
    const { companies } = initialDbData;

    const load = companies.map((company: { id: number; name: string }) => {
      const payload = {
        name: company.name
      };

      return fetch(`${process.env.JSON_SERVER_ENDPOINT}/api/companies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    });

    const res = await Promise.all(load);

    return success(res);
  } catch (e) {
    return error(e instanceof Error ? e.message : String(e));
  }
}
