import { createHash } from 'crypto';
import { cookies } from 'next/headers';

/**
 * Generates the expected secure token hash based on the server-side ADMIN_PASSWORD.
 */
export function getAdminTokenHash(): string | null {
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  if (!ADMIN_PASSWORD) {
    return null;
  }
  return createHash('sha256').update(ADMIN_PASSWORD).digest('hex');
}

/**
 * Checks the request cookies for 'admin_token' and verifies it against the expected hash.
 */
export function verifyAuth(): boolean {
  const expectedHash = getAdminTokenHash();
  if (!expectedHash) {
    console.error('Authentication verification failed: ADMIN_PASSWORD is not set.');
    return false;
  }

  const cookieStore = cookies();
  const token = cookieStore.get('admin_token')?.value;

  return token === expectedHash;
}
