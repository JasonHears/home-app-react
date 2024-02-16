export default function SelectInput({
  label,
  preset,
  options,
  onChange,
  value,
}) {
  return (
    <div className="mb-3">
      <label>{label}</label>
      <select
        className="calculator-field form-select form-select-lg"
        value={preset ? preset : value}
        onChange={onChange}
      >
        {preset && (
          <option value={preset} disabled>
            {preset}
          </option>
        )}
        {options.map((option) => (
          <option value={option?.value} key={option?.value}>
            {option?.text}
          </option>
        ))}
      </select>
    </div>
  );
}
