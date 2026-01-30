export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  roleName: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: Date | null;
}

export interface UserFormValues {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  roleId: string;
  status: 'active' | 'inactive' | 'suspended';
}

export interface UserFilters {
  name: string;
  email: string;
  status: string;
}
