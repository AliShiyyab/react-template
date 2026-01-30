import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Lock, UserCircle } from 'lucide-react';
import type { UserFormValues } from '@/types/user';

interface UserFormProps {
  initialValues: UserFormValues;
  onSubmit: (values: UserFormValues) => void;
  isEdit?: boolean;
  roles: Array<{ id: string; name: string; status: string }>;
}

const UserFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be at most 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string().when('$isEdit', {
    is: false,
    then: (schema) => schema
      .min(8, 'Password must be at least 8 characters')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required'),
    otherwise: (schema) => schema.optional(),
  }),
  status: Yup.string()
    .oneOf(['active', 'inactive', 'suspended'], 'Invalid status')
    .required('Status is required'),
  roleId: Yup.string()
    .required('Role is required'),
});

export function UserForm({ initialValues, onSubmit, isEdit = false, roles }: UserFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserFormSchema}
      context={{ isEdit }}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" style={{ color: '#ff6200' }} />
                Username
              </div>
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              disabled={isEdit}
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.username && touched.username ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              placeholder="Enter username"
            />
            <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" style={{ color: '#ff6200' }} />
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
              placeholder="Enter first name"
            />
            <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <UserCircle className="w-4 h-4" style={{ color: '#ff6200' }} />
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
              placeholder="Enter last name"
            />
            <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: '#ff6200' }} />
                Email
              </div>
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.email && touched.email ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              placeholder="Enter email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Password */}
          {!isEdit && (
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" style={{ color: '#ff6200' }} />
                  Password
                </div>
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.password && touched.password ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
                placeholder="Enter password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          )}

          {/* Role */}
          <div>
            <label htmlFor="roleId" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              Role
            </label>
            <Field
              as="select"
              id="roleId"
              name="roleId"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.roleId && touched.roleId ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            >
              <option value="">Select a role</option>
              {roles.filter(r => r.status === 'active').map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="roleId" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Status */}
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
              <option value="suspended">Suspended</option>
            </Field>
            <ErrorMessage name="status" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#ffc39a', color: 'white' }}
          >
            {isSubmitting ? 'Saving...' : isEdit ? 'Update User' : 'Add User'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
