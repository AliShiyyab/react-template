import { Construction } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ComingSoonPageProps {
  title: string;
  description?: string;
}

export default function ComingSoonPage({ title, description }: ComingSoonPageProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <Construction className="h-10 w-10" style={{ color: '#FF6200' }} />
          </div>
          <CardTitle className="text-3xl font-bold" style={{ color: '#FF6200' }}>{title}</CardTitle>
          <CardDescription className="text-lg" style={{ color: '#ff8e47' }}>
            {description || 'This feature is under development'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-2xl font-bold mb-2" style={{ color: '#FC6202' }}>Coming Soon</p>
          <p className="text-sm" style={{ color: '#ff8e47' }}>
            We're working hard to bring you this feature. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
