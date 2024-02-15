import { useState } from "react";

export default function ToggleButton({ label, state1, state2, value }) {
  const id = crypto.randomUUID().slice(0, 8);
  const [selected, setSelected] = useState(value);

  function handleChange(e) {
    setSelected(e.target.value);
  }

  return (
    <div className="calculator-controls__row">
      <div className="calculator-controls__label">{label}</div>
      <input
        type="radio"
        className="btn-check calculation-type__switch"
        name={id}
        id={`${id}-${state1}`}
        onChange={handleChange}
        value={state1}
        checked={selected === state1}
      />
      <label
        className="btn calculator-controls__btn"
        htmlFor={`${id}-${state1}`}
      >
        {state1}
      </label>

      <input
        type="radio"
        name={id}
        className="btn-check calculation-type__switch"
        id={`${id}-${state2}`}
        onChange={handleChange}
        value={state2}
        checked={selected === state2}
      />
      <label
        className="btn calculator-controls__btn"
        htmlFor={`${id}-${state2}`}
      >
        {state2}
      </label>
    </div>
  );
}
