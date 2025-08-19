"use client";

import Image from "next/image";
import { Photo } from "@/lib/data";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface PhotoViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: Photo[];
  initialPhoto: Photo;
}

export function PhotoViewDialog({ open, onOpenChange, photos, initialPhoto }: PhotoViewDialogProps) {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api || !initialPhoto) return;
    const initialIndex = photos.findIndex(p => p.id === initialPhoto.id);
    if(initialIndex !== -1) {
        api.scrollTo(initialIndex, true);
    }
  }, [api, initialPhoto, photos]);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-full h-[90vh] bg-transparent border-0 p-0 flex items-center justify-center">
        <Carousel setApi={setApi} className="w-full h-full" opts={{loop: true}}>
          <CarouselContent className="h-full">
            {photos.map((photo) => (
              <CarouselItem key={photo.id} className="flex items-center justify-center">
                  <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
                     <Image
                        src={photo.url}
                        alt={photo.description}
                        fill
                        data-ai-hint={photo.aiHint}
                        className="object-contain"
                      />
                  </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-0" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 border-0" />
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
