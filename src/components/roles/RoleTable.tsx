import { Edit2, Trash2, Users } from 'lucide-react';
import type { Role } from '@/types/role';

interface RoleTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (roleId: string) => void;
}

export function RoleTable({ roles, onEdit, onDelete }: RoleTableProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-500/20 text-green-400 border-green-500/50',
      inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
    };
    return colors[status as keyof typeof colors] || colors.inactive;
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              Role Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              Description
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              Permissions
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold" style={{ color: '#ff6200' }}>
              Users Count
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              Created
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold" style={{ color: '#ff6200' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-black">
          {roles.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-12 text-center" style={{ color: '#ff8e47' }}>
                No roles found. Add your first role to get started.
              </td>
            </tr>
          ) : (
            roles.map((role) => (
              <tr
                key={role.id}
                className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {role.name}
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: '#fff5ee' }}>
                  <div className="max-w-xs truncate" title={role.description}>
                    {role.description}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: '#ff8e47' }}>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 2).map((perm) => (
                      <span
                        key={perm}
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30"
                      >
                        {perm.split('.')[1]}
                      </span>
                    ))}
                    {role.permissions.length > 2 && (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-700/50 text-gray-300"
                      >
                        +{role.permissions.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" style={{ color: '#ff6200' }} />
                    <span className="text-sm font-semibold text-white">
                      {role.userCount}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                      role.status
                    )}`}
                  >
                    {role.status.charAt(0).toUpperCase() + role.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: '#fff5ee' }}>
                  {formatDate(role.createdAt)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(role)}
                      className="p-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 transition-all group"
                      title="Edit role"
                    >
                      <Edit2 className="w-4 h-4 text-orange-400 group-hover:text-orange-300" />
                    </button>
                    <button
                      onClick={() => onDelete(role.id)}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 transition-all group"
                      title="Delete role"
                      disabled={role.userCount > 0}
                    >
                      <Trash2 className={`w-4 h-4 ${role.userCount > 0 ? 'text-gray-600 cursor-not-allowed' : 'text-red-400 group-hover:text-red-300'}`} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
