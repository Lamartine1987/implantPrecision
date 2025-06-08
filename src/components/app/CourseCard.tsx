import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Course } from '@/lib/mockData';
import { ArrowRight, Users, Clock } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={course.thumbnailUrl}
            alt={course.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={course.dataAiHint}
          />
          {course.Icon && (
             <div className="absolute top-3 right-3 bg-background/80 text-primary p-2 rounded-full shadow-md">
                <course.Icon className="h-6 w-6" />
             </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <h3 className="text-xl font-headline font-semibold mb-2 text-primary group-hover:text-accent transition-colors">
          {course.title}
        </h3>
        <CardDescription className="text-sm text-muted-foreground mb-3 line-clamp-3">{course.description}</CardDescription>
        <div className="text-xs text-muted-foreground flex items-center">
          <Users className="w-4 h-4 mr-1.5" />
          <span>By {course.instructor}</span>
        </div>
        <div className="text-xs text-muted-foreground flex items-center mt-1">
          <Clock className="w-4 h-4 mr-1.5" />
          <span>{course.lessons.length} lessons</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/courses/${course.id}`} passHref className="w-full">
          <Button variant="default" className="w-full">
            View Course <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
