import Badge from "@/components/Badge";
import Reveal from "@/components/Reveal";
import SectionIllustration from "@/components/SectionIllustration";

export default function LegalPage({
  eyebrow,
  icon,
  title,
  updated,
  version,
  meta,
  intro,
  sections,
  html
}) {
  const metaLine =
    meta ||
    [updated ? `Last updated: ${updated}` : null, version ? `v${version}` : null]
      .filter(Boolean)
      .join(" · ");

  return (
    <main className="page-shell">
      <Reveal as="section" className="page-hero">
        <SectionIllustration side="right" />
        <Badge icon={icon}>{eyebrow}</Badge>
        <h1>{title}</h1>
        {metaLine ? <p className="page-hero__meta">{metaLine}</p> : null}
        {intro ? <p>{intro}</p> : null}
      </Reveal>

      <Reveal as="article" className="content-card legal-card">
        {html ? (
          <div className="legal-html" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          (sections || []).map((section) => (
            <section
              key={section.title || section.body?.[0]}
              className="legal-section"
            >
              {section.title ? <h2>{section.title}</h2> : null}
              {section.body?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.email ? (
                <p>
                  Email: <a href={`mailto:${section.email}`}>{section.email}</a>
                </p>
              ) : null}
            </section>
          ))
        )}
      </Reveal>
    </main>
  );
}
