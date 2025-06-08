
'use client';

import AppLayout from '@/components/app/AppLayout';
import CourseCard from '@/components/app/CourseCard';
import { mockCourses } from '@/lib/mockData';
import { GraduationCap, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, loading, router]);

  if (loading || !currentUser) {
    return (
      <AppLayout>
        <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-xl text-muted-foreground">Loading dashboard...</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-headline font-bold text-gray-800 mb-2 flex items-center">
          <GraduationCap className="w-10 h-10 mr-3 text-primary" />
          Available Courses
        </h1>
        <p className="text-lg text-muted-foreground">
          Expand your knowledge and skills with our curated selection of courses.
        </p>
      </div>
      {mockCourses.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <GraduationCap className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-headline font-semibold mb-2">No Courses Available Yet</h2>
          <p className="text-muted-foreground">Please check back later for new and exciting courses!</p>
        </div>
      )}
    </AppLayout>
  );
}
