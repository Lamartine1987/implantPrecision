import type React from 'react';
import LogoIcon from '@/components/icons/LogoIcon';
import Link from 'next/link';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <Image
            src="https://placehold.co/150x150.png"
            alt="Logo da Empresa"
            width={150}
            height={150}
            className="mb-6 rounded-lg shadow-md"
            data-ai-hint="company logo"
            priority // Ensures the logo loads quickly, good for LCP on auth pages
          />
          <Link href="/" className="flex items-center gap-2 mb-2">
            <LogoIcon className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-headline font-bold text-primary">Implant Precision</h1>
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
