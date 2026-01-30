import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Construction } from 'lucide-react';

export default function Users() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
        <div className="w-full max-w-2xl space-y-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Construction className="h-10 w-10 text-muted-foreground" />
              </div>
              <CardTitle className="text-3xl">Users</CardTitle>
              <CardDescription className="text-lg">
                User management system
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-2xl font-bold text-primary mb-4">Coming Soon</p>
              <p className="text-sm text-muted-foreground mb-6">
                We're working hard to bring you this feature. Stay tuned!
              </p>
            </CardContent>
          </Card>

          {/* Link to User Documentations */}
          <Link to="/app/users/documentations">
            <Card className="hover:bg-accent transition-colors cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <CardTitle>User Documentations</CardTitle>
                    <CardDescription>
                      View and manage user documentation
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
