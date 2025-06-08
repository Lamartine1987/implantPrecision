
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import AppLayout from '@/components/app/AppLayout'; // Usaremos AppLayout para consistência visual

export default function HomePage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (currentUser) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [currentUser, loading, router]);

  // Exibe um loader enquanto o AuthContext está carregando ou o redirecionamento está acontecendo
  return (
    <AppLayout>
      <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Loading application...</p>
      </div>
    </AppLayout>
  );
}
