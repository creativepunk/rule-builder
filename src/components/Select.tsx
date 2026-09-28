import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import styles from './Select.module.css';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  style?: React.CSSProperties;
}

export function Select({ value, options, onChange, placeholder = 'Select...', style }: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find(o => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className={styles.wrapper} style={style}>
      <button
        type="button"
        className={`${styles.trigger} ${open ? styles.open : ''} ${!selected ? styles.placeholder : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className={styles.label}>{selected?.label ?? placeholder}</span>
        <ChevronDown size={14} className={`${styles.chevron} ${open ? styles.rotated : ''}`} />
      </button>

      {open && (
        <div className={styles.dropdown}>
          {options.map(opt => (
            <div
              key={opt.value}
              className={`${styles.option} ${opt.value === value ? styles.selected : ''}`}
              onMouseDown={() => { onChange(opt.value); setOpen(false); }}
            >
              {opt.value === value
                ? <Check size={14} className={styles.checkmark} />
                : <span style={{ width: 14 }} />
              }
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
