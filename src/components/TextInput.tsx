import styles from './TextInput.module.css';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'number' | 'date';
  style?: React.CSSProperties;
}

export function TextInput({ value, onChange, placeholder = 'Enter value...', type = 'text', style }: TextInputProps) {
  return (
    <input
      type={type}
      value={value as string}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className={styles.input}
      style={style}
    />
  );
}
