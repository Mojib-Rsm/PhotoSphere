"use client";

import { useState } from "react";
import Image from "next/image";
import { Photo } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { PhotoViewDialog } from "./photo-view-dialog";

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [open, setOpen] = useState(false);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative" onClick={() => handlePhotoClick(photo)}>
            <Card className="overflow-hidden cursor-pointer">
              <CardContent className="p-0">
                <Image
                  src={photo.url}
                  alt={photo.description}
                  width={600}
                  height={400}
                  data-ai-hint={photo.aiHint}
                  className="aspect-square object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </CardContent>
            </Card>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <PhotoViewDialog
          open={open}
          onOpenChange={setOpen}
          photos={photos}
          initialPhoto={selectedPhoto}
        />
      )}
    </>
  );
}
