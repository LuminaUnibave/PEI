export function AddressSection() {
  return (
    <section className="grid-section">
      <article className="info-card">
        <h3>Endereço</h3>
        <p>Rua Miguel Couto, 200</p>
        <p>Orleans - SC</p>
        <p>Atendimento em horário comercial.</p>
      </article>
      <article className="info-card map-card">
        <h3>Localização</h3>
        <div className="map-placeholder">Mapa</div>
      </article>
    </section>
  );
}
