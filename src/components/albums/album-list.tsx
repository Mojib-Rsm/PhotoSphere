"use client";

import Link from "next/link";
import Image from "next/image";
import { Album, Photo } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function AlbumList({ albums, photos }: { albums: Album[], photos: Photo[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {albums.map((album) => {
        const photoCount = album.photoIds.length;
        return (
          <Link href={`/albums/${album.id}`} key={album.id}>
            <Card className="overflow-hidden group h-full flex flex-col">
              <CardHeader className="p-0">
                <div className="aspect-video overflow-hidden">
                    <Image
                      src={album.coverPhotoUrl}
                      alt={album.name}
                      width={600}
                      height={400}
                      data-ai-hint={album.aiHint}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className="text-lg font-semibold">{album.name}</CardTitle>
                <CardDescription className="mt-1 line-clamp-2">{album.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <p className="text-sm text-muted-foreground">{photoCount} photos</p>
              </CardFooter>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
