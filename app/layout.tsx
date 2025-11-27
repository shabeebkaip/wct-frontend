import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Orb } from "@/components/ui/orb";
import LayoutWrapper from "@/components/LayoutWrapper";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "WeCare Technologies",
  description: "Leading provider of comprehensive IT infrastructure solutions including CCTV surveillance, structured cabling, low current systems, and data center solutions",
  icons: {
    icon: [
      { url: '/logo.png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-white ${montserrat.variable} overflow-x-hidden`}
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        <ThemeProvider>
          <Orb 
            size={200} 
            color="rgba(59, 130, 246, 0.3)" 
            blur={100} 
            opacity={0.4}
          />
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
