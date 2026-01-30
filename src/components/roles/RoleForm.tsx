import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Shield, FileText, CheckSquare } from 'lucide-react';
import type { RoleFormValues } from '@/types/role';

interface RoleFormProps {
  initialValues: RoleFormValues;
  onSubmit: (values: RoleFormValues) => void;
}

const availablePermissions = [
  { id: 'users.view', label: 'View Users' },
  { id: 'users.create', label: 'Create Users' },
  { id: 'users.edit', label: 'Edit Users' },
  { id: 'users.delete', label: 'Delete Users' },
  { id: 'roles.view', label: 'View Roles' },
  { id: 'roles.create', label: 'Create Roles' },
  { id: 'roles.edit', label: 'Edit Roles' },
  { id: 'roles.delete', label: 'Delete Roles' },
  { id: 'settings.view', label: 'View Settings' },
  { id: 'settings.edit', label: 'Edit Settings' },
];

const RoleFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Role name must be at least 3 characters')
    .max(50, 'Role name must be at most 50 characters')
    .required('Role name is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(200, 'Description must be at most 200 characters')
    .required('Description is required'),
  permissions: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one permission is required')
    .required('Permissions are required'),
  status: Yup.string()
    .oneOf(['active', 'inactive'], 'Invalid status')
    .required('Status is required'),
});

export function RoleForm({ initialValues, onSubmit }: RoleFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RoleFormSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting, values, setFieldValue }) => (
        <Form className="space-y-4">
          {/* Role Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: '#ff6200' }} />
                Role Name
              </div>
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.name && touched.name ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              placeholder="e.g., Administrator, Manager, User"
            />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" style={{ color: '#ff6200' }} />
                Description
              </div>
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              rows={3}
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.description && touched.description ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white resize-none`}
              placeholder="Describe the role and its responsibilities..."
            />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-sm font-semibold mb-3" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4 h-4" style={{ color: '#ff6200' }} />
                Permissions
              </div>
            </label>
            <div className="grid grid-cols-2 gap-3 p-4 bg-gray-900 rounded-lg border border-gray-700 max-h-60 overflow-y-auto">
              {availablePermissions.map((permission) => (
                <label
                  key={permission.id}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={values.permissions.includes(permission.id)}
                    onChange={(e) => {
                      const newPermissions = e.target.checked
                        ? [...values.permissions, permission.id]
                        : values.permissions.filter((p) => p !== permission.id);
                      setFieldValue('permissions', newPermissions);
                    }}
                    className="w-4 h-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500 focus:ring-offset-gray-900"
                  />
                  <span className="text-sm" style={{ color: '#fff5ee' }}>
                    {permission.label}
                  </span>
                </label>
              ))}
            </div>
            <ErrorMessage name="permissions" component="div" className="text-red-500 text-sm mt-1" />
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
            {isSubmitting ? 'Saving...' : 'Save Role'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
