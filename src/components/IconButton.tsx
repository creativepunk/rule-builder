import type { ReactNode } from 'react';
import styles from './IconButton.module.css';

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  label: string;
  variant?: 'default' | 'danger';
}

export function IconButton({ icon, onClick, label, variant = 'default' }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${variant === 'danger' ? styles.danger : ''}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
}
