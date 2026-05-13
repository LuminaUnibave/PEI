// PLACEHOLDER — substituir por componente real.
export function SearchInput({ value, onChange, placeholder }) {
  return (
    <input
      type="text"
      className="search-input"
      value={value ?? ''}
      placeholder={placeholder}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
