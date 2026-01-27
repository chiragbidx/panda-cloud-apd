import { unstable_cache } from 'next/cache';

export function cache<T>(
  fn: () => Promise<T>,
  key: string,
  revalidate = 3600
) {
  return unstable_cache(fn, [key], { revalidate })();
}