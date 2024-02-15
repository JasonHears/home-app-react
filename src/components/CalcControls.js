import ToggleButton from "./elements/ToggleButton";
export default function CalculatorControls() {
  return (
    <>
      <ToggleButton
        label="Monthly Payment vs Loan Amount"
        state1="Monthly Payment"
        state2="Loan Amount"
        value="Monthly Payment"
      />

      <ToggleButton
        label="Include Annual Property Tax"
        state1="No"
        state2="Yes"
        value="No"
      />
      <ToggleButton
        label="Include Annual Insurance"
        state1="No"
        state2="Yes"
        value="No"
      />
      <ToggleButton label="Include PMI" state1="No" state2="Yes" value="No" />
    </>
  );
}
