"use client";

import { motion } from "framer-motion";
import { Calendar, Edit, Eye, FolderOpen, Trash2, TrendingUp } from "lucide-react";

/**
 * Gallery row data used by the reusable gallery table component.
 */
export interface GalleryTableItem {
  id: number | string;
  name: string;
  type: string;
  photos: number;
  views: number;
  status: string;
  lastUpdated: string;
}

/**
 * Props for the GalleryTable component.
 */
export interface GalleryTableProps {
  galleries: GalleryTableItem[];
  className?: string;
  emptyMessage?: string;
  onView?: (gallery: GalleryTableItem) => void;
  onEdit?: (gallery: GalleryTableItem) => void;
  onDelete?: (gallery: GalleryTableItem) => void;
}

function getGalleryTypeClass(type: string) {
  if (type === "Client Review" || type === "Portfolio") {
    return "status-private";
  }

  if (type === "Public") {
    return "status-active";
  }

  return "status-draft";
}

function getGalleryStatusClass(status: string) {
  return status === "Active" || status === "Published"
    ? "status-active"
    : "status-draft";
}

/**
 * Responsive gallery management table for admin and dashboard surfaces.
 *
 * @example
 * <SectionContainer>
 *   <SectionTitle title="Recent Galleries" viewAllLink="/admin/galleries" />
 *   <GalleryTable galleries={recentGalleries} />
 * </SectionContainer>
 */
export function GalleryTable({
  galleries,
  className = "",
  emptyMessage = "No galleries to display.",
  onView,
  onEdit,
  onDelete,
}: GalleryTableProps) {
  if (galleries.length === 0) {
    return (
      <div className={`card-base p-8 text-center ${className}`}>
        <FolderOpen className="mx-auto mb-4 h-10 w-10 text-slate-400" />
        <p className="text-slate-600 dark:text-slate-300">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`card-base overflow-hidden ${className}`}
    >
      <div className="divide-y divide-slate-200 dark:divide-slate-700 md:hidden">
        {galleries.map((gallery, index) => (
          <motion.div
            key={gallery.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="space-y-4 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-semibold text-slate-900 dark:text-white">{gallery.name}</h4>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{gallery.type}</p>
              </div>
              <span className={`status-badge ${getGalleryStatusClass(gallery.status)}`}>
                {gallery.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/70">
                <div className="mb-1 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <FolderOpen className="h-4 w-4" />
                  <span>Photos</span>
                </div>
                <p className="font-medium text-slate-900 dark:text-white">{gallery.photos}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/70">
                <div className="mb-1 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <TrendingUp className="h-4 w-4" />
                  <span>Views</span>
                </div>
                <p className="font-medium text-slate-900 dark:text-white">{gallery.views.toLocaleString()}</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/70">
                <div className="mb-1 text-slate-500 dark:text-slate-400">Type</div>
                <span className={`status-badge ${getGalleryTypeClass(gallery.type)}`}>
                  {gallery.type}
                </span>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/70">
                <div className="mb-1 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <span>Updated</span>
                </div>
                <p className="font-medium text-slate-900 dark:text-white">{gallery.lastUpdated}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onView?.(gallery)}
                aria-label={`View ${gallery.name}`}
                className="btn-icon"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onEdit?.(gallery)}
                aria-label={`Edit ${gallery.name}`}
                className="btn-icon btn-icon-success"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onDelete?.(gallery)}
                aria-label={`Delete ${gallery.name}`}
                className="btn-icon btn-icon-danger"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Gallery Name</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Type</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Photos</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Views</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Status</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Last Updated</th>
              <th className="px-6 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {galleries.map((gallery) => (
              <tr key={gallery.id} className="table-row">
                <td className="px-6 py-4">
                  <div className="font-medium text-slate-900 dark:text-white">{gallery.name}</div>
                </td>
                <td className="px-6 py-4">
                  <span className={`status-badge ${getGalleryTypeClass(gallery.type)}`}>
                    {gallery.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{gallery.photos}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{gallery.views.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`status-badge ${getGalleryStatusClass(gallery.status)}`}>
                    {gallery.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{gallery.lastUpdated}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onView?.(gallery)}
                      aria-label={`View ${gallery.name}`}
                      className="btn-icon"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit?.(gallery)}
                      aria-label={`Edit ${gallery.name}`}
                      className="btn-icon btn-icon-success"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete?.(gallery)}
                      aria-label={`Delete ${gallery.name}`}
                      className="btn-icon btn-icon-danger"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
