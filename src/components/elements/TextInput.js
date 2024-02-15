export default function TextInput({
  label,
  pre,
  post,
  placeholder,
  value,
  onChange,
  step,
  type,
}) {
  const fieldType = type || "text";
  return (
    <div className="mb-3">
      <label>{label}</label>
      <div className="input-group input-group-lg">
        {pre && <span className="input-group-text">{pre}</span>}
        <input
          type={fieldType}
          className="form-control calculator-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          step={step}
        />
        {post && <span className="input-group-text">{post}</span>}
      </div>
    </div>
  );
}
