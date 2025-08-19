import { withAuth } from "@/components/auth/with-auth";
import { AlbumList } from "@/components/albums/album-list";
import { mockAlbums, mockPhotos } from "@/lib/data";
import { CreateAlbumDialog } from "@/components/albums/create-album-dialog";

function AlbumsPage() {
  const albums = mockAlbums;
  const photos = mockPhotos;

  return (
    <main className="flex-1 p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Albums</h1>
        <CreateAlbumDialog allPhotos={photos} />
      </div>
      <AlbumList albums={albums} photos={photos} />
    </main>
  );
}

export default withAuth(AlbumsPage);
