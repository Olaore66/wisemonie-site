import LegalPage from "@/components/LegalPage";
import { privacyPage } from "@/data/legalPages";

export const metadata = {
  title: "Privacy Policy",
  description: "wisemonie's privacy policy for website and mobile app information."
};

export default function PrivacyPolicyPage() {
  return <LegalPage {...privacyPage} />;
}
