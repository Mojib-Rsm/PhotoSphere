export interface Photo {
  id: string;
  url: string;
  description: string;
  date: string;
  location: string;
  aiHint: string;
}

export interface Album {
  id: string;
  name: string;
  description: string;
  coverPhotoUrl: string;
  photoIds: string[];
  aiHint: string;
}

export const mockPhotos: Photo[] = [
  { id: '1', url: 'https://placehold.co/600x400.png', description: 'A beautiful sunset over the ocean', date: '2023-10-26', location: 'Malibu, USA', aiHint: "sunset ocean" },
  { id: '2', url: 'https://placehold.co/400x600.png', description: 'A bustling city street at night', date: '2023-09-15', location: 'Tokyo, Japan', aiHint: "city night" },
  { id: '3', url: 'https://placehold.co/600x400.png', description: 'A serene forest path in autumn', date: '2023-10-10', location: 'Kyoto, Japan', aiHint: "autumn forest" },
  { id: '4', url: 'https://placehold.co/600x400.png', description: 'Snow-capped mountains under a clear blue sky', date: '2023-07-20', location: 'Alps, Switzerland', aiHint: "snow mountains" },
  { id: '5', url: 'https://placehold.co/400x600.png', description: 'A vibrant market full of fresh produce', date: '2023-08-05', location: 'Marrakech, Morocco', aiHint: "market produce" },
  { id: '6', url: 'https://placehold.co/600x400.png', description: 'A historic castle on a hilltop', date: '2023-06-12', location: 'Edinburgh, Scotland', aiHint: "historic castle" },
  { id: '7', url: 'https://placehold.co/600x400.png', description: 'Friends gathered around a campfire', date: '2023-08-19', location: 'Yosemite, USA', aiHint: "friends campfire" },
  { id: '8', url: 'https://placehold.co/400x600.png', description: 'A lone surfer riding a wave', date: '2023-07-01', location: 'Bali, Indonesia', aiHint: "surfer wave" },
  { id: '9', url: 'https://placehold.co/600x400.png', description: 'Cherry blossoms in full bloom', date: '2023-04-05', location: 'Tokyo, Japan', aiHint: "cherry blossoms" },
  { id: '10', url: 'https://placehold.co/600x400.png', description: 'A majestic waterfall in a lush jungle', date: '2023-05-22', location: 'Iguazu Falls, Brazil', aiHint: "majestic waterfall" },
  { id: '11', url: 'https://placehold.co/400x600.png', description: 'A colorful hot air balloon festival', date: '2023-09-30', location: 'Cappadocia, Turkey', aiHint: "hot-air balloon" },
  { id: '12', url: 'https://placehold.co/600x400.png', description: 'A cute cat napping in the sun', date: '2023-11-01', location: 'Home', aiHint: "cat napping" },
];

export const mockAlbums: Album[] = [
  {
    id: '1',
    name: 'Japan Trip 2023',
    description: 'A collection of photos from our amazing trip to Tokyo and Kyoto.',
    coverPhotoUrl: 'https://placehold.co/600x400.png',
    photoIds: ['2', '3', '9'],
    aiHint: 'tokyo kyoto',
  },
  {
    id: '2',
    name: 'Summer Adventures',
    description: 'All the fun we had during the summer of 2023.',
    coverPhotoUrl: 'https://placehold.co/600x400.png',
    photoIds: ['4', '7', '8'],
    aiHint: 'summer adventure',
  },
  {
    id: '3',
    name: 'Wonders of the World',
    description: 'Capturing the beauty of natural and man-made wonders.',
    coverPhotoUrl: 'https://placehold.co/600x400.png',
    photoIds: ['4', '10', '11'],
    aiHint: 'world wonders',
  },
];
