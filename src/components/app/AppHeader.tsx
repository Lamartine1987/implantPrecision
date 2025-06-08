import Link from 'next/link';
import LogoIcon from '@/components/icons/LogoIcon';
import { Button } from '@/components/ui/button';
import { UserCircle, LogOut } from 'lucide-react'; // Using UserCircle as a placeholder for user avatar/menu

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-2">
          <LogoIcon className="h-8 w-8 text-primary" />
          <span className="text-2xl font-headline font-bold text-primary">EduHub</span>
        </Link>
        <div className="flex items-center gap-4">
          {/* Placeholder for user profile/dropdown */}
          {/* <Button variant="ghost" size="icon">
            <UserCircle className="h-6 w-6" />
          </Button> */}
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
