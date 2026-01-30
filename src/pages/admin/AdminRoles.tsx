import { useState } from 'react';
import { ShieldPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { RoleTable } from '@/components/roles/RoleTable';
import { RoleForm } from '@/components/roles/RoleForm';
import { RoleFiltersComponent } from '@/components/roles/RoleFilters';
import type { Role, RoleFormValues, RoleFilters } from '@/types/role';

// Mock data
const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Administrator',
    description: 'Full system access with all permissions',
    permissions: ['users.view', 'users.create', 'users.edit', 'users.delete', 'roles.view', 'roles.create', 'roles.edit', 'roles.delete', 'settings.view', 'settings.edit'],
    userCount: 2,
    status: 'active',
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '2',
    name: 'Manager',
    description: 'Can manage users and view reports',
    permissions: ['users.view', 'users.create', 'users.edit', 'roles.view', 'settings.view'],
    userCount: 1,
    status: 'active',
    createdAt: new Date('2025-02-01'),
  },
  {
    id: '3',
    name: 'User',
    description: 'Basic user with limited permissions',
    permissions: ['users.view', 'settings.view'],
    userCount: 1,
    status: 'active',
    createdAt: new Date('2025-03-10'),
  },
  {
    id: '4',
    name: 'Guest',
    description: 'Read-only access to the system',
    permissions: ['users.view'],
    userCount: 0,
    status: 'inactive',
    createdAt: new Date('2025-04-20'),
  },
];

export default function AdminRoles() {
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [filters, setFilters] = useState<RoleFilters>({
    name: '',
    status: '',
  });

  const filteredRoles = roles.filter((role) => {
    const nameMatch =
      !filters.name ||
      role.name.toLowerCase().includes(filters.name.toLowerCase());
    
    const statusMatch = !filters.status || role.status === filters.status;

    return nameMatch && statusMatch;
  });

  const handleAddRole = () => {
    setEditingRole(null);
    setIsDialogOpen(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    setIsDialogOpen(true);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (role && role.userCount > 0) {
      alert(`Cannot delete role "${role.name}" because it has ${role.userCount} user(s) assigned.`);
      return;
    }
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter((r) => r.id !== roleId));
    }
  };

  const handleSubmitRole = (values: RoleFormValues) => {
    if (editingRole) {
      // Update existing role
      setRoles(
        roles.map((r) =>
          r.id === editingRole.id
            ? { ...r, ...values }
            : r
        )
      );
    } else {
      // Add new role
      const newRole: Role = {
        id: Date.now().toString(),
        ...values,
        userCount: 0,
        createdAt: new Date(),
      };
      setRoles([...roles, newRole]);
    }
    setIsDialogOpen(false);
    setEditingRole(null);
  };

  const initialFormValues: RoleFormValues = editingRole
    ? {
        name: editingRole.name,
        description: editingRole.description,
        permissions: editingRole.permissions,
        status: editingRole.status,
      }
    : {
        name: '',
        description: '',
        permissions: [],
        status: 'active',
      };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent animate-gradient">
            Role Management
          </h1>
          <p className="mt-2 text-lg" style={{ color: '#ff8e47' }}>
            Define roles and assign permissions
          </p>
        </div>
        <button
          onClick={handleAddRole}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 shadow-lg hover:shadow-orange-500/50"
          style={{ backgroundColor: '#ffc39a', color: 'white' }}
        >
          <ShieldPlus className="w-5 h-5" />
          Add New Role
        </button>
      </div>

      {/* Filters */}
      <RoleFiltersComponent filters={filters} onFilterChange={setFilters} />

      {/* Role Table */}
      <RoleTable
        roles={filteredRoles}
        onEdit={handleEditRole}
        onDelete={handleDeleteRole}
      />

      {/* Results Count */}
      <div className="text-sm" style={{ color: '#ff8e47' }}>
        Showing {filteredRoles.length} of {roles.length} roles
      </div>

      {/* Add/Edit Role Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black border-gray-800 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold" style={{ color: '#ff6200' }}>
              {editingRole ? 'Edit Role' : 'Add New Role'}
            </DialogTitle>
            <DialogDescription style={{ color: '#ff8e47' }}>
              {editingRole
                ? 'Update role information and permissions below'
                : 'Create a new role with specific permissions'}
            </DialogDescription>
          </DialogHeader>
          <RoleForm
            initialValues={initialFormValues}
            onSubmit={handleSubmitRole}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
