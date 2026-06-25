import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://wisemonie.app"),
  title: {
    default: "Wisemonie: The layer that runs your week. One salary, every commitment, on time.",
    template: "%s | Wisemonie"
  },
  description:
    "Wisemonie splits one salary into the rhythms of your week. Monday lunch. Wednesday service. Friday date. Saturday parents. Sunday tithe. Every commitment shows up on time. Built on regulated Nigerian banking rails.",
  keywords: [
    "weekly money planner",
    "household money management",
    "envelope budgeting Nigeria",
    "salary planning Nigeria",
    "structured spending",
    "recurring money rhythms",
    "Nigerian fintech",
    "regulated wallet"
  ],
  authors: [{ name: "Wisemonie" }],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Wisemonie: Live your full week, every week, on one salary.",
    description:
      "The first app that knows what day it is. Wisemonie holds your salary in envelopes that release on schedule, so Monday lunch shows up Monday, Sunday tithe shows up Sunday, and you stop doing maths in your head.",
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
    title: "Wisemonie: Live your full week, every week, on one salary.",
    description:
      "The first app that knows what day it is. Wisemonie holds your salary in envelopes that release on schedule, so Monday lunch shows up Monday, Sunday tithe shows up Sunday, and you stop doing maths in your head.",
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
