'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import TargetCursor from '@/components/TargetCursor';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <TargetCursor
        targetSelector="a, button, [role='button'], .cursor-target"
        spinDuration={3}
        hoverDuration={0.15}
        hideDefaultCursor={true}
        parallaxOn={true}
        borderColorClass="border-blue-600"
        dotColorClass="bg-blue-600"
      />
      <Header />
      {children}
      <Footer />
    </>
  );
}
