import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/layout/ScrollToTop";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wisemonie",
  description: "Finance With Security And Flexibility",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className={`${manrope.className} antialiased`}>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}