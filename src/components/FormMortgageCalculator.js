import TextInput from "./elements/TextInput";
import SelectInput from "./elements/SelectInput";

export default function FormMortgageCalculator({
  calculator,
  onUpdateCalc,
  calcTypeToggle,
  taxToggle,
  insuranceToggle,
  pmiToggle,
}) {
  const termOptions = [
    { text: "30-year fixed", value: "30,fixed" },
    { text: "20-year fixed", value: "20,fixed" },
    { text: "15-year fixed", value: "15,fixed" },
  ];

  /**
   * Trying to be smart here and consolidate into a single handler function for updating local state and parent calculator
   * @param {function} setFn
   * @param {String} field
   * @param {*} value
   */
  function handleChange(field, value) {
    const newCalc = { ...calculator };
    if (field === "term") {
      const [termYears, termType] = value.split(",");
      newCalc["termYears"] = +termYears;
      newCalc["termType"] = termType;
    } else {
      newCalc[field] = +value;
    }

    onUpdateCalc(newCalc);
  }

  return (
    <form className="basic-calculator-input">
      {!calcTypeToggle && (
        <TextInput
          label="Loan Amount"
          pre="$"
          post=".00"
          onChange={(e) => handleChange("loan", Math.trunc(+e.target.value))}
          type="Number"
        />
      )}
      {calcTypeToggle && (
        <TextInput
          label="Monthly Payment"
          pre="$"
          post=".00"
          onChange={(e) => handleChange("payment", Math.trunc(+e.target.value))}
          type="Number"
        />
      )}
      <TextInput
        label="Interest Rate"
        post="%"
        onChange={(e) => handleChange("interest", e.target.value)}
        type="Number"
        step="0.01"
      />

      <SelectInput
        label="Loan Term"
        preset="Choose your loan term..."
        options={termOptions}
        onChange={(e) => handleChange("term", e.target.value)}
        type="Number"
      />

      {taxToggle && (
        <TextInput
          label="Estimated Annual Property Tax"
          pre="$"
          post=".00"
          onChange={(e) => handleChange("tax", Math.trunc(+e.target.value))}
          type="Number"
        />
      )}
      {insuranceToggle && (
        <TextInput
          label="Estimated Annual Property Insurance"
          pre="$"
          post=".00"
          onChange={(e) =>
            handleChange("insurance", Math.trunc(+e.target.value))
          }
          type="Number"
        />
      )}
      {pmiToggle && (
        <TextInput
          label="Estimated Down Payment"
          pre="$"
          post=".00"
          onChange={(e) => handleChange("down", Math.trunc(+e.target.value))}
          type="Number"
        />
      )}
    </form>
  );
}
