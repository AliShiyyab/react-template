export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  userCount: number;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface RoleFormValues {
  name: string;
  description: string;
  permissions: string[];
  status: 'active' | 'inactive';
}

export interface RoleFilters {
  name: string;
  status: string;
}
