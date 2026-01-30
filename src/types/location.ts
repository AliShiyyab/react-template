export type LocationStatus = 'active' | 'inactive';
export type LocationType = 'office' | 'warehouse' | 'store' | 'remote';

export interface Location {
  id: string;
  name: string;
  type: LocationType;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  manager: string;
  employeeCount: number;
  status: LocationStatus;
  createdAt: string;
}

export interface LocationFormValues {
  name: string;
  type: LocationType;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  manager: string;
  status: LocationStatus;
}

export interface LocationFilters {
  name: string;
  type: LocationType | 'all';
  status: LocationStatus | 'all';
}
