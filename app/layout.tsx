import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://eternaguard.cyberworldbuilders.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "EternaGuard - Cemetery Contract Management Software",
    template: "%s | EternaGuard",
  },
  description:
    "Cemetery contract management software built for the way cemeteries actually work. Pre-need and at-need contracts, payment plans, plot inventory, and work orders — finally in one place.",
  keywords: [
    "cemetery software",
    "cemetery management software",
    "cemetery contract software",
    "pre-need software",
    "cemetery sales software",
    "plot management",
    "cemetery work orders",
    "grave mapping software",
    "cemetery GPS",
    "funeral home software",
  ],
  authors: [{ name: "EternaGuard" }],
  creator: "EternaGuard",
  publisher: "EternaGuard",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "EternaGuard",
    title: "EternaGuard - Cemetery Contract Management Software",
    description:
      "Cemetery contract management built for the way cemeteries actually work. Pre-need, at-need, payment plans, and property management in one place.",
    images: [
      {
        url: "/images/eternaguard-hero.png",
        width: 1200,
        height: 630,
        alt: "EternaGuard Cemetery Management Software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EternaGuard - Cemetery Contract Management Software",
    description:
      "Cemetery contract management built for the way cemeteries actually work.",
    images: ["/images/eternaguard-hero.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EternaGuard",
    url: SITE_URL,
    logo: `${SITE_URL}/images/eternaguard-logo.png`,
    description:
      "Cemetery contract management software for pre-need sales, at-need contracts, payment plans, and property management.",
    email: "contact@eternaguard.com",
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EternaGuard",
    url: SITE_URL,
    description:
      "Cemetery contract management software for cemeteries, memorial parks, and funeral homes.",
    publisher: {
      "@type": "Organization",
      name: "EternaGuard",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en">
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
