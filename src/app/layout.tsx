import './globals.css';
import type {Metadata} from 'next';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/providers';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'Bodeguita',
  description: 'Tu bodeguita de confianza, en línea.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn('font-body antialiased', ptSans.variable, playfairDisplay.variable)}
    >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
