
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/app/AppLayout';
import { getCourseById, type Course, type Lesson } from '@/lib/mockData';
import VideoPlayer from '@/components/app/VideoPlayerPlaceholder'; // Filename is placeholder, but component is now a player
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { ArrowLeft, PlayCircle, CheckCircle, Clock, Users, Info } from 'lucide-react';

export default function CoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (courseId) {
      const fetchedCourse = getCourseById(courseId);
      if (fetchedCourse) {
        setCourse(fetchedCourse);
        // Select the first lesson by default if available
        if (fetchedCourse.lessons.length > 0) {
          setSelectedLesson(fetchedCourse.lessons[0]);
        }
      } else {
        // Handle course not found, e.g., redirect or show error
        router.push('/dashboard'); // Simple redirect for now
      }
      setIsLoading(false);
    }
  }, [courseId, router]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <Clock className="w-12 h-12 animate-spin text-primary" />
          <p className="ml-4 text-xl text-muted-foreground">Loading course...</p>
        </div>
      </AppLayout>
    );
  }

  if (!course) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <Info className="w-16 h-16 mx-auto text-destructive mb-4" />
          <h1 className="text-3xl font-headline font-bold mb-2">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The course you are looking for does not exist or has been moved.</p>
          <Button onClick={() => router.push('/dashboard')}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
      </AppLayout>
    );
  }

  const CourseIcon = course.Icon || Info;

  return (
    <AppLayout>
      <div className="mb-6">
        <Button variant="outline" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <div className="flex items-start gap-4 mb-2">
           <CourseIcon className="w-12 h-12 text-primary mt-1" />
           <div>
            <h1 className="text-4xl font-headline font-bold text-gray-800">{course.title}</h1>
            <p className="text-lg text-muted-foreground flex items-center mt-1">
                <Users className="w-5 h-5 mr-1.5 text-gray-500" /> Instructor: {course.instructor}
            </p>
           </div>
        </div>
        <p className="text-muted-foreground">{course.longDescription || course.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg overflow-hidden">
            <CardContent className="p-0">
              {selectedLesson ? (
                <VideoPlayer 
                    title={selectedLesson.title} 
                    videoUrl={selectedLesson.videoUrl}
                />
              ) : (
                <div className="aspect-video w-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Select a lesson to begin.</p>
                </div>
              )}
            </CardContent>
          </Card>
          {selectedLesson && (
            <Card className="mt-6 shadow-md">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{selectedLesson.title}</CardTitle>
                <CardDescription>Duration: {selectedLesson.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{selectedLesson.description}</p>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Course Lessons</CardTitle>
              <CardDescription>{course.lessons.length} lessons in this course.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-20rem)] sm:h-[calc(100vh-24rem)] md:h-[30rem] lg:h-[calc(100vh-28rem)]"> {/* Adjusted height */}
                <ul className="divide-y">
                  {course.lessons.map((lesson, index) => (
                    <li key={lesson.id}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start h-auto p-4 text-left rounded-none ${
                          selectedLesson?.id === lesson.id ? 'bg-accent/20 text-accent-foreground' : ''
                        }`}
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <div className="flex items-center w-full">
                            {selectedLesson?.id === lesson.id ? (
                                <PlayCircle className="h-6 w-6 mr-3 text-primary shrink-0" />
                            ) : (
                                <span className="text-sm font-medium text-muted-foreground w-6 text-center mr-3 shrink-0">{index + 1}</span>
                            )}
                          
                          <div className="flex-grow overflow-hidden">
                            <p className="font-medium truncate">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                          </div>
                          {/* Placeholder for completion status */}
                          {/* <CheckCircle className="h-5 w-5 ml-auto text-green-500" /> */}
                        </div>
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
