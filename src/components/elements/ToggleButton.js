import { useState } from "react";

export default function ToggleButton({
  label,
  stateOff,
  stateOn,
  value,
  onChange,
}) {
  const id = crypto.randomUUID().slice(0, 8);
  const [selected, setSelected] = useState(value);

  function handleChange(e) {
    const boolVal = e.target.value === "true";
    setSelected(boolVal);
    onChange(boolVal);
  }

  return (
    <div className="calculator-controls__row">
      <div className="calculator-controls__label">{label}</div>
      <input
        type="radio"
        className="btn-check calculation-type__switch"
        name={id}
        id={`${id}-${stateOff}`}
        onChange={handleChange}
        value={false}
        checked={selected === false}
      />
      <label
        className="btn calculator-controls__btn"
        htmlFor={`${id}-${stateOff}`}
      >
        {stateOff}
      </label>

      <input
        type="radio"
        name={id}
        className="btn-check calculation-type__switch"
        id={`${id}-${stateOn}`}
        onChange={handleChange}
        value={true}
        checked={selected === true}
      />
      <label
        className="btn calculator-controls__btn"
        htmlFor={`${id}-${stateOn}`}
      >
        {stateOn}
      </label>
    </div>
  );
}
