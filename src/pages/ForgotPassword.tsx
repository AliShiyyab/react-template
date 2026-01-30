import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

interface ForgotPasswordFormValues {
  email: string;
}

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [emailSent, setEmailSent] = useState(false);

  const initialValues: ForgotPasswordFormValues = {
    email: '',
  };

  const handleSubmit = (values: ForgotPasswordFormValues) => {
    console.log('Reset password for:', values.email);
    setEmailSent(true);
    // Navigate back to login after 3 seconds
    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  if (emailSent) {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Send className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-3xl font-bold" style={{ color: '#ff6200' }}>Check Your Email</CardTitle>
              <CardDescription className="text-base font-medium" style={{ color: '#ff8e47' }}>
                We've sent a password reset link to your email address.
                Please check your inbox and follow the instructions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <button
                onClick={() => navigate('/login')}
                className="
                  w-full py-3 px-4 rounded-lg
                  font-semibold
                  hover:opacity-90
                  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                  transition-all duration-200
                "
                style={{ backgroundColor: '#ffc39a', color: 'white' }}
              >
                Back to Login
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-4">
            <div className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold" style={{ color: '#ff6200' }}>
                Forgot Password?
              </CardTitle>
              <CardDescription className="text-base font-medium" style={{ color: '#ff8e47' }}>
                No worries! Enter your email and we'll send you reset instructions.
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <Formik
              initialValues={initialValues}
              validationSchema={ForgotPasswordSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-base font-semibold mb-2"
                      style={{ color: '#fff5ee' }}
                    >
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
                        placeholder="you@example.com"
                        className={`
                          w-full pl-10 pr-4 py-3 
                          bg-background 
                          border rounded-lg 
                          text-foreground font-medium
                          placeholder:text-muted-foreground placeholder:font-normal
                          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                          transition-all duration-200
                          ${errors.email && touched.email ? 'border-red-500' : 'border-border'}
                        `}
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="mt-2 text-sm font-medium text-red-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                      w-full flex items-center justify-center gap-2
                      py-3 px-4 rounded-lg
                      font-semibold text-base
                      hover:opacity-90
                      focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transition-all duration-200
                    "
                    style={{ backgroundColor: '#ffc39a', color: 'white' }}
                  >
                    <Send className="h-5 w-5" />
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  </button>

                  {/* Back to Login */}
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="
                      w-full flex items-center justify-center gap-2
                      font-medium
                      py-2 px-4
                      transition-colors duration-200
                    "
                    style={{ color: '#ff6200' }}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Login
                  </button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
