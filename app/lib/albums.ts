import albumData from "./albums.json";

export interface Photo {
  id: string;
  name: string;
  src: string;
  thumbnail: string;
  width: number;
  height: number;
}

export interface Album {
  slug: string;
  title: string;
  category: string;
  group: string;
  driveUrl: string;
  photos: Photo[];
}

export interface AlbumPreview extends Omit<Album, "photos"> {
  cover: Photo;
  count: number;
}

export const albums: Album[] = albumData;
export const albumPreviews: AlbumPreview[] = albums.map(({ photos, ...album }) => ({
  ...album,
  cover: photos[0],
  count: photos.length,
}));
