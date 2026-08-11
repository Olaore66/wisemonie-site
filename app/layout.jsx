import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://wisemonie.app"),
  title: {
    default: "Wisemonie: Align your financial plan with your spending.",
    template: "%s | Wisemonie"
  },
  description:
    "Wisemonie aligns your financial plan with your actual spending. Assign money to commitments, set release rules, and spend only from what you planned. Built on regulated Nigerian banking rails.",
  keywords: [
    "personal finance Nigeria",
    "spending plan app",
    "envelope budgeting Nigeria",
    "money management app",
    "structured spending",
    "financial planning Nigeria",
    "Nigerian fintech",
    "regulated wallet"
  ],
  authors: [{ name: "Wisemonie" }],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Wisemonie: Your financial plan and your spending, finally aligned.",
    description:
      "Assign money to commitments, set release rules, and spend only from what you planned. Wisemonie closes the gap between your plan and your spending.",
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
    title: "Wisemonie: Your financial plan and your spending, finally aligned.",
    description:
      "Assign money to commitments, set release rules, and spend only from what you planned. Wisemonie closes the gap between your plan and your spending.",
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
    "https://www.facebook.com/wisemonie_app",
    "https://www.tiktok.com/@wisemonie_app",
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
        <Analytics />
      </body>
    </html>
  );
}
