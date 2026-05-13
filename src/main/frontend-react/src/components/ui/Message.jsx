// PLACEHOLDER — substituir por componente real.
export function Message({ type = 'info', text }) {
  return (
    <div className={`message ${type}`} role="status" data-type={type}>
      {text}
    </div>
  );
}
