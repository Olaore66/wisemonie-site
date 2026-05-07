import LegalPage from "@/components/LegalPage";
import { termsPage } from "@/data/legalPages";

export const metadata = {
  title: "Terms of Service",
  description: "Terms governing the wisemonie website and mobile application."
};

export default function TermsOfServicePage() {
  return <LegalPage {...termsPage} />;
}
