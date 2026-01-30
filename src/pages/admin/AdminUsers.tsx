import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { UserTable } from '@/components/users/UserTable';
import { UserForm } from '@/components/users/UserForm';
import { UserFiltersComponent } from '@/components/users/UserFilters';
import type { User, UserFormValues, UserFilters } from '@/types/user';

// Mock roles data
const mockRoles = [
  { id: '1', name: 'Administrator', status: 'active' },
  { id: '2', name: 'Manager', status: 'active' },
  { id: '3', name: 'User', status: 'active' },
  { id: '4', name: 'Guest', status: 'inactive' },
];

// Mock data
const mockUsers: User[] = [
  {
    id: '1',
    username: 'johndoe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    roleId: '1',
    roleName: 'Administrator',
    status: 'active',
    lastLogin: new Date('2026-01-30T14:30:00'),
  },
  {
    id: '2',
    username: 'janesmith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    roleId: '1',
    roleName: 'Administrator',
    status: 'active',
    lastLogin: new Date('2026-01-29T10:15:00'),
  },
  {
    id: '3',
    username: 'bobwilson',
    firstName: 'Bob',
    lastName: 'Wilson',
    email: 'bob.wilson@example.com',
    roleId: '2',
    roleName: 'Manager',
    status: 'inactive',
    lastLogin: new Date('2026-01-25T16:45:00'),
  },
  {
    id: '4',
    username: 'alicebrown',
    firstName: 'Alice',
    lastName: 'Brown',
    email: 'alice.brown@example.com',
    roleId: '3',
    roleName: 'User',
    status: 'suspended',
    lastLogin: null,
  },
];

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [filters, setFilters] = useState<UserFilters>({
    name: '',
    email: '',
    status: '',
  });

  const filteredUsers = users.filter((user) => {
    const nameMatch =
      !filters.name ||
      user.firstName.toLowerCase().includes(filters.name.toLowerCase()) ||
      user.lastName.toLowerCase().includes(filters.name.toLowerCase()) ||
      user.username.toLowerCase().includes(filters.name.toLowerCase());
    
    const emailMatch =
      !filters.email ||
      user.email.toLowerCase().includes(filters.email.toLowerCase());
    
    const statusMatch = !filters.status || user.status === filters.status;

    return nameMatch && emailMatch && statusMatch;
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  const handleSubmitUser = (values: UserFormValues) => {
    if (editingUser) {
      // Update existing user
      const role = mockRoles.find(r => r.id === values.roleId);
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, ...values, roleName: role?.name || '' }
            : u
        )
      );
    } else {
      // Add new user
      const role = mockRoles.find(r => r.id === values.roleId);
      const newUser: User = {
        id: Date.now().toString(),
        ...values,
        roleName: role?.name || '',
        lastLogin: null,
      };
      setUsers([...users, newUser]);
    }
    setIsDialogOpen(false);
    setEditingUser(null);
  };

  const initialFormValues: UserFormValues = editingUser
    ? {
        username: editingUser.username,
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
        email: editingUser.email,
        roleId: editingUser.roleId,
        status: editingUser.status,
      }
    : {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roleId: '',
        status: 'active',
      };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 bg-clip-text text-transparent animate-gradient">
            User Management
          </h1>
          <p className="mt-2 text-lg" style={{ color: '#ff8e47' }}>
            Manage system users and their permissions
          </p>
        </div>
        <button
          onClick={handleAddUser}
          className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 shadow-lg hover:shadow-orange-500/50"
          style={{ backgroundColor: '#ffc39a', color: 'white' }}
        >
          <UserPlus className="w-5 h-5" />
          Add New User
        </button>
      </div>

      {/* Filters */}
      <UserFiltersComponent filters={filters} onFilterChange={setFilters} />

      {/* User Table */}
      <UserTable
        users={filteredUsers}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
      />

      {/* Results Count */}
      <div className="text-sm" style={{ color: '#ff8e47' }}>
        Showing {filteredUsers.length} of {users.length} users
      </div>

      {/* Add/Edit User Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-black border-gray-800 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold" style={{ color: '#ff6200' }}>
              {editingUser ? 'Edit User' : 'Add New User'}
            </DialogTitle>
            <DialogDescription style={{ color: '#ff8e47' }}>
              {editingUser
                ? 'Update user information below'
                : 'Fill in the details to create a new user account'}
            </DialogDescription>
          </DialogHeader>
          <UserForm
            initialValues={initialFormValues}
            onSubmit={handleSubmitUser}
            isEdit={!!editingUser}
            roles={mockRoles}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
