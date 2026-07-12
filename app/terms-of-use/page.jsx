import LegalPage from "@/components/LegalPage";
import { fetchLegalContent, legalBaseUrl } from "@/data/legalApi";

export const metadata = {
  title: "Terms of Use",
  description: "The terms governing your use of Wisemonie's app and website.",
  alternates: { canonical: "/terms-of-use" }
};

export default async function TermsOfUsePage() {
  const doc = await fetchLegalContent("/terms-of-use");
  const href = `${legalBaseUrl()}/terms-of-use`;

  return (
    <LegalPage
      eyebrow="Legal information"
      icon="gavel"
      title="Terms of Use"
      meta={doc?.meta}
      html={
        doc?.html ||
        `<p>We couldn't load the latest Terms of Use just now. You can read the current version here: <a href="${href}">${href}</a>.</p>`
      }
    />
  );
}
