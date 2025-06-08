import { BookOpen, Palette, Code2, Brain, Film, Briefcase, Rocket, Music } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface Lesson {
  id: string;
  title: string;
  videoUrl: string; 
  duration: string;
  description: string;
  dataAiHint: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  thumbnailUrl: string;
  instructor: string;
  lessons: Lesson[];
  Icon?: LucideIcon;
  dataAiHint: string;
}

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Creative Writing Essentials',
    description: 'Unlock your storytelling potential and master the art of narrative.',
    longDescription: 'Dive deep into character development, plot structuring, and finding your unique voice. This course covers various genres and techniques to help you craft compelling stories that captivate readers.',
    thumbnailUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'writing book',
    instructor: 'Virginia Woolf',
    Icon: BookOpen,
    lessons: [
      { id: '1-1', title: 'The Power of Story', videoUrl: 'https://placehold.co/1280x720.png', dataAiHint:'lecture presentation', duration: '12:35', description: 'Understanding the core elements of storytelling and its impact.' },
      { id: '1-2', title: 'Crafting Memorable Characters', videoUrl: 'https://placehold.co/1280x720.png', dataAiHint:'character sketch', duration: '18:20', description: 'Techniques for developing believable and engaging characters.' },
      { id: '1-3', title: 'Building Engaging Plots', videoUrl: 'https://placehold.co/1280x720.png', dataAiHint:'plot diagram', duration: '22:10', description: 'Learn about plot structures, pacing, and creating suspense.' },
    ],
  },
  {
    id: '2',
    title: 'Digital Art Fundamentals',
    description: 'Learn the basics of digital painting and illustration.',
    longDescription: 'From understanding your software to mastering digital brushes and color theory, this course provides a solid foundation for aspiring digital artists. Includes practical exercises and projects.',
    thumbnailUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'digital painting',
    instructor: 'Frida Kahlo',
    Icon: Palette,
    lessons: [
      { id: '2-1', title: 'Introduction to Digital Tools', videoUrl: 'https://placehold.co/1280x720.png', dataAiHint:'art software', duration: '15:40', description: 'Overview of common digital art software and hardware.' },
      { id: '2-2', title: 'Understanding Color Theory', videoUrl: 'https://placehold.co/1280x720.png', dataAiHint:'color wheel', duration: '20:05', description: 'Learn the fundamentals of color, harmony, and contrast.' },
    ],
  },
  {
    id: '3',
    title: 'Introduction to Web Development',
    description: 'Build modern websites with HTML, CSS, and JavaScript.',
    longDescription: 'This comprehensive course takes you from zero to hero in front-end web development. You\'ll learn to structure web pages, style them beautifully, and add interactivity with JavaScript.',
    thumbnailUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'coding screen',
    instructor: 'Ada Lovelace',
    Icon: Code2,
    lessons: [
      { id: '3-1', title: 'HTML: The Structure of the Web', videoUrl: 'https://placehold.co/1280x720.png', dataAiHint:'html code', duration: '14:00', description: 'Learn the basics of HTML tags and document structure.' },
      { id: '3-2', title: 'CSS: Styling Your Pages', videoUrl: 'https://placehold.co/1280x720.png', dataAiHint:'css style', duration: '25:30', description: 'Master CSS selectors, properties, and layout techniques.' },
      { id: '3-3', title: 'JavaScript: Adding Interactivity', videoUrl: 'https://placehold.co/1280x720.png', dataAiHint:'javascript logic', duration: '30:15', description: 'Introduction to JavaScript for dynamic web content.' },
    ],
  },
  {
    id: '4',
    title: 'Mindfulness & Meditation',
    description: 'Cultivate peace and presence in your daily life.',
    longDescription: 'Explore various meditation techniques, understand the science behind mindfulness, and learn how to integrate these practices for reduced stress and improved well-being.',
    thumbnailUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'meditation nature',
    instructor: 'Thich Nhat Hanh',
    Icon: Brain,
    lessons: [
      { id: '4-1', title: 'What is Mindfulness?', videoUrl: 'https://placehold.co/1280x720.png', dataAiHint:'calm mind', duration: '10:50', description: 'An introduction to the core concepts of mindfulness.' },
      { id: '4-2', title: 'Guided Meditation: Breath Awareness', videoUrl: 'https://placehold.co/1280x720.png', dataAiHint:'breathing exercise', duration: '15:25', description: 'A guided session focusing on the breath.' },
    ],
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return mockCourses.find(course => course.id === id);
};

export const getLessonById = (courseId: string, lessonId: string): Lesson | undefined => {
  const course = getCourseById(courseId);
  return course?.lessons.find(lesson => lesson.id === lessonId);
};
