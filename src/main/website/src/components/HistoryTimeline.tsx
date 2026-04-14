export function HistoryTimeline() {
  const timeline = [
    'Fundação da rede e início das ações locais.',
    'Expansão do trabalho de acolhimento à comunidade.',
    'Consolidação de campanhas, eventos e prevenção.',
    'Digitalização da comunicação com website e agenda pública.',
  ];

  return (
    <section className="page-block">
      <h1>Uma narrativa institucional com linha do tempo</h1>
      <div className="timeline">
        {timeline.map((item, index) => (
          <article className="timeline-item" key={item}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <p>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
