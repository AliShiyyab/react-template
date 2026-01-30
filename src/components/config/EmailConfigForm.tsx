import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Server, Hash, Mail, User, Shield } from 'lucide-react';
import type { EmailConfig } from '@/types/config';

interface EmailConfigFormProps {
  initialValues: EmailConfig;
  onSubmit: (values: EmailConfig) => void;
}

const EmailConfigSchema = Yup.object().shape({
  smtpHost: Yup.string()
    .required('SMTP host is required'),
  smtpPort: Yup.number()
    .min(1, 'Port must be at least 1')
    .max(65535, 'Port must be at most 65535')
    .required('SMTP port is required'),
  smtpUsername: Yup.string()
    .required('SMTP username is required'),
  smtpPassword: Yup.string()
    .required('SMTP password is required'),
  smtpEncryption: Yup.string()
    .oneOf(['none', 'ssl', 'tls'], 'Invalid encryption type')
    .required('Encryption type is required'),
  fromEmail: Yup.string()
    .email('Invalid email address')
    .required('From email is required'),
  fromName: Yup.string()
    .required('From name is required'),
});

export function EmailConfigForm({ initialValues, onSubmit }: EmailConfigFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EmailConfigSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="smtpHost" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4" style={{ color: '#ff6200' }} />
                  SMTP Host
                </div>
              </label>
              <Field
                type="text"
                id="smtpHost"
                name="smtpHost"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.smtpHost && touched.smtpHost ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
                placeholder="smtp.example.com"
              />
              <ErrorMessage name="smtpHost" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label htmlFor="smtpPort" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4" style={{ color: '#ff6200' }} />
                  SMTP Port
                </div>
              </label>
              <Field
                type="number"
                id="smtpPort"
                name="smtpPort"
                className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                  errors.smtpPort && touched.smtpPort ? 'border-red-500' : 'border-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
                placeholder="587"
              />
              <ErrorMessage name="smtpPort" component="div" className="text-red-500 text-sm mt-1" />
            </div>
          </div>

          <div>
            <label htmlFor="smtpUsername" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" style={{ color: '#ff6200' }} />
                SMTP Username
              </div>
            </label>
            <Field
              type="text"
              id="smtpUsername"
              name="smtpUsername"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.smtpUsername && touched.smtpUsername ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="smtpUsername" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="smtpPassword" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" style={{ color: '#ff6200' }} />
                SMTP Password
              </div>
            </label>
            <Field
              type="password"
              id="smtpPassword"
              name="smtpPassword"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.smtpPassword && touched.smtpPassword ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="smtpPassword" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="smtpEncryption" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              Encryption
            </label>
            <Field
              as="select"
              id="smtpEncryption"
              name="smtpEncryption"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.smtpEncryption && touched.smtpEncryption ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            >
              <option value="none">None</option>
              <option value="ssl">SSL</option>
              <option value="tls">TLS</option>
            </Field>
            <ErrorMessage name="smtpEncryption" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="fromEmail" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: '#ff6200' }} />
                From Email
              </div>
            </label>
            <Field
              type="email"
              id="fromEmail"
              name="fromEmail"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.fromEmail && touched.fromEmail ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              placeholder="noreply@example.com"
            />
            <ErrorMessage name="fromEmail" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="fromName" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              From Name
            </label>
            <Field
              type="text"
              id="fromName"
              name="fromName"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.fromName && touched.fromName ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
              placeholder="System Admin"
            />
            <ErrorMessage name="fromName" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#ffc39a', color: 'black' }}
          >
            {isSubmitting ? 'Saving...' : 'Save Email Settings'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
