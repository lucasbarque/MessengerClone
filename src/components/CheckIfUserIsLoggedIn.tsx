import { redirect } from 'next/navigation';

import { getServerSession } from 'next-auth';

export async function CheckIfUserIsLoggedIn() {
  const session = await getServerSession();

  if (session !== null) {
    redirect('/users');
  }
  return null;
}
