export function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="info-card">
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}
