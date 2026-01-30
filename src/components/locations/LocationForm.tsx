import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { MapPin, Building, Mail, Phone, User } from 'lucide-react';
import type { LocationFormValues } from '@/types/location';

interface LocationFormProps {
  initialValues: LocationFormValues;
  onSubmit: (values: LocationFormValues) => void;
  onCancel: () => void;
}

const LocationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Location name must be at least 3 characters')
    .max(100, 'Location name must be at most 100 characters')
    .required('Location name is required'),
  type: Yup.string()
    .oneOf(['office', 'warehouse', 'store', 'remote'], 'Invalid location type')
    .required('Location type is required'),
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be at most 200 characters')
    .required('Address is required'),
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be at most 50 characters')
    .required('City is required'),
  state: Yup.string()
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must be at most 50 characters')
    .required('State is required'),
  zipCode: Yup.string()
    .matches(/^[0-9-]+$/, 'Zip code must contain only numbers and hyphens')
    .required('Zip code is required'),
  country: Yup.string()
    .min(2, 'Country must be at least 2 characters')
    .max(50, 'Country must be at most 50 characters')
    .required('Country is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
    .required('Phone number is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  manager: Yup.string()
    .min(2, 'Manager name must be at least 2 characters')
    .max(100, 'Manager name must be at most 100 characters')
    .required('Manager name is required'),
  status: Yup.string()
    .oneOf(['active', 'inactive'], 'Invalid status')
    .required('Status is required'),
});

export function LocationForm({ initialValues, onSubmit, onCancel }: LocationFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LocationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" style={{ color: '#ff6200' }} />
                  Location Name
                </div>
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Headquarters"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.name && touched.name ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: '#ff6200' }} />
                  Location Type
                </div>
              </label>
              <Field
                as="select"
                id="type"
                name="type"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.type && touched.type ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              >
                <option value="office">Office</option>
                <option value="warehouse">Warehouse</option>
                <option value="store">Store</option>
                <option value="remote">Remote</option>
              </Field>
              <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: '#ff6200' }} />
                Address
              </div>
            </label>
            <Field
              type="text"
              id="address"
              name="address"
              placeholder="123 Main Street"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.address && touched.address ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                City
              </label>
              <Field
                type="text"
                id="city"
                name="city"
                placeholder="New York"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.city && touched.city ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              />
              <ErrorMessage name="city" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                State
              </label>
              <Field
                type="text"
                id="state"
                name="state"
                placeholder="NY"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.state && touched.state ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              />
              <ErrorMessage name="state" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="zipCode" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                Zip Code
              </label>
              <Field
                type="text"
                id="zipCode"
                name="zipCode"
                placeholder="10001"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.zipCode && touched.zipCode ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              />
              <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          <div>
            <label htmlFor="country" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              Country
            </label>
            <Field
              type="text"
              id="country"
              name="country"
              placeholder="United States"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.country && touched.country ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="country" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" style={{ color: '#ff6200' }} />
                  Phone Number
                </div>
              </label>
              <Field
                type="tel"
                id="phone"
                name="phone"
                placeholder="+1 (555) 123-4567"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.phone && touched.phone ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" style={{ color: '#ff6200' }} />
                  Email Address
                </div>
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="office@company.com"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.email && touched.email ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="manager" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: '#ff6200' }} />
                  Location Manager
                </div>
              </label>
              <Field
                type="text"
                id="manager"
                name="manager"
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.manager && touched.manager ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              />
              <ErrorMessage name="manager" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                Status
              </label>
              <Field
                as="select"
                id="status"
                name="status"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.status && touched.status ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Field>
              <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#ffc39a', color: 'black' }}
            >
              {isSubmitting ? 'Saving...' : 'Save Location'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 rounded-lg font-semibold bg-gray-800 hover:bg-gray-700 transition-all duration-200"
              style={{ color: '#fff5ee' }}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
