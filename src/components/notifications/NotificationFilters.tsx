import type { NotificationFilters } from '@/types/notification';

interface NotificationFiltersProps {
  filters: NotificationFilters;
  onChange: (filters: NotificationFilters) => void;
}

export function NotificationFiltersComponent({ filters, onChange }: NotificationFiltersProps) {
  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800 rounded-lg p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="type" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
            Type
          </label>
          <select
            id="type"
            value={filters.type}
            onChange={(e) => onChange({ ...filters, type: e.target.value as NotificationFilters['type'] })}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white"
          >
            <option value="all">All Types</option>
            <option value="info">Info</option>
            <option value="success">Success</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
            Status
          </label>
          <select
            id="status"
            value={filters.status}
            onChange={(e) => onChange({ ...filters, status: e.target.value as NotificationFilters['status'] })}
            className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white"
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>
    </div>
  );
}
