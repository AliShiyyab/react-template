import type { LocationFilters } from '@/types/location';

interface LocationFiltersProps {
  filters: LocationFilters;
  onChange: (filters: LocationFilters) => void;
}

export function LocationFiltersComponent({ filters, onChange }: LocationFiltersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div>
        <label htmlFor="filterName" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
          Search by Name
        </label>
        <input
          type="text"
          id="filterName"
          placeholder="Search locations..."
          value={filters.name}
          onChange={(e) => onChange({ ...filters, name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white"
        />
      </div>

      <div>
        <label htmlFor="filterType" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
          Type
        </label>
        <select
          id="filterType"
          value={filters.type}
          onChange={(e) => onChange({ ...filters, type: e.target.value as LocationFilters['type'] })}
          className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white"
        >
          <option value="all">All Types</option>
          <option value="office">Office</option>
          <option value="warehouse">Warehouse</option>
          <option value="store">Store</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      <div>
        <label htmlFor="filterStatus" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
          Status
        </label>
        <select
          id="filterStatus"
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as LocationFilters['status'] })}
          className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
    </div>
  );
}
