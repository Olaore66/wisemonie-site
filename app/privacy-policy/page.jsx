import LegalPage from "@/components/LegalPage";
import { fetchLegalContent, legalBaseUrl } from "@/data/legalApi";

export const metadata = {
  title: "Privacy Policy",
  description: "How Wisemonie collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" }
};

export default async function PrivacyPolicyPage() {
  const doc = await fetchLegalContent("/privacy-policy");
  const href = `${legalBaseUrl()}/privacy-policy`;

  return (
    <LegalPage
      eyebrow="Legal information"
      icon="policy"
      title="Privacy Policy"
      meta={doc?.meta}
      html={
        doc?.html ||
        `<p>We couldn't load the latest Privacy Policy just now. You can read the current version here: <a href="${href}">${href}</a>.</p>`
      }
    />
  );
}
