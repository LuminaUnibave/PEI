// PLACEHOLDER — substituir por componente real.
export function Button({ children, loading, disabled, ...props }) {
  return (
    <button {...props} disabled={loading || disabled}>
      {children}
    </button>
  );
}
