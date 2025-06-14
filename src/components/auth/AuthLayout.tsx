
import type React from 'react';
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
            src="/implant-precision-auth-graphic.jpg"
            alt="Implant Precision - Soluções Odontológicas"
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
           {/* Optional overlay for text or branding on image */}
           <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-50"></div>
        </div>

        {/* Form Side - Full width on small, half on medium+ */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
          <div className="mb-6 flex flex-col items-center text-center">
            <Link href="/" className="flex flex-col items-center gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary text-style-3d">
                Implant Precision
              </h1>
              {/* Removed Image tag */}
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
