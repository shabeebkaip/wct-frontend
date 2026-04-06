import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Orb } from "@/components/ui/orb";
import LayoutWrapper from "@/components/LayoutWrapper";
import AnalyticsProvider from "@/components/AnalyticsProvider";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: {
    default: "WeCare Technology | IT Infrastructure Solutions in Saudi Arabia",
    template: "%s | WeCare Technology",
  },
  description: "WeCare Technology (WCT) is a leading IT infrastructure provider in Saudi Arabia, specializing in Data Centers, Structured Cabling, CCTV, Low Current Systems, and ICT solutions with 18+ years of expertise.",
  metadataBase: new URL("https://wecaretech.com"),
  icons: {
    icon: [
      { url: '/logo.png' },
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/logo.png',
  },
  openGraph: {
    siteName: "WeCare Technology",
    type: "website",
    locale: "en_US",
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
        className={`antialiased bg-white ${montserrat.variable} overflow-x-hidden overflow-y-auto`}
        style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
      >
        <ThemeProvider>
          <AnalyticsProvider>
            <Orb
              size={200}
              color="rgba(59, 130, 246, 0.3)"
              blur={100}
              opacity={0.4}
            />
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AnalyticsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
