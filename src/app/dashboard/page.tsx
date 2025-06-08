import AppLayout from '@/components/app/AppLayout';
import CourseCard from '@/components/app/CourseCard';
import { mockCourses } from '@/lib/mockData';
import { GraduationCap } from 'lucide-react';

export default function DashboardPage() {
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
