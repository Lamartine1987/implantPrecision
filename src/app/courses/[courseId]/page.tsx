
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AppLayout from '@/components/app/AppLayout';
import { getCourseById, type Course, type Lesson } from '@/lib/mockData';
import VideoPlayer from '@/components/app/VideoPlayerPlaceholder';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, PlayCircle, CheckCircle, Clock, Users, Info, Loader2 } from 'lucide-react';
import { db } from '@/lib/firebase'; 
import { ref, set, get } from 'firebase/database';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/AuthContext';

interface CompletedLessons {
  [lessonId: string]: boolean;
}

export default function CoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.courseId as string;
  const { toast } = useToast();
  const { currentUser, loading: authLoading } = useAuth();

  const [course, setCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isLoadingCourseData, setIsLoadingCourseData] = useState(true);
  const [completedLessons, setCompletedLessons] = useState<CompletedLessons>({});
  const [isSavingProgress, setIsSavingProgress] = useState(false);

  useEffect(() => {
    if (!authLoading && !currentUser) {
      router.push('/login');
    }
  }, [currentUser, authLoading, router]);

  useEffect(() => {
    if (courseId && currentUser) { // Only fetch if user is available
      setIsLoadingCourseData(true);
      const fetchedCourse = getCourseById(courseId);
      if (fetchedCourse) {
        setCourse(fetchedCourse);
        if (fetchedCourse.lessons.length > 0) {
          setSelectedLesson(fetchedCourse.lessons[0]);
        }

        const loadProgress = async () => {
          if (!fetchedCourse.id || !currentUser.uid) return;
          try {
            const userCourseProgressRef = ref(db, `usersProgress/${currentUser.uid}/${fetchedCourse.id}`);
            const snapshot = await get(userCourseProgressRef);
            if (snapshot.exists()) {
              setCompletedLessons(snapshot.val());
            } else {
              setCompletedLessons({});
            }
          } catch (error) {
            console.error("Failed to load progress from Firebase:", error);
            let toastDescription = "Could not load your course progress. Please check your network or try again.";
            if (error instanceof Error && error.message) {
              if (error.message.toLowerCase().includes('permission_denied') || error.message.toLowerCase().includes('permission denied')) {
                toastDescription = "Permission denied. Please check Firebase Database rules.";
              } else {
                toastDescription = error.message; 
              }
            }
            toast({
              title: "Error Loading Progress",
              description: toastDescription,
              variant: "destructive",
            });
            setCompletedLessons({});
          } finally {
            setIsLoadingCourseData(false);
          }
        };
        loadProgress();

      } else {
        router.push('/dashboard');
        setIsLoadingCourseData(false);
      }
    } else if (!authLoading && !currentUser) { // User not logged in, course data not relevant
        setIsLoadingCourseData(false);
    }
  }, [courseId, router, toast, currentUser, authLoading]);

  const handleToggleLessonCompleted = async (lessonIdToToggle: string) => {
    if (!course || !selectedLesson || !lessonIdToToggle || !currentUser || !currentUser.uid) return;

    setIsSavingProgress(true);
    const currentStatus = !!completedLessons[lessonIdToToggle];
    const newStatus = !currentStatus;

    const newCompletedLessonsOptimistic = {
      ...completedLessons,
      [lessonIdToToggle]: newStatus,
    };
    setCompletedLessons(newCompletedLessonsOptimistic);

    try {
      const lessonProgressRef = ref(db, `usersProgress/${currentUser.uid}/${course.id}/${lessonIdToToggle}`);
      await set(lessonProgressRef, newStatus);
    } catch (error) {
      console.error("Failed to save lesson progress to Firebase:", error);
      let toastDescription = "Could not save your progress. Please try again.";
       if (error instanceof Error && error.message) {
          if (error.message.toLowerCase().includes('permission_denied') || error.message.toLowerCase().includes('permission denied')) {
            toastDescription = "Permission denied. Please check Firebase Database rules.";
          } else {
            toastDescription = error.message;
          }
        }
      toast({
        title: "Error Saving Progress",
        description: toastDescription,
        variant: "destructive",
      });
      setCompletedLessons(prevCompletedLessons => {
        const reverted = { ...prevCompletedLessons };
        if (reverted[lessonIdToToggle] === newStatus) {
           reverted[lessonIdToToggle] = currentStatus;
        }
        return reverted;
      });
    } finally {
      setIsSavingProgress(false);
    }
  };

  if (authLoading || isLoadingCourseData) {
    return (
      <AppLayout>
        <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
          <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
          <p className="text-xl text-muted-foreground">Loading course...</p>
        </div>
      </AppLayout>
    );
  }

  if (!currentUser) { // Should be caught by authLoading check or redirect, but as a fallback
    return (
      <AppLayout>
        <div className="text-center py-12">
          <Info className="w-16 h-16 mx-auto text-destructive mb-4" />
          <h1 className="text-3xl font-headline font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">Please log in to view this course.</p>
          <Button onClick={() => router.push('/login')}>
             Go to Login
          </Button>
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
            <>
              <div className="mt-6 mb-4 flex items-center space-x-2 p-4 bg-card rounded-lg shadow-md border">
                <Checkbox
                  id={`lesson-completed-${selectedLesson.id}`}
                  checked={!!completedLessons[selectedLesson.id]}
                  onCheckedChange={() => handleToggleLessonCompleted(selectedLesson.id)}
                  aria-label="Mark lesson as completed"
                  disabled={isSavingProgress}
                />
                <Label htmlFor={`lesson-completed-${selectedLesson.id}`} className="text-sm font-medium cursor-pointer select-none">
                  {isSavingProgress && <Loader2 className="inline-block mr-2 h-4 w-4 animate-spin" />}
                  Marcar como concluída
                </Label>
              </div>
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl">{selectedLesson.title}</CardTitle>
                  <CardDescription>Duration: {selectedLesson.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{selectedLesson.description}</p>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Course Lessons</CardTitle>
              <CardDescription>{course.lessons.length} lessons in this course.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-20rem)] sm:h-[calc(100vh-24rem)] md:h-[35rem] lg:h-[calc(100vh-26rem)]">
                <ul className="divide-y divide-border">
                  {course.lessons.map((lesson, index) => (
                    <li key={lesson.id}>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start h-auto p-4 text-left rounded-none ${
                          selectedLesson?.id === lesson.id ? 'bg-accent/20 text-accent-foreground' : ''
                        } hover:bg-accent/10`}
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
                            <div className="flex items-center">
                                <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                                {completedLessons[lesson.id] && (
                                    <CheckCircle className="h-4 w-4 ml-2 text-green-500 shrink-0" />
                                )}
                            </div>
                          </div>
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
