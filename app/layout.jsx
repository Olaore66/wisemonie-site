import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://wisemonie.com"),
  title: {
    default: "wisemonie - Money Planning That Eases Financial Stress",
    template: "%s | wisemonie"
  },
  description:
    "wisemonie helps you protect transport, food, bills, savings, and essential money before the month ends.",
  keywords: [
    "wisemonie",
    "budgeting app",
    "digital envelope system",
    "personal finance",
    "money management app",
    "Nigeria fintech"
  ],
  authors: [{ name: "OLX Digital Services" }],
  openGraph: {
    title: "wisemonie - Make Your Money Last Till Month-End",
    description:
      "Protect transport, food, bills, and savings with wisemonie's digital envelope budgeting system.",
    url: "https://wisemonie.com",
    siteName: "wisemonie",
    type: "website",
    images: ["/images/logo2.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "wisemonie - Make Your Money Last Till Month-End",
    description:
      "Protect transport, food, bills, and savings with wisemonie's digital envelope budgeting system.",
    images: ["/images/logo2.svg"]
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
      </head>
      <body>
        <SmoothScroll />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
