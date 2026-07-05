import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Rubik } from "next/font/google";
import { routing } from "@/i18n/routing";
import { AppShell } from "@/components/layout/app-shell";
import "../globals.css";

const rubik = Rubik({
  subsets: ["latin", "hebrew"],
  variable: "--font-sans",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as "he" | "en")) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "he" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} className={`${rubik.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <AppShell>{children}</AppShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
