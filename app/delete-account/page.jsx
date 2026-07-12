import LegalPage from "@/components/LegalPage";
import { fetchLegalContent, legalBaseUrl } from "@/data/legalApi";

export const metadata = {
  title: "Delete Account",
  description:
    "How to permanently delete your Wisemonie account and the personal data associated with it.",
  alternates: { canonical: "/delete-account" }
};

export default async function DeleteAccountPage() {
  const doc = await fetchLegalContent("/delete-account");
  const href = `${legalBaseUrl()}/delete-account`;

  return (
    <LegalPage
      eyebrow="Account and data"
      icon="delete"
      title="Delete your account"
      meta={doc?.meta}
      html={
        doc?.html ||
        `<p>You can permanently delete your Wisemonie account from the app (<strong>More → Profile &amp; Account → Delete Account</strong>) or by emailing <a href="mailto:wisemoniehelpdesk@gmail.com">wisemoniehelpdesk@gmail.com</a> from your registered address. Full details: <a href="${href}">${href}</a>.</p>`
      }
    />
  );
}
