'use client';
export const runtime = "edge";
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';

export default function CategoryPage({ params }) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Redirect to first lesson or lesson selection
  useEffect(() => {
    // Redirect to the first exercise or to the lessons list
    router.push(`${pathname}/home-row`);
  }, [pathname, router]);
  
  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Loading lessons...</p>
      </div>
    </AppLayout>
  );
}
