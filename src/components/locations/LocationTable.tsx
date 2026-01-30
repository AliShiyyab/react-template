import { Edit, Trash2, Users, MapPin, Building, Phone, Mail } from 'lucide-react';
import type { Location } from '@/types/location';

interface LocationTableProps {
  locations: Location[];
  onEdit: (location: Location) => void;
  onDelete: (id: string) => void;
}

export function LocationTable({ locations, onEdit, onDelete }: LocationTableProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'office':
        return 'bg-blue-500/20 text-blue-500';
      case 'warehouse':
        return 'bg-purple-500/20 text-purple-500';
      case 'store':
        return 'bg-green-500/20 text-green-500';
      case 'remote':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="text-left py-4 px-4 font-semibold" style={{ color: '#fff5ee' }}>
              Location
            </th>
            <th className="text-left py-4 px-4 font-semibold" style={{ color: '#fff5ee' }}>
              Type
            </th>
            <th className="text-left py-4 px-4 font-semibold" style={{ color: '#fff5ee' }}>
              Address
            </th>
            <th className="text-left py-4 px-4 font-semibold" style={{ color: '#fff5ee' }}>
              Contact
            </th>
            <th className="text-left py-4 px-4 font-semibold" style={{ color: '#fff5ee' }}>
              Manager
            </th>
            <th className="text-left py-4 px-4 font-semibold" style={{ color: '#fff5ee' }}>
              Employees
            </th>
            <th className="text-left py-4 px-4 font-semibold" style={{ color: '#fff5ee' }}>
              Status
            </th>
            <th className="text-left py-4 px-4 font-semibold" style={{ color: '#fff5ee' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr
              key={location.id}
              className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" style={{ color: '#ff6200' }} />
                  <span className="text-white font-semibold">{location.name}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getTypeColor(location.type)}`}>
                  {location.type}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#ff8e47' }} />
                  <div className="text-sm" style={{ color: '#fff5ee' }}>
                    <div>{location.address}</div>
                    <div className="text-xs" style={{ color: '#ff8e47' }}>
                      {location.city}, {location.state} {location.zipCode}
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="text-sm space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" style={{ color: '#ff8e47' }} />
                    <span style={{ color: '#fff5ee' }}>{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" style={{ color: '#ff8e47' }} />
                    <span style={{ color: '#fff5ee' }}>{location.email}</span>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-sm" style={{ color: '#fff5ee' }}>
                {location.manager}
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" style={{ color: '#ff6200' }} />
                  <span className="text-white font-semibold">{location.employeeCount}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    location.status === 'active'
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-red-500/20 text-red-500'
                  }`}
                >
                  {location.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(location)}
                    className="p-2 rounded-lg transition-all duration-200 hover:bg-orange-500/10"
                    style={{ color: '#ff6200' }}
                    title="Edit location"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(location.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 transition-all duration-200 text-red-500"
                    title="Delete location"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
