'use client';

import { useEffect } from 'react';

/**
 * Sets document lang and dir from locale (for accessibility and RTL).
 * Used when the root layout owns <html> and we need locale-specific attributes.
 */
export default function LocaleDocumentAttributes({
  locale,
}: {
  locale: string;
}) {
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);
  return null;
}
