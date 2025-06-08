
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      router.replace('/dashboard');
    }
  }, [currentUser, loading, router]);

  if (loading || (!loading && currentUser)) {
    // Mostra um loader se auth estiver carregando ou se currentUser existir (aguardando redirect)
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  // Se não estiver carregando e não houver usuário, mostra o formulário de login
  return (
    <AuthLayout title="Welcome! Sign in to your account.">
      <LoginForm />
    </AuthLayout>
  );
}
