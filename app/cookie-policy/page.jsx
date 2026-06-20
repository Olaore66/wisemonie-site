import LegalPage from "@/components/LegalPage";
import { cookiePage } from "@/data/legalPages";

export const metadata = {
  title: "Cookie Policy",
  description: "How wisemonie uses cookies and similar technologies.",
  alternates: { canonical: "/cookie-policy" }
};

export default function CookiePolicyPage() {
  return <LegalPage {...cookiePage} />;
}
