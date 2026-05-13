// PLACEHOLDER — substituir por componente real.
export function Input({ label, value, onChange, error, type = 'text', ...props }) {
  return (
    <div className="form-group">
      <label>
        {label}
        <input
          type={type}
          value={value ?? ''}
          onChange={(e) => onChange?.(e.target.value)}
          aria-invalid={!!error}
          {...props}
        />
      </label>
      {error && <span className="error-message" role="alert">{error}</span>}
    </div>
  );
}
