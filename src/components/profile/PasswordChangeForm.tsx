import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Lock } from 'lucide-react';
import type { PasswordChangeValues } from '@/types/userProfile';

interface PasswordChangeFormProps {
  onSubmit: (values: PasswordChangeValues) => void;
}

const PasswordChangeSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

export function PasswordChangeForm({ onSubmit }: PasswordChangeFormProps) {
  return (
    <Formik
      initialValues={{
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }}
      validationSchema={PasswordChangeSchema}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" style={{ color: '#ff6200' }} />
                Current Password
              </div>
            </label>
            <Field
              type="password"
              id="currentPassword"
              name="currentPassword"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.currentPassword && touched.currentPassword ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="currentPassword" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" style={{ color: '#ff6200' }} />
                New Password
              </div>
            </label>
            <Field
              type="password"
              id="newPassword"
              name="newPassword"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.newPassword && touched.newPassword ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" style={{ color: '#ff6200' }} />
                Confirm New Password
              </div>
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#ffc39a', color: 'black' }}
          >
            {isSubmitting ? 'Changing Password...' : 'Change Password'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
