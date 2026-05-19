'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Eye, Heart, Download, Tag } from 'lucide-react';
import { Photo, mockPhotos } from '@/lib/mock-photo-data';
import PhotoCard from './PhotoCard';

interface GalleryGridProps {
  limit?: number;
  className?: string;
  onLoadMore?: () => void;
  isLoading?: boolean;
  selectedTags?: string[];
  searchQuery?: string;
  currentPage?: number;
  viewMode?: 'grid' | 'list';
}

export function GalleryGrid({ 
  limit = 6, 
  className = "", 
  onLoadMore,
  isLoading = false,
  selectedTags = [],
  searchQuery = "",
  currentPage = 1,
  viewMode = 'grid'
}: GalleryGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  // Memoize filtered photos to avoid recalculation on every render
  const filteredPhotos = useMemo(() => {
    return mockPhotos.filter(photo => {
      // Filter by tags
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => photo.tags.includes(tag.toLowerCase()));
      
      // Filter by search query
      const matchesSearch = searchQuery === "" ||
        photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        photo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (photo.photographer && photo.photographer.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesTags && matchesSearch;
    });
  }, [selectedTags, searchQuery]);

  // Calculate pagination
  const totalPhotos = filteredPhotos.length;
  const photosPerPage = limit;
  const totalPages = Math.ceil(totalPhotos / photosPerPage);
  const startIndex = (currentPage - 1) * photosPerPage;
  const endIndex = currentPage * photosPerPage;
  const displayedPhotos = filteredPhotos.slice(startIndex, endIndex);
  const hasMore = endIndex < totalPhotos;

  const toggleLike = useCallback((photoId: string) => {
    setLikedPhotos(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(photoId)) {
        newLiked.delete(photoId);
      } else {
        newLiked.add(photoId);
      }
      return newLiked;
    });
  }, []);

  const handleImageError = useCallback((photoId: string) => {
    setImageErrors(prev => new Set(prev).add(photoId));
  }, []);

  useEffect(() => {
    if (!selectedPhoto) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto]);

  return (
    <div className={`w-full ${className}`}>
      {/* Gallery Grid */}
      <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {displayedPhotos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            index={index}
            isLiked={likedPhotos.has(photo.id)}
            hasImageError={imageErrors.has(photo.id)}
            viewMode={viewMode}
            onLike={toggleLike}
            onImageError={handleImageError}
            onSelectPhoto={setSelectedPhoto}
          />
        ))}
      </div>

      {/* Empty State */}
      {displayedPhotos.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Eye className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
            {selectedTags.length > 0 || searchQuery ? 'No photos match your filters' : 'No photos yet'}
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            {selectedTags.length > 0 || searchQuery 
              ? 'Try adjusting your search terms or selected tags' 
              : 'Upload your first photos to get started'
            }
          </p>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && onLoadMore && (
        <div className="text-center mt-12">
          <button
            onClick={onLoadMore}
            disabled={isLoading}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Loading...' : 'Next Page'}
          </button>
          <div className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>
      )}

      {/* Photo Detail Modal - Placeholder for future implementation */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="photo-detail-title"
            className="bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 id="photo-detail-title" className="text-2xl font-bold">{selectedPhoto.title}</h2>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  aria-label="Close photo details"
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              </div>
              <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-700">
                  {selectedPhoto.url && !imageErrors.has(selectedPhoto.id) ? (
                    <Image
                      src={selectedPhoto.url}
                      alt={selectedPhoto.title}
                      fill
                      sizes="(min-width: 768px) 60vw, 100vw"
                      className="object-cover"
                      onError={() => handleImageError(selectedPhoto.id)}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-900">
                      <Eye className="h-12 w-12 text-white/80" />
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  {selectedPhoto.photographer && (
                    <p className="text-slate-600 dark:text-slate-300">
                      Photographer: <span className="font-medium text-slate-900 dark:text-white">{selectedPhoto.photographer}</span>
                    </p>
                  )}
                  {selectedPhoto.dateTaken && (
                    <p className="text-slate-600 dark:text-slate-300">
                      Date taken: <span className="font-medium text-slate-900 dark:text-white">{selectedPhoto.dateTaken}</span>
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.tags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="card-base p-3">
                      <Heart className="h-5 w-5 mx-auto mb-1 text-red-500" />
                      <div className="font-semibold text-slate-900 dark:text-white">{selectedPhoto.likes + (likedPhotos.has(selectedPhoto.id) ? 1 : 0)}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Likes</div>
                    </div>
                    <div className="card-base p-3">
                      <Eye className="h-5 w-5 mx-auto mb-1 text-blue-500" />
                      <div className="font-semibold text-slate-900 dark:text-white">{selectedPhoto.views}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Views</div>
                    </div>
                    <div className="card-base p-3">
                      <Download className="h-5 w-5 mx-auto mb-1 text-green-500" />
                      <div className="font-semibold text-slate-900 dark:text-white">{selectedPhoto.downloads}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">Downloads</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
