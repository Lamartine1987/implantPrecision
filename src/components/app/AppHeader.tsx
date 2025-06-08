
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut, UserCircle } from 'lucide-react'; 
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function AppHeader() {
  const { currentUser, logout, loading } = useAuth();

  const getDisplayUserName = () => {
    if (currentUser && typeof currentUser.displayName === 'string' && currentUser.displayName.trim() !== '') {
      const names = currentUser.displayName.split(' ');
      return names.slice(0, 2).join(' ');
    }
    // Fallback to email if displayName is not available or not a non-empty string
    if (currentUser && typeof currentUser.email === 'string') {
      return currentUser.email;
    }
    // Generic fallback if neither is available (should be rare for an authenticated user)
    return 'User'; 
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-headline font-bold text-primary text-style-3d">Implant Precision</span>
        </Link>
        <div className="flex items-center gap-4">
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : currentUser ? (
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <UserCircle className="h-5 w-5" />
                <span>{getDisplayUserName()}</span>
              </div>
              <Button variant="outline" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link href="/login" passHref>
              <Button variant="outline">
                <LogOut className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
