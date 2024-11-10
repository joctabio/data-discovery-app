import Card from '@/app/components/Card/Card';
import Navigation from '@/app/components/Navigation/Navigation';
import { Suspense } from 'react';
import 'react-loading-skeleton/dist/skeleton.css';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-gray-100'>
      <header className='bg-white shadow-sm'>
        <Navigation />
      </header>
      <div className='mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 sm:py-6 lg:py-8'>
        <Suspense>
          <Card>{children}</Card>
        </Suspense>
      </div>
    </div>
  );
}
