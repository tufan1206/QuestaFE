'use client'; // required for client-side hooks

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/Login');
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <p>Loading...</p>
    </main>
  );
}
