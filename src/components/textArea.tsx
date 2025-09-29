import type { CSSProperties } from "react";

interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  columns?: number;
  style: CSSProperties;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  value,
  onChange,
  placeholder,
  rows,
  columns,
  style,
}) => (
  <div className="mb-3">
    {label && <label className="form-label">{label}</label>}
    <textarea
      className="form-control form-control-lg"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      cols={columns}
      style={style}
    />
  </div>
);
