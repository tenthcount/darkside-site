import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'DARKSIDE PROMOTIONS — Detroit Boxing',
  description: "Detroit's premier boxing promotion. Fight nights, big lights, real boxing. Professional and amateur boxing events across Metro Detroit.",
  openGraph: {
    title: 'DARKSIDE PROMOTIONS',
    description: "Detroit's premier boxing promotion.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
