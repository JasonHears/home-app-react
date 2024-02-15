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
        value={value}
        onChange={onChange}
        defaultValue=""
      >
        {preset && (
          <option value="" disabled>
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
