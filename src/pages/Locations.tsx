import { useState } from 'react';
import { MapPin, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { LocationForm } from '@/components/locations/LocationForm';
import { LocationTable } from '@/components/locations/LocationTable';
import { LocationFiltersComponent } from '@/components/locations/LocationFilters';
import type { Location, LocationFormValues, LocationFilters } from '@/types/location';

export default function Locations() {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Headquarters',
      type: 'office',
      address: '123 Business Plaza',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States',
      phone: '+1 (555) 100-1000',
      email: 'hq@company.com',
      manager: 'Sarah Johnson',
      employeeCount: 45,
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'West Coast Office',
      type: 'office',
      address: '456 Tech Avenue',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      country: 'United States',
      phone: '+1 (555) 200-2000',
      email: 'sf@company.com',
      manager: 'Michael Chen',
      employeeCount: 32,
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Distribution Center',
      type: 'warehouse',
      address: '789 Industrial Park',
      city: 'Dallas',
      state: 'TX',
      zipCode: '75201',
      country: 'United States',
      phone: '+1 (555) 300-3000',
      email: 'warehouse@company.com',
      manager: 'David Martinez',
      employeeCount: 28,
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Flagship Store',
      type: 'store',
      address: '321 Retail Street',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'United States',
      phone: '+1 (555) 400-4000',
      email: 'store@company.com',
      manager: 'Emily Brown',
      employeeCount: 15,
      status: 'active',
      createdAt: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Remote Hub',
      type: 'remote',
      address: 'Virtual Office',
      city: 'Various',
      state: 'Remote',
      zipCode: '00000',
      country: 'Global',
      phone: '+1 (555) 500-5000',
      email: 'remote@company.com',
      manager: 'James Wilson',
      employeeCount: 12,
      status: 'active',
      createdAt: new Date().toISOString(),
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [filters, setFilters] = useState<LocationFilters>({
    name: '',
    type: 'all',
    status: 'all',
  });

  const handleAdd = () => {
    setEditingLocation(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this location?')) {
      setLocations((prev) => prev.filter((loc) => loc.id !== id));
    }
  };

  const handleSubmit = (values: LocationFormValues) => {
    if (editingLocation) {
      setLocations((prev) =>
        prev.map((loc) =>
          loc.id === editingLocation.id
            ? { ...loc, ...values }
            : loc
        )
      );
    } else {
      const newLocation: Location = {
        ...values,
        id: Date.now().toString(),
        employeeCount: 0,
        createdAt: new Date().toISOString(),
      };
      setLocations((prev) => [...prev, newLocation]);
    }
    setIsDialogOpen(false);
  };

  const filteredLocations = locations.filter((location) => {
    if (filters.name && !location.name.toLowerCase().includes(filters.name.toLowerCase())) {
      return false;
    }
    if (filters.type !== 'all' && location.type !== filters.type) {
      return false;
    }
    if (filters.status !== 'all' && location.status !== filters.status) {
      return false;
    }
    return true;
  });

  const initialFormValues: LocationFormValues = editingLocation
    ? {
        name: editingLocation.name,
        type: editingLocation.type,
        address: editingLocation.address,
        city: editingLocation.city,
        state: editingLocation.state,
        zipCode: editingLocation.zipCode,
        country: editingLocation.country,
        phone: editingLocation.phone,
        email: editingLocation.email,
        manager: editingLocation.manager,
        status: editingLocation.status,
      }
    : {
        name: '',
        type: 'office',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        phone: '',
        email: '',
        manager: '',
        status: 'active',
      };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <MapPin className="w-8 h-8" style={{ color: '#ff6200' }} />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-orange-100 to-white animate-gradient bg-clip-text text-transparent">
                Locations
              </h1>
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:opacity-90"
              style={{ backgroundColor: '#ffc39a', color: 'black' }}
            >
              <Plus className="w-5 h-5" />
              Add Location
            </button>
          </div>
          <p style={{ color: '#ff8e47' }}>Manage office locations, warehouses, stores, and remote hubs</p>
        </div>

        <LocationFiltersComponent filters={filters} onChange={setFilters} />

        <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
          {filteredLocations.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: '#ff6200' }} />
              <h3 className="text-xl font-semibold mb-2 text-white">No Locations Found</h3>
              <p style={{ color: '#ff8e47' }}>Add your first location to get started</p>
            </div>
          ) : (
            <LocationTable
              locations={filteredLocations}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800">
            <DialogHeader>
              <DialogTitle style={{ color: '#ff6200' }}>
                {editingLocation ? 'Edit Location' : 'Add New Location'}
              </DialogTitle>
            </DialogHeader>
            <LocationForm
              initialValues={initialFormValues}
              onSubmit={handleSubmit}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
