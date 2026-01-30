import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Lock, Clock, ShieldAlert, Shield } from 'lucide-react';
import type { SecurityConfig } from '@/types/config';

interface SecurityConfigFormProps {
  initialValues: SecurityConfig;
  onSubmit: (values: SecurityConfig) => void;
}

const SecurityConfigSchema = Yup.object().shape({
  passwordMinLength: Yup.number()
    .min(6, 'Minimum length must be at least 6')
    .max(32, 'Minimum length must be at most 32')
    .required('Password minimum length is required'),
  passwordRequireUppercase: Yup.boolean(),
  passwordRequireLowercase: Yup.boolean(),
  passwordRequireNumbers: Yup.boolean(),
  passwordRequireSpecialChars: Yup.boolean(),
  sessionTimeout: Yup.number()
    .min(5, 'Session timeout must be at least 5 minutes')
    .max(1440, 'Session timeout must be at most 1440 minutes')
    .required('Session timeout is required'),
  maxLoginAttempts: Yup.number()
    .min(3, 'Max login attempts must be at least 3')
    .max(10, 'Max login attempts must be at most 10')
    .required('Max login attempts is required'),
  twoFactorEnabled: Yup.boolean(),
});

export function SecurityConfigForm({ initialValues, onSubmit }: SecurityConfigFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SecurityConfigSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#ff6200' }}>
              Password Requirements
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="passwordMinLength" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" style={{ color: '#ff6200' }} />
                    Minimum Password Length
                  </div>
                </label>
                <Field
                  type="number"
                  id="passwordMinLength"
                  name="passwordMinLength"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                    errors.passwordMinLength && touched.passwordMinLength ? 'border-red-500' : 'border-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
                />
                <ErrorMessage name="passwordMinLength" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="space-y-3 p-4 bg-gray-900 rounded-lg border border-gray-700">
                <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors">
                  <Field
                    type="checkbox"
                    name="passwordRequireUppercase"
                    className="w-4 h-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm" style={{ color: '#fff5ee' }}>Require uppercase letters</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors">
                  <Field
                    type="checkbox"
                    name="passwordRequireLowercase"
                    className="w-4 h-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm" style={{ color: '#fff5ee' }}>Require lowercase letters</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors">
                  <Field
                    type="checkbox"
                    name="passwordRequireNumbers"
                    className="w-4 h-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm" style={{ color: '#fff5ee' }}>Require numbers</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-800 p-2 rounded transition-colors">
                  <Field
                    type="checkbox"
                    name="passwordRequireSpecialChars"
                    className="w-4 h-4 rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-sm" style={{ color: '#fff5ee' }}>Require special characters</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#ff6200' }}>
              Session & Access Control
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="sessionTimeout" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: '#ff6200' }} />
                    Session Timeout (minutes)
                  </div>
                </label>
                <Field
                  type="number"
                  id="sessionTimeout"
                  name="sessionTimeout"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                    errors.sessionTimeout && touched.sessionTimeout ? 'border-red-500' : 'border-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
                />
                <ErrorMessage name="sessionTimeout" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="maxLoginAttempts" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4" style={{ color: '#ff6200' }} />
                    Max Login Attempts
                  </div>
                </label>
                <Field
                  type="number"
                  id="maxLoginAttempts"
                  name="maxLoginAttempts"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                    errors.maxLoginAttempts && touched.maxLoginAttempts ? 'border-red-500' : 'border-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
                />
                <ErrorMessage name="maxLoginAttempts" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5" style={{ color: '#ff6200' }} />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: '#fff5ee' }}>
                        Two-Factor Authentication
                      </div>
                      <div className="text-xs" style={{ color: '#ff8e47' }}>
                        Require 2FA for all users
                      </div>
                    </div>
                  </div>
                  <Field
                    type="checkbox"
                    name="twoFactorEnabled"
                    className="w-5 h-5 rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#ffc39a', color: 'black' }}
          >
            {isSubmitting ? 'Saving...' : 'Save Security Settings'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
