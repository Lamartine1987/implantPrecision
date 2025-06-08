import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react'; 

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-2xl font-headline font-bold text-primary text-style-3d">Implant Precision</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/login" passHref>
            <Button variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
