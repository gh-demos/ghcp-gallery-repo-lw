'use client';

import React, { memo } from 'react';
import Image from 'next/image';
import { Heart, Download, Share2, Eye, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Photo } from '@/lib/mock-photo-data';

interface PhotoCardProps {
  photo: Photo;
  index: number;
  isLiked: boolean;
  hasImageError: boolean;
  viewMode: 'grid' | 'list';
  onLike: (photoId: string) => void;
  onImageError: (photoId: string) => void;
  onSelectPhoto: (photo: Photo) => void;
}

const PhotoCard = memo(({
  photo,
  index,
  isLiked,
  hasImageError,
  viewMode,
  onLike,
  onImageError,
  onSelectPhoto,
}: PhotoCardProps) => {
  return (
    <motion.div
      key={photo.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`group relative card-elevated overflow-hidden ${viewMode === 'list' ? 'md:flex' : ''}`}
    >
      {/* Photo Container */}
      <div className={`relative overflow-hidden ${viewMode === 'list' ? 'aspect-[4/3] md:aspect-auto md:w-64 md:shrink-0' : 'aspect-[4/3]'}`}>
        {photo.url && !hasImageError ? (
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => onImageError(photo.id)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-200 to-slate-400 dark:from-slate-700 dark:to-slate-900">
            <Eye className="h-10 w-10 text-white/80" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => onSelectPhoto(photo)}
              aria-label={`View details for ${photo.title}`}
              className="btn-secondary"
            >
              View Details
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => onLike(photo.id)}
            aria-label={`${isLiked ? 'Unlike' : 'Like'} ${photo.title}`}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            aria-label={`Download ${photo.title}`}
            className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm transition-colors"
          >
            <Download className="h-4 w-4" />
          </button>
          <button
            aria-label={`Share ${photo.title}`}
            className="p-2 rounded-full bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm transition-colors"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Photo Info */}
      <div className="p-4 flex-1">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2 truncate">
          {photo.title}
        </h3>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {photo.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded-full"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
          {photo.tags.length > 3 && (
            <span className="text-xs text-slate-500 px-2 py-1">
              +{photo.tags.length - 3} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {photo.likes + (isLiked ? 1 : 0)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {photo.views}
            </span>
            <span className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              {photo.downloads}
            </span>
          </div>
        </div>

        {/* Photographer */}
        {photo.photographer && (
          <div className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            by {photo.photographer}
          </div>
        )}
      </div>
    </motion.div>
  );
});

PhotoCard.displayName = 'PhotoCard';

export default PhotoCard;
