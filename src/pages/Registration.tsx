import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RegistrationStep1, { type Step1FormValues } from '@/components/registration/RegistrationStep1';
import RegistrationStep2, { type Step2FormValues } from '@/components/registration/RegistrationStep2';
import RegistrationStep3, { type Step3FormValues } from '@/components/registration/RegistrationStep3';
import { Check } from 'lucide-react';

type RegistrationData = Step1FormValues & Step2FormValues & Step3FormValues;

export default function Registration() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<RegistrationData>>({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    company: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    agreeToTerms: false,
  });

  const handleStep1Next = (values: Step1FormValues) => {
    setFormData({ ...formData, ...values });
    setCurrentStep(2);
  };

  const handleStep2Next = (values: Step2FormValues) => {
    setFormData({ ...formData, ...values });
    setCurrentStep(3);
  };

  const handleStep2Back = () => {
    setCurrentStep(1);
  };

  const handleStep3Back = () => {
    setCurrentStep(2);
  };

  const handleFinalSubmit = (values: Step3FormValues) => {
    const finalData = { ...formData, ...values };
    console.log('Registration Complete:', finalData);
    // Navigate to login or dashboard
    navigate('/app');
  };

  const steps = [
    { number: 1, title: 'Personal Info' },
    { number: 2, title: 'Account Details' },
    { number: 3, title: 'Contact Info' },
  ];

  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card>
          <CardHeader className="space-y-6">
            <div className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold" style={{ color: '#ff6200' }}>Create Account</CardTitle>
              <CardDescription className="text-base" style={{ color: '#ff8e47' }}>
                Join us today and start your journey
              </CardDescription>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                        transition-all duration-300
                        ${
                          currentStep > step.number
                            ? 'bg-primary text-primary-foreground'
                            : currentStep === step.number
                            ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                            : 'bg-muted text-muted-foreground'
                        }
                      `}
                    >
                      {currentStep > step.number ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <span
                      className={`
                        mt-2 text-xs font-medium
                        ${
                          currentStep >= step.number
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }
                      `}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`
                        flex-1 h-1 mx-2 rounded-full transition-all duration-300
                        ${
                          currentStep > step.number
                            ? 'bg-primary'
                            : 'bg-muted'
                        }
                      `}
                    />
                  )}
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent>
            {/* Step Content */}
            {currentStep === 1 && (
              <RegistrationStep1
                initialValues={{
                  firstName: formData.firstName || '',
                  lastName: formData.lastName || '',
                  email: formData.email || '',
                }}
                onNext={handleStep1Next}
              />
            )}

            {currentStep === 2 && (
              <RegistrationStep2
                initialValues={{
                  username: formData.username || '',
                  password: formData.password || '',
                  confirmPassword: formData.confirmPassword || '',
                  company: formData.company || '',
                }}
                onNext={handleStep2Next}
                onBack={handleStep2Back}
              />
            )}

            {currentStep === 3 && (
              <RegistrationStep3
                initialValues={{
                  phone: formData.phone || '',
                  address: formData.address || '',
                  city: formData.city || '',
                  country: formData.country || '',
                  agreeToTerms: formData.agreeToTerms || false,
                }}
                onSubmit={handleFinalSubmit}
                onBack={handleStep3Back}
              />
            )}

            {/* Sign In Link */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <a href="/login" className="text-primary hover:underline font-medium">
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
