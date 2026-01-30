import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Phone, MapPin, CheckCircle } from 'lucide-react';


export interface Step3FormValues {
  phone: string;
  address: string;
  city: string;
  country: string;
  agreeToTerms: boolean;
}

const Step3Schema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]+$/, 'Invalid phone number format')
    .min(10, 'Phone number must be at least 10 digits')
    .required('Phone number is required'),
  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),
  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),
  country: Yup.string()
    .min(2, 'Country must be at least 2 characters')
    .required('Country is required'),
  agreeToTerms: Yup.boolean()
    .oneOf([true], 'You must agree to the terms and conditions')
    .required('You must agree to the terms and conditions'),
});

interface Step3Props {
  initialValues: Step3FormValues;
  onSubmit: (values: Step3FormValues) => void;
  onBack: () => void;
}

export default function RegistrationStep3({ initialValues, onSubmit, onBack }: Step3Props) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Step3Schema}
      onSubmit={onSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2" style={{ color: '#ff6200' }}>Contact Information</h2>
            <p style={{ color: '#ff8e47' }}>Final step to complete your registration</p>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2" style={{ color: '#fff5ee' }}>
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-muted-foreground" />
              </div>
              <Field
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                className={`
                  w-full pl-10 pr-4 py-3 
                  bg-background 
                  border rounded-lg 
                  text-foreground 
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                  ${errors.phone && touched.phone ? 'border-red-500' : 'border-border'}
                `}
              />
            </div>
            <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-2" style={{ color: '#fff5ee' }}>
              Street Address
            </label>
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 pointer-events-none">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
              <Field
                id="address"
                name="address"
                as="textarea"
                rows={2}
                placeholder="123 Main Street, Apt 4B"
                className={`
                  w-full pl-10 pr-4 py-3 
                  bg-background 
                  border rounded-lg 
                  text-foreground 
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                  resize-none
                  ${errors.address && touched.address ? 'border-red-500' : 'border-border'}
                `}
              />
            </div>
            <ErrorMessage name="address" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* City & Country */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-2" style={{ color: '#fff5ee' }}>
                City
              </label>
              <Field
                id="city"
                name="city"
                type="text"
                placeholder="New York"
                className={`
                  w-full px-4 py-3 
                  bg-background 
                  border rounded-lg 
                  text-foreground 
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                  ${errors.city && touched.city ? 'border-red-500' : 'border-border'}
                `}
              />
              <ErrorMessage name="city" component="div" className="mt-1 text-sm text-red-500" />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-2" style={{ color: '#fff5ee' }}>
                Country
              </label>
              <Field
                id="country"
                name="country"
                type="text"
                placeholder="United States"
                className={`
                  w-full px-4 py-3 
                  bg-background 
                  border rounded-lg 
                  text-foreground 
                  placeholder:text-muted-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                  ${errors.country && touched.country ? 'border-red-500' : 'border-border'}
                `}
              />
              <ErrorMessage name="country" component="div" className="mt-1 text-sm text-red-500" />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <Field
                type="checkbox"
                name="agreeToTerms"
                className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary focus:ring-offset-0"
              />
              <span className="text-sm" style={{ color: '#fff5ee' }}>
                I agree to the{' '}
                <a href="#" className="hover:underline" style={{ color: '#ff6200' }}>
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="hover:underline" style={{ color: '#ff6200' }}>
                  Privacy Policy
                </a>
              </span>
            </label>
            <ErrorMessage name="agreeToTerms" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              disabled={isSubmitting}
              className="
                flex-1 bg-secondary text-secondary-foreground
                py-3 px-4 rounded-lg
                font-medium
                hover:opacity-90
                focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
              "
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                flex-1 py-3 px-4 rounded-lg
                font-medium
                hover:opacity-90
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200
                flex items-center justify-center gap-2
              "
              style={{ backgroundColor: '#ffc39a', color: 'white' }}
            >
              <CheckCircle className="h-5 w-5" />
              {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
