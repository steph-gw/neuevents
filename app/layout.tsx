import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { InquiryModalProvider } from "@/components/InquiryModal";
import ScrollReveal from "@/components/ScrollReveal";
import { INQUIRY_FORM_SRC } from "@/lib/contact-data";
import {
  getSiteUrl,
  SITE_BROWSER_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_OG_DESCRIPTION,
  SITE_OG_TITLE,
} from "@/lib/site";
import { OG_IMAGE } from "@/lib/metadata";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: SITE_BROWSER_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: SITE_OG_TITLE,
    description: SITE_OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_OG_TITLE,
    description: SITE_OG_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${cormorant.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://gatherwise.io" />
        <link rel="dns-prefetch" href="https://gatherwise.io" />
        <link rel="prefetch" href={INQUIRY_FORM_SRC} as="document" />
      </head>
      <body className={GeistSans.className}>
        <InquiryModalProvider>
          <Nav />
          {children}
          <Footer />
          <ScrollReveal />
        </InquiryModalProvider>
      </body>
    </html>
  );
}
