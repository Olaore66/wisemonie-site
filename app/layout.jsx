import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://wisemonie.app"),
  title: {
    default: "Wisemonie - Budgeting App for Nigerian Income Earners",
    template: "%s | Wisemonie"
  },
  description:
    "Wisemonie holds your income in structured envelopes and only releases today's spending limit when you need it, so you reach payday without breaking your plan or reaching for a loan app.",
  keywords: [
    "wisemonie",
    "budgeting app",
    "digital envelope system",
    "personal finance",
    "money management app",
    "Nigeria fintech",
    "income earners",
    "loan app alternative"
  ],
  authors: [{ name: "Wisemonie" }],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Wisemonie - Stop Running Out of Money Before Payday",
    description:
      "Structured envelopes for transport, food, bills, savings, and emergencies. Wisemonie releases today's spending limit only when you need it.",
    url: "https://wisemonie.app",
    siteName: "Wisemonie",
    type: "website",
    images: [
      {
        url: "/images/main_logo.png",
        width: 1200,
        height: 630,
        alt: "Wisemonie"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Wisemonie - Stop Running Out of Money Before Payday",
    description:
      "Structured envelopes for transport, food, bills, savings, and emergencies. Wisemonie releases today's spending limit only when you need it.",
    images: ["/images/main_logo.png"]
  },
  icons: {
    icon: "/images/iconwithoutbackground.png",
    shortcut: "/images/iconwithoutbackground.png",
    apple: "/images/iconwithoutbackground.png"
  },
  manifest: "/images/site.webmanifest"
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Wisemonie",
  url: "https://wisemonie.app",
  logo: "https://wisemonie.app/images/iconwithoutbackground.png",
  sameAs: [
    "https://www.instagram.com/wisemonie_app/",
    "https://x.com/wisemonie_app",
    "https://whatsapp.com/channel/0029Vb6kU683bbUy3azQF047"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Wisemonie",
  url: "https://wisemonie.app"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <SmoothScroll />
        <ScrollProgressBar />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
