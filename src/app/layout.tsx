import './globals.css';
import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Bodega Express',
  description: 'Your one-stop online shop.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
