import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import {notFound} from 'next/navigation';
import { Lato } from "next/font/google";
import Header from "@/components/Header/Header";
import "./globals.css";

const lato = Lato({
  weight: '400',
  subsets: ['latin'],
})
 
export default async function LocaleLayout({ params, children}) {
  // Ensure that the incoming `locale` is valid

  const {locale} = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  
  
  return (
    <html lang={locale}>
      <body className={lato.className}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main style={{padding: 20}}>{children}</main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}