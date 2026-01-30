import { Edit2, Trash2 } from 'lucide-react';
import type { User } from '@/types/user';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const formatDateTime = (date: Date | null) => {
    if (!date) return 'Never';
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: 'bg-green-500/20 text-green-400 border-green-500/50',
      inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
      suspended: 'bg-red-500/20 text-red-400 border-red-500/50',
    };
    return colors[status as keyof typeof colors] || colors.inactive;
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-800">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              Username
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              First Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              Last Name
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              Email
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              Role
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              Status
            </th>
            <th className="px-6 py-4 text-left text-sm font-semibold" style={{ color: '#ff6200' }}>
              Last Login
            </th>
            <th className="px-6 py-4 text-center text-sm font-semibold" style={{ color: '#ff6200' }}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-black">
          {users.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-6 py-12 text-center" style={{ color: '#ff8e47' }}>
                No users found. Add your first user to get started.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {user.username}
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: '#fff5ee' }}>
                  {user.firstName}
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: '#fff5ee' }}>
                  {user.lastName}
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: '#ff8e47' }}>
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/50">
                    {user.roleName}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(
                      user.status
                    )}`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm" style={{ color: '#fff5ee' }}>
                  {formatDateTime(user.lastLogin)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="p-2 rounded-lg bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 transition-all group"
                      title="Edit user"
                    >
                      <Edit2 className="w-4 h-4 text-orange-400 group-hover:text-orange-300" />
                    </button>
                    <button
                      onClick={() => onDelete(user.id)}
                      className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 transition-all group"
                      title="Delete user"
                    >
                      <Trash2 className="w-4 h-4 text-red-400 group-hover:text-red-300" />
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
