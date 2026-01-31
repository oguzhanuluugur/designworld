import type { Metadata } from 'next';

/**
 * Root layout (required by Next.js App Router).
 * Must include <html> and <body>. Segment layouts (e.g. [locale], admin) add the rest.
 */
export const metadata: Metadata = {
  // Minimal defaults; [locale] layout overrides with full metadata
  title: 'Design World',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
