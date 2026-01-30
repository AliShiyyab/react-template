import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Phone, FileText } from 'lucide-react';
import type { ProfileFormValues } from '@/types/userProfile';

interface ProfileFormProps {
  initialValues: ProfileFormValues;
  onSubmit: (values: ProfileFormValues) => void;
}

const ProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 characters')
    .required('Phone number is required'),
  bio: Yup.string()
    .max(500, 'Bio must be at most 500 characters'),
});

export function ProfileForm({ initialValues, onSubmit }: ProfileFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProfileSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: '#ff6200' }} />
                  First Name
                </div>
              </label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              />
              <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" style={{ color: '#ff6200' }} />
                  Last Name
                </div>
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              />
              <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
            </div>
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
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.email && touched.email ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

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
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.phone && touched.phone ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" style={{ color: '#ff6200' }} />
                Bio
              </div>
            </label>
            <Field
              as="textarea"
              id="bio"
              name="bio"
              rows={4}
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.bio && touched.bio ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white resize-none`}
            />
            <ErrorMessage name="bio" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#ffc39a', color: 'black' }}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
