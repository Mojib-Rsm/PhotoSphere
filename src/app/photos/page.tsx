"use client";

import { withAuth } from "@/components/auth/with-auth";
import { PhotoGrid } from "@/components/photos/photo-grid";
import { mockPhotos } from "@/lib/data";

function PhotosPage() {
  const photos = mockPhotos;
  
  return (
    <main className="flex-1 p-4 md:p-6">
        <h1 className="text-2xl font-semibold mb-4">All Photos</h1>
        <PhotoGrid photos={photos} />
    </main>
  );
}

export default withAuth(PhotosPage);
