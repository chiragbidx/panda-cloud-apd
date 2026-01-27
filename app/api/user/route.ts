import { getUser } from '@/lib/db/queries';
import { unstable_noStore as noStore } from 'next/cache';

export const revalidate = 0;

export async function GET() {
  noStore();
  const user = await getUser();
  return Response.json(user, {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
