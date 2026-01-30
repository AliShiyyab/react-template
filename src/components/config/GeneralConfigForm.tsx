import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Globe, Mail, Link as LinkIcon, Clock, Languages } from 'lucide-react';
import type { GeneralConfig } from '@/types/config';

interface GeneralConfigFormProps {
  initialValues: GeneralConfig;
  onSubmit: (values: GeneralConfig) => void;
}

const GeneralConfigSchema = Yup.object().shape({
  siteName: Yup.string()
    .min(3, 'Site name must be at least 3 characters')
    .max(100, 'Site name must be at most 100 characters')
    .required('Site name is required'),
  siteUrl: Yup.string()
    .url('Must be a valid URL')
    .required('Site URL is required'),
  adminEmail: Yup.string()
    .email('Invalid email address')
    .required('Admin email is required'),
  timezone: Yup.string()
    .required('Timezone is required'),
  language: Yup.string()
    .required('Language is required'),
});

const timezones = [
  'UTC',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Asia/Dubai',
  'Australia/Sydney',
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ar', name: 'Arabic' },
];

export function GeneralConfigForm({ initialValues, onSubmit }: GeneralConfigFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={GeneralConfigSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-4">
          <div>
            <label htmlFor="siteName" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" style={{ color: '#ff6200' }} />
                Site Name
              </div>
            </label>
            <Field
              type="text"
              id="siteName"
              name="siteName"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.siteName && touched.siteName ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="siteName" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="siteUrl" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" style={{ color: '#ff6200' }} />
                Site URL
              </div>
            </label>
            <Field
              type="text"
              id="siteUrl"
              name="siteUrl"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.siteUrl && touched.siteUrl ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="siteUrl" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="adminEmail" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: '#ff6200' }} />
                Admin Email
              </div>
            </label>
            <Field
              type="email"
              id="adminEmail"
              name="adminEmail"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.adminEmail && touched.adminEmail ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            />
            <ErrorMessage name="adminEmail" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="timezone" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: '#ff6200' }} />
                Timezone
              </div>
            </label>
            <Field
              as="select"
              id="timezone"
              name="timezone"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.timezone && touched.timezone ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>{tz}</option>
              ))}
            </Field>
            <ErrorMessage name="timezone" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label htmlFor="language" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4" style={{ color: '#ff6200' }} />
                Language
              </div>
            </label>
            <Field
              as="select"
              id="language"
              name="language"
              className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                errors.language && touched.language ? 'border-red-500' : 'border-gray-700'
              } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </Field>
            <ErrorMessage name="language" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#ffc39a', color: 'black' }}
          >
            {isSubmitting ? 'Saving...' : 'Save General Settings'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
