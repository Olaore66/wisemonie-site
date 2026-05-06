import LegalPage from "@/components/LegalPage";
import { securityPage } from "@/data/legalPages";

export const metadata = {
  title: "Security",
  description: "How Wisemonie protects user data and payment activity."
};

export default function SecurityPage() {
  return <LegalPage {...securityPage} />;
}
