import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Mail } from 'lucide-react';

export interface Step1FormValues {
  firstName: string;
  lastName: string;
  email: string;
}

const Step1Schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

interface Step1Props {
  initialValues: Step1FormValues;
  onNext: (values: Step1FormValues) => void;
}

export default function RegistrationStep1({ initialValues, onNext }: Step1Props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Step1Schema}
      onSubmit={onNext}
    >
      {({ errors, touched }) => (
        <Form className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#ff6200' }}>Personal Information</h2>
            <p style={{ color: '#ff8e47' }}>Let's start with your basic details</p>
          </div>

          {/* First Name */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-2" style={{ color: '#fff5ee' }}>
              First Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <Field
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                className={`
                  w-full pl-10 pr-4 py-3 
                  bg-background 
                  border rounded-lg 
                  text-foreground 
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                  ${errors.firstName && touched.firstName ? 'border-red-500' : 'border-border'}
                `}
              />
            </div>
            <ErrorMessage name="firstName" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-2" style={{ color: '#fff5ee' }}>
              Last Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <Field
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                className={`
                  w-full pl-10 pr-4 py-3 
                  bg-background 
                  border rounded-lg 
                  text-foreground 
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                  ${errors.lastName && touched.lastName ? 'border-red-500' : 'border-border'}
                `}
              />
            </div>
            <ErrorMessage name="lastName" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2" style={{ color: '#fff5ee' }}>
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                className={`
                  w-full pl-10 pr-4 py-3 
                  bg-background 
                  border rounded-lg 
                  text-foreground 
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                  ${errors.email && touched.email ? 'border-red-500' : 'border-border'}
                `}
              />
            </div>
            <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* Next Button */}
          <button
            type="submit"
            className="
              w-full py-3 px-4 rounded-lg
              font-medium
              hover:opacity-90
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              transition-all duration-200
            "
            style={{ backgroundColor: '#ffc39a', color: 'white' }}
          >
            Continue
          </button>
        </Form>
      )}
    </Formik>
  );
}
