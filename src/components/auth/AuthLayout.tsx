import type React from 'react';
import LogoIcon from '@/components/icons/LogoIcon';
import Link from 'next/link';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string; // This is the subtitle like "Welcome back!"
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-5xl rounded-xl bg-card shadow-2xl overflow-hidden flex-col md:flex-row">
        {/* Image Side - Hidden on small screens, takes half width on medium+ */}
        <div className="hidden md:block md:w-1/2 relative min-h-[480px] md:min-h-0">
          <Image
            src="https://placehold.co/800x1000/f0f0f0/cccccc.png" 
            alt="Implant Precision - Soluções Odontológicas"
            fill
            style={{ objectFit: 'cover' }}
            priority
            data-ai-hint="dental technology" 
          />
           {/* Optional overlay for text or branding on image */}
           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-50"></div>
        </div>

        {/* Form Side - Full width on small, half on medium+ */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
          <div className="mb-6 flex flex-col items-center text-center">
            <Link href="/" className="flex items-center gap-3 mb-3">
              <LogoIcon className="h-10 w-10 md:h-12 md:w-12 text-primary" />
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">
                Implant Precision
              </h1>
            </Link>
            <p className="text-md md:text-lg text-muted-foreground">{title}</p>
          </div>
          {/* Form content is rendered here */}
          {children}
        </div>
      </div>
    </div>
  );
}
