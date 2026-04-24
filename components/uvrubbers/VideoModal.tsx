"use client";

import { Play } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type VideoModalProps = {
  description: string;
  poster: string;
  title: string;
  videoSrc: string;
};

const VideoModal = ({ description, poster, title, videoSrc }: VideoModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group surface-panel relative block w-full overflow-hidden rounded-md text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <div className="relative aspect-video overflow-hidden">
            <img
              src={poster}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-brand transition-transform duration-300 group-hover:scale-105">
                <Play className="h-6 w-6 fill-current" />
              </span>
            </div>
          </div>
          <div className="space-y-2 px-5 py-4">
            <h3 className="text-2xl leading-none text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl border-border bg-dark p-2 sm:p-3 overflow-hidden">
        <div className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </div>
        <video className="aspect-video w-full rounded-xl" controls autoPlay muted playsInline preload="metadata">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </DialogContent>
    </Dialog>
  );
};

export default VideoModal;