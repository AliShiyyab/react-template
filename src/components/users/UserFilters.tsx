import { Search } from 'lucide-react';
import type { UserFilters } from '@/types/user';

interface UserFiltersProps {
  filters: UserFilters;
  onFilterChange: (filters: UserFilters) => void;
}

export function UserFiltersComponent({ filters, onFilterChange }: UserFiltersProps) {
  const handleChange = (field: keyof UserFilters, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Name Filter */}
      <div>
        <label htmlFor="nameFilter" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" style={{ color: '#ff6200' }} />
            Search by Name
          </div>
        </label>
        <input
          type="text"
          id="nameFilter"
          value={filters.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="First or last name..."
          className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white placeholder-gray-500"
        />
      </div>

      {/* Email Filter */}
      <div>
        <label htmlFor="emailFilter" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" style={{ color: '#ff6200' }} />
            Search by Email
          </div>
        </label>
        <input
          type="text"
          id="emailFilter"
          value={filters.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Email address..."
          className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white placeholder-gray-500"
        />
      </div>

      {/* Status Filter */}
      <div>
        <label htmlFor="statusFilter" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
          Status
        </label>
        <select
          id="statusFilter"
          value={filters.status}
          onChange={(e) => handleChange('status', e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white"
        >
          <option value="">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>
    </div>
  );
}
