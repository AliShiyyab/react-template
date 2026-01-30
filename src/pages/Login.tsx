import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EmailLoginForm from '@/components/auth/EmailLoginForm';
import UsernameLoginForm from '@/components/auth/UsernameLoginForm';

type LoginMethod = 'email' | 'username';

export default function Login() {
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('email');

  return (
    <div className="dark min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="space-y-4">
            <div className="text-center space-y-2">
              <CardTitle className="text-3xl font-bold" style={{ color: '#ff6200' }}>Welcome Back</CardTitle>
              <CardDescription className="text-base" style={{ color: '#ff8e47' }}>
                Sign in to your account to continue
              </CardDescription>
            </div>

            {/* Login Method Switch */}
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`
                  flex-1 py-2 px-4 rounded-md text-sm font-medium
                  transition-all duration-200
                  ${
                    loginMethod === 'email'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('username')}
                className={`
                  flex-1 py-2 px-4 rounded-md text-sm font-medium
                  transition-all duration-200
                  ${
                    loginMethod === 'username'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }
                `}
              >
                Username
              </button>
            </div>
          </CardHeader>

          <CardContent>
            {/* Render the appropriate form based on selected method */}
            {loginMethod === 'email' ? <EmailLoginForm /> : <UsernameLoginForm />}

            {/* Sign Up Link */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
