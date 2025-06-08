
'use client';

import AppLayout from '@/components/app/AppLayout';
import CourseCard from '@/components/app/CourseCard';
import { mockCourses, type Course } from '@/lib/mockData';
import { GraduationCap, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

interface CourseWithProgress extends Course {
  progressPercentage?: number;
}

export default function DashboardPage() {
  const { currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const [coursesWithProgress, setCoursesWithProgress] = useState<CourseWithProgress[]>(mockCourses.map(course => ({...course})));
  const [isLoadingProgress, setIsLoadingProgress] = useState(true);

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/login');
      setIsLoadingProgress(false);
    } else if (currentUser) {
      const fetchAllProgress = async () => {
        setIsLoadingProgress(true);
        const updatedCourses = await Promise.all(
          mockCourses.map(async (course) => {
            let percentage = 0;
            try {
              const courseProgressRef = ref(db, `usersProgress/${currentUser.uid}/${course.id}`);
              const snapshot = await get(courseProgressRef);

              if (snapshot.exists()) {
                const completedLessonsData = snapshot.val() as { [lessonId: string]: boolean };
                const completedCount = Object.values(completedLessonsData).filter(status => status === true).length;
                const totalLessons = course.lessons.length;
                if (totalLessons > 0) {
                  percentage = (completedCount / totalLessons) * 100;
                } else {
                  // Curso sem lições pode ser considerado 100% completo ou 0%.
                  // Se não há nada a fazer, pode ser 100%. Vamos assumir 0% se não houver lições para progredir.
                  percentage = 0; 
                }
              }
            } catch (error) {
              console.error(`Failed to load progress for course ${course.id}:`, error);
              // Mantém a porcentagem como 0 em caso de erro
            }
            return { ...course, progressPercentage: percentage };
          })
        );
        setCoursesWithProgress(updatedCourses);
        setIsLoadingProgress(false);
      };

      fetchAllProgress();
    }
  }, [currentUser, authLoading, router]);

  if (authLoading || (!currentUser && !authLoading) || (currentUser && isLoadingProgress && coursesWithProgress.every(c => c.progressPercentage === undefined))) {
     // Mostra loader se autenticação está carregando, ou se usuário não está logado (aguardando redirect),
     // ou se o progresso ainda está sendo carregado pela primeira vez.
    return (
      <AppLayout>
        <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-xl text-muted-foreground">Loading dashboard...</p>
        </div>
      </AppLayout>
    );
  }
  
  // Se currentUser é null e authLoading é false, o redirect para /login já deve ter ocorrido
  // ou será tratado pelo useEffect. Este if é uma proteção adicional.
  if (!currentUser) {
     return (
      <AppLayout>
        <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-xl text-muted-foreground">Redirecting to login...</p>
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
      {coursesWithProgress.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {coursesWithProgress.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              progressPercentage={course.progressPercentage} 
            />
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
