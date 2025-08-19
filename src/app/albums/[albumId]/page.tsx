"use client";

import { notFound } from "next/navigation";
import { withAuth } from "@/components/auth/with-auth";
import { PhotoGrid } from "@/components/photos/photo-grid";
import { mockAlbums, mockPhotos } from "@/lib/data";
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

function AlbumDetailPage({ params }: { params: { albumId: string } }) {
  const album = mockAlbums.find((a) => a.id === params.albumId);

  if (!album) {
    notFound();
  }

  const photosInAlbum = mockPhotos.filter((p) =>
    album.photoIds.includes(p.id)
  );

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="mb-6">
        <Link href="/albums" className="flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Albums
        </Link>
        <h1 className="text-3xl font-bold">{album.name}</h1>
        <p className="text-lg text-muted-foreground mt-2">{album.description}</p>
      </div>
      <PhotoGrid photos={photosInAlbum} />
    </main>
  );
}

const AuthAlbumDetailPage = withAuth(AlbumDetailPage);

function AlbumDetailStaticPage({ params }: { params: { albumId: string } }) {
  return <AuthAlbumDetailPage params={params} />;
}

export default AlbumDetailStaticPage;

export async function generateStaticParams() {
  return mockAlbums.map((album) => ({
    albumId: album.id,
  }));
}
