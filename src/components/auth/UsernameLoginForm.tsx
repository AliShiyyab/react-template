import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, LogIn } from 'lucide-react';

interface UsernameLoginFormValues {
  username: string;
  password: string;
}

// Validation Schema
const UsernameLoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must not exceed 20 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function UsernameLoginForm() {
  const navigate = useNavigate();
  
  const initialValues: UsernameLoginFormValues = {
    username: '',
    password: '',
  };

  const handleSubmit = (_values: UsernameLoginFormValues) => {
    // Navigate to admin panel after login
    navigate('/app');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UsernameLoginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2"
              style={{ color: '#fff5ee' }}
            >
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
            <ErrorMessage
              name="username"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: '#fff5ee' }}
            >
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
            <ErrorMessage
              name="password"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full flex items-center justify-center gap-2
              py-3 px-4 rounded-lg
              font-medium
              hover:opacity-90
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
            style={{ backgroundColor: '#ffc39a', color: 'white' }}
          >
            <LogIn className="h-5 w-5" />
            {isSubmitting ? 'Signing in...' : 'Sign in with Username'}
          </button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}
