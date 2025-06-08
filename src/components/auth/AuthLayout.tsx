import type React from 'react';
import LogoIcon from '@/components/icons/LogoIcon';
import Link from 'next/link';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <LogoIcon className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-headline font-bold text-primary">EduHub</h1>
          </Link>
          <p className="text-muted-foreground text-center">{title}</p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-lg sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
