import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Settings, Bug, Database, FileText, Clock, HardDrive } from 'lucide-react';
import type { SystemConfig } from '@/types/config';

interface SystemConfigFormProps {
  initialValues: SystemConfig;
  onSubmit: (values: SystemConfig) => void;
}

const SystemConfigSchema = Yup.object().shape({
  maintenanceMode: Yup.boolean(),
  debugMode: Yup.boolean(),
  cacheEnabled: Yup.boolean(),
  loggingLevel: Yup.string()
    .oneOf(['error', 'warning', 'info', 'debug'], 'Invalid logging level')
    .required('Logging level is required'),
  backupFrequency: Yup.string()
    .oneOf(['none', 'daily', 'weekly', 'monthly'], 'Invalid backup frequency')
    .required('Backup frequency is required'),
  maxFileUploadSize: Yup.number()
    .min(1, 'Max file upload size must be at least 1 MB')
    .max(1024, 'Max file upload size must be at most 1024 MB')
    .required('Max file upload size is required'),
});

export function SystemConfigForm({ initialValues, onSubmit }: SystemConfigFormProps) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SystemConfigSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#ff6200' }}>
              System Modes
            </h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5" style={{ color: '#ff6200' }} />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: '#fff5ee' }}>
                        Maintenance Mode
                      </div>
                      <div className="text-xs" style={{ color: '#ff8e47' }}>
                        Prevent non-admin users from accessing the system
                      </div>
                    </div>
                  </div>
                  <Field
                    type="checkbox"
                    name="maintenanceMode"
                    className="w-5 h-5 rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                </label>
              </div>

              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Bug className="w-5 h-5" style={{ color: '#ff6200' }} />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: '#fff5ee' }}>
                        Debug Mode
                      </div>
                      <div className="text-xs" style={{ color: '#ff8e47' }}>
                        Display detailed error messages and logs
                      </div>
                    </div>
                  </div>
                  <Field
                    type="checkbox"
                    name="debugMode"
                    className="w-5 h-5 rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                </label>
              </div>

              <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Database className="w-5 h-5" style={{ color: '#ff6200' }} />
                    <div>
                      <div className="text-sm font-semibold" style={{ color: '#fff5ee' }}>
                        Cache Enabled
                      </div>
                      <div className="text-xs" style={{ color: '#ff8e47' }}>
                        Enable application-level caching for better performance
                      </div>
                    </div>
                  </div>
                  <Field
                    type="checkbox"
                    name="cacheEnabled"
                    className="w-5 h-5 rounded border-gray-600 text-orange-500 focus:ring-orange-500"
                  />
                </label>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#ff6200' }}>
              Logging & Storage
            </h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="loggingLevel" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" style={{ color: '#ff6200' }} />
                    Logging Level
                  </div>
                </label>
                <Field
                  as="select"
                  id="loggingLevel"
                  name="loggingLevel"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                    errors.loggingLevel && touched.loggingLevel ? 'border-red-500' : 'border-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
                >
                  <option value="error">Error Only</option>
                  <option value="warning">Warning & Errors</option>
                  <option value="info">Info, Warnings & Errors</option>
                  <option value="debug">Debug (All Logs)</option>
                </Field>
                <ErrorMessage name="loggingLevel" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="backupFrequency" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" style={{ color: '#ff6200' }} />
                    Backup Frequency
                  </div>
                </label>
                <Field
                  as="select"
                  id="backupFrequency"
                  name="backupFrequency"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                    errors.backupFrequency && touched.backupFrequency ? 'border-red-500' : 'border-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
                >
                  <option value="none">No Automatic Backups</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </Field>
                <ErrorMessage name="backupFrequency" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="maxFileUploadSize" className="block text-sm font-semibold mb-2" style={{ color: '#fff5ee' }}>
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4" style={{ color: '#ff6200' }} />
                    Max File Upload Size (MB)
                  </div>
                </label>
                <Field
                  type="number"
                  id="maxFileUploadSize"
                  name="maxFileUploadSize"
                  className={`w-full px-4 py-3 rounded-lg bg-gray-900 border ${
                    errors.maxFileUploadSize && touched.maxFileUploadSize ? 'border-red-500' : 'border-gray-700'
                  } focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all text-white`}
                />
                <ErrorMessage name="maxFileUploadSize" component="div" className="text-red-500 text-sm mt-1" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#ffc39a', color: 'black' }}
          >
            {isSubmitting ? 'Saving...' : 'Save System Settings'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
