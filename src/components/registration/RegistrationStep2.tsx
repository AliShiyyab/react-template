import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Lock, Building } from 'lucide-react';

export interface Step2FormValues {
  username: string;
  password: string;
  confirmPassword: string;
  company: string;
}

const Step2Schema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  company: Yup.string()
    .min(2, 'Company name must be at least 2 characters')
    .required('Company name is required'),
});

interface Step2Props {
  initialValues: Step2FormValues;
  onNext: (values: Step2FormValues) => void;
  onBack: () => void;
}

export default function RegistrationStep2({ initialValues, onNext, onBack }: Step2Props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Step2Schema}
      onSubmit={onNext}
    >
      {({ errors, touched }) => (
        <Form className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#ff6200' }}>Account Details</h2>
            <p style={{ color: '#ff8e47' }}>Create your account credentials</p>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2" style={{ color: '#fff5ee' }}>
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <Field
                id="username"
                name="username"
                type="text"
                placeholder="johndoe"
                className={`
                  w-full pl-10 pr-4 py-3 
                  bg-background 
                  border rounded-lg 
                  text-foreground 
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                  ${errors.username && touched.username ? 'border-red-500' : 'border-border'}
                `}
              />
            </div>
            <ErrorMessage name="username" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2" style={{ color: '#fff5ee' }}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className={`
                  w-full pl-10 pr-4 py-3 
                  bg-background 
                  border rounded-lg 
                  text-foreground 
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                  ${errors.password && touched.password ? 'border-red-500' : 'border-border'}
                `}
              />
            </div>
            <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2" style={{ color: '#fff5ee' }}>
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`
                  w-full pl-10 pr-4 py-3 
                  bg-background 
                  border rounded-lg 
                  text-foreground 
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                  ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-border'}
                `}
              />
            </div>
            <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2" style={{ color: '#fff5ee' }}>
              Company Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-muted-foreground" />
              </div>
              <Field
                id="company"
                name="company"
                type="text"
                placeholder="Acme Inc."
                className={`
                  w-full pl-10 pr-4 py-3 
                  bg-background 
                  border rounded-lg 
                  text-foreground 
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                  ${errors.company && touched.company ? 'border-red-500' : 'border-border'}
                `}
              />
            </div>
            <ErrorMessage name="company" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              className="
                flex-1 bg-secondary text-secondary-foreground
                py-3 px-4 rounded-lg
                font-medium
                hover:opacity-90
                focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
                transition-all duration-200
              "
            >
              Back
            </button>
            <button
              type="submit"
              className="
                flex-1 py-3 px-4 rounded-lg
                font-medium
                hover:opacity-90
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                transition-all duration-200
              "
              style={{ backgroundColor: '#ffc39a', color: 'white' }}
            >
              Continue
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
