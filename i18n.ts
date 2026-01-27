import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Define the supported locales
const locales = ['tr', 'en', 'ru', 'ar', 'fr'];

export default getRequestConfig(async ({requestLocale}) => {
  // This typically returns a Promise that resolves to the locale string
  let locale = await requestLocale;

  // Validate that the incoming `locale` parameter is valid
  // We use `as any` to bypass the strict type check just for the includes method
  if (!locale || !locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});

