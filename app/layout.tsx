import type { Metadata } from "next";
import { Alice, Cormorant_Garamond, Outfit } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import { InquiryModalProvider } from "@/components/InquiryModal";
import ScrollReveal from "@/components/ScrollReveal";
import StructuredData from "@/components/StructuredData";
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
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/structured-data";
import "./globals.css";
import "./home-v2.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const alice = Alice({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alice",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = buildOrganizationSchema();
  const webSiteSchema = buildWebSiteSchema();

  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${alice.variable} ${outfit.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://api.leadconnectorhq.com" />
        <link rel="dns-prefetch" href="https://api.leadconnectorhq.com" />
        <link rel="preconnect" href="https://link.msgsndr.com" />
        <link rel="prefetch" href={INQUIRY_FORM_SRC} as="document" />
        <StructuredData data={organizationSchema} />
        <StructuredData data={webSiteSchema} />
      </head>
      <body>
        <ConvexClientProvider>
          <InquiryModalProvider>
            <Nav />
            {children}
            <Footer />
            <ScrollReveal />
          </InquiryModalProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
