import LegalPage from "@/components/LegalPage";
import { securityPage } from "@/data/legalPages";

export const metadata = {
  title: "Security",
  description: "How wisemonie protects user data and payment activity.",
  alternates: { canonical: "/security" }
};

export default function SecurityPage() {
  return <LegalPage {...securityPage} />;
}
