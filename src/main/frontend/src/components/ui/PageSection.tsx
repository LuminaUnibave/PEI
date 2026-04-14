export function PageSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-section">
      <div className="section-head">
        <div>
          <h2>{title}</h2>
        </div>
        {description ? <p className="lead small">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
