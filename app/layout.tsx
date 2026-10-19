import type { Metadata } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { DEFAULT_OG_IMAGE, SITE_LOGO, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const gaId = process.env.NEXT_PUBLIC_GA_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Recurv",
    default: "Recurv",
  },
  description:
    "Recurv handles the full collection cycle — from payment authorisation to reconciliation — across membership dues, payment plans, rent, subscriptions, and more.",
  openGraph: {
    type: "website",
    siteName: "Recurv",
    images: [{ url: DEFAULT_OG_IMAGE }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}${SITE_LOGO}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${jetbrainsMono.variable}`}
      style={{ background: "#FFFFFF" }}
    >
      <head>
        <link rel="describedby" href="/llms.txt" />
      </head>
      <body style={{ margin: 0, fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
      {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
    </html>
  );
}
