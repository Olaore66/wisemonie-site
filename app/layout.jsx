import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://wisemonie.com"),
  title: {
    default: "Wisemonie - Money Planning That Eases Financial Stress",
    template: "%s | Wisemonie"
  },
  description:
    "Wisemonie helps you protect transport, food, bills, savings, and essential money before the month ends.",
  keywords: [
    "Wisemonie",
    "budgeting app",
    "digital envelope system",
    "personal finance",
    "money management app",
    "Nigeria fintech"
  ],
  authors: [{ name: "OLX Digital Services" }],
  openGraph: {
    title: "Wisemonie - Make Your Money Last Till Month-End",
    description:
      "Protect transport, food, bills, and savings with Wisemonie's digital envelope budgeting system.",
    url: "https://wisemonie.com",
    siteName: "Wisemonie",
    type: "website",
    images: ["/images/logo2.svg"]
  },
  twitter: {
    card: "summary_large_image",
    title: "Wisemonie - Make Your Money Last Till Month-End",
    description:
      "Protect transport, food, bills, and savings with Wisemonie's digital envelope budgeting system.",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
