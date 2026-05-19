import Link from 'next/link';
import { Plus, Search } from 'lucide-react';

interface AdminGalleryToolbarProps {
  searchQuery: string;
  statusFilter: string;
  typeFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  onClearFilters: () => void;
  createHref: string;
}

export function AdminGalleryToolbar({
  searchQuery,
  statusFilter,
  typeFilter,
  onSearchChange,
  onStatusFilterChange,
  onTypeFilterChange,
  onClearFilters,
  createHref,
}: AdminGalleryToolbarProps) {
  return (
    <div className="card-base p-4 md:p-6 mb-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="grid gap-4 md:grid-cols-3 flex-1">
          <div>
            <label htmlFor="gallery-search" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                id="gallery-search"
                type="text"
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                placeholder="Search galleries..."
                className="form-input pl-9"
              />
            </div>
          </div>

          <div>
            <label htmlFor="gallery-status-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Status
            </label>
            <select
              id="gallery-status-filter"
              className="form-select"
              value={statusFilter}
              onChange={(event) => onStatusFilterChange(event.target.value)}
            >
              <option value="all">All statuses</option>
              <option value="Active">Active</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div>
            <label htmlFor="gallery-type-filter" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Type
            </label>
            <select
              id="gallery-type-filter"
              className="form-select"
              value={typeFilter}
              onChange={(event) => onTypeFilterChange(event.target.value)}
            >
              <option value="all">All types</option>
              <option value="Public">Public</option>
              <option value="Portfolio">Portfolio</option>
              <option value="Client Review">Client Review</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button type="button" onClick={onClearFilters} className="btn-secondary">
            Clear Filters
          </button>
          <Link href={createHref} className="btn-primary inline-flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Create New Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
