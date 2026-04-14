import { NavLink } from 'react-router-dom';

export function ButtonLink({
  to,
  variant = 'primary',
  children,
}: {
  to: string;
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}) {
  return (
    <NavLink className={variant === 'primary' ? 'primary-btn' : 'secondary-btn'} to={to}>
      {children}
    </NavLink>
  );
}
