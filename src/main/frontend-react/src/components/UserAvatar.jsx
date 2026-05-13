// PLACEHOLDER — substituir por componente real.
export function UserAvatar({ nome }) {
  const inicial = (nome ?? '?').trim().charAt(0).toUpperCase();
  return <div className="user-avatar" aria-label={`Avatar de ${nome ?? 'usuário'}`}>{inicial}</div>;
}
