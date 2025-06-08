import Image from 'next/image';
import { Film } from 'lucide-react';

interface VideoPlayerPlaceholderProps {
  title: string;
  videoUrl: string; // This will be the placeholder image URL
  dataAiHint: string;
}

export default function VideoPlayerPlaceholder({ title, videoUrl, dataAiHint }: VideoPlayerPlaceholderProps) {
  return (
    <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden shadow-inner flex flex-col items-center justify-center border">
      <Image 
        src={videoUrl} 
        alt={`Placeholder for ${title}`} 
        layout="fill"
        objectFit="cover"
        className="opacity-80"
        data-ai-hint={dataAiHint}
      />
      <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 text-center">
        <Film className="h-16 w-16 text-background/70 mb-4" />
        <h3 className="text-xl font-semibold text-background font-headline">{title}</h3>
        <p className="text-sm text-background/80 mt-1">Video content will appear here.</p>
      </div>
    </div>
  );
}
