import Image from 'next/image';

import { CheckIfUserIsLoggedIn } from '@/components/CheckIfUserIsLoggedIn';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <CheckIfUserIsLoggedIn />

      <div className="flex min-h-full flex-col justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            src="/images/logo.svg"
            alt="Logo"
            width={48}
            height={48}
            className="mx-auto h-12 w-12"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Converse com seus amigos
          </h2>
        </div>
        {children}
      </div>
    </>
  );
}
