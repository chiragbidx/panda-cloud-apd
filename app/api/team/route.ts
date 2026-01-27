import { getTeamForUser } from '@/lib/db/queries';
import { unstable_noStore as noStore } from 'next/cache';

export const revalidate = 0;

export async function GET() {
  noStore();
  const team = await getTeamForUser();
  return Response.json(team, {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
