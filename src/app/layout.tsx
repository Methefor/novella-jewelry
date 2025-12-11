import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NOVELLA',
  description: 'Her Parça Bir Hikaye',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
