export const GALLERY_TYPES = ['Public', 'Portfolio', 'Client Review', 'Draft'] as const;
export const GALLERY_STATUSES = ['Active', 'Published', 'Draft'] as const;

export type GalleryType = (typeof GALLERY_TYPES)[number];
export type GalleryStatus = (typeof GALLERY_STATUSES)[number];

export interface ClientOption {
  id: string;
  name: string;
  email: string;
}

export interface Gallery {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: GalleryType;
  status: GalleryStatus;
  photos: number;
  views: number;
  lastUpdated: string;
  clientId?: string;
  coverPhotoId?: string;
  tags: string[];
  passwordProtected: boolean;
  password?: string;
  allowDownloads: boolean;
}

export interface GalleryFormData {
  name: string;
  description: string;
  type: GalleryType;
  status: GalleryStatus;
  clientId: string;
  coverPhotoId: string;
  tags: string;
  passwordProtected: boolean;
  password: string;
  allowDownloads: boolean;
}

export const mockClients: ClientOption[] = [
  { id: 'client-1', name: 'Sarah Johnson', email: 'sarah@example.com' },
  { id: 'client-2', name: 'Acme Corporation', email: 'marketing@acme.com' },
  { id: 'client-3', name: 'Liam Carter', email: 'liam@example.com' },
  { id: 'client-4', name: 'Northstar Events', email: 'events@northstar.com' },
];

export const initialGalleryFormData: GalleryFormData = {
  name: '',
  description: '',
  type: 'Public',
  status: 'Draft',
  clientId: '',
  coverPhotoId: '',
  tags: '',
  passwordProtected: false,
  password: '',
  allowDownloads: true,
};

export const mockGalleries: Gallery[] = [
  {
    id: 1,
    name: 'Wedding - Sarah & John',
    slug: 'wedding-sarah-john',
    description: 'A curated client review gallery for the Johnson wedding.',
    type: 'Client Review',
    status: 'Active',
    photos: 156,
    views: 234,
    lastUpdated: '2 hours ago',
    clientId: 'client-1',
    coverPhotoId: '6',
    tags: ['wedding', 'ceremony', 'portrait'],
    passwordProtected: true,
    password: 'client-access',
    allowDownloads: false,
  },
  {
    id: 2,
    name: 'Corporate Headshots',
    slug: 'corporate-headshots',
    description: 'Professional portraits for company profiles and press kits.',
    type: 'Public',
    status: 'Published',
    photos: 89,
    views: 1234,
    lastUpdated: '1 day ago',
    clientId: 'client-2',
    coverPhotoId: '2',
    tags: ['portrait', 'professional', 'studio'],
    passwordProtected: false,
    allowDownloads: true,
  },
  {
    id: 3,
    name: 'Nature Portfolio',
    slug: 'nature-portfolio',
    description: 'Selected landscape and wildlife imagery from recent trips.',
    type: 'Portfolio',
    status: 'Published',
    photos: 234,
    views: 5678,
    lastUpdated: '3 days ago',
    coverPhotoId: '7',
    tags: ['landscape', 'nature', 'wildlife'],
    passwordProtected: false,
    allowDownloads: true,
  },
  {
    id: 4,
    name: 'Street Photography',
    slug: 'street-photography',
    description: 'Work-in-progress set of candid urban scenes.',
    type: 'Draft',
    status: 'Draft',
    photos: 67,
    views: 0,
    lastUpdated: '1 week ago',
    tags: ['street', 'city', 'urban'],
    passwordProtected: false,
    allowDownloads: false,
  },
];

export function createGallerySlug(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function getNextGalleryId(galleries: Gallery[]): number {
  if (galleries.length === 0) {
    return 1;
  }

  return Math.max(...galleries.map((gallery) => gallery.id)) + 1;
}
