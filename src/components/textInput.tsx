export interface TextInputProps {
  label?: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}) => (
  <div className="mb-3">
    {label && <label className="form-label">{label}</label>}
    <input
      type={type}
      className="form-control form-control-lg"
      value={value}
      placeholder={placeholder} 
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
