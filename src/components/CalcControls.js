import ToggleButton from "./elements/ToggleButton";

export default function CalculatorControls({
  calcTypeToggle,
  taxToggle,
  insuranceToggle,
  pmiToggle,
  onChangeControl,
}) {
  return (
    <>
      <ToggleButton
        label="Which do you want to calculate?"
        stateOff="Monthly Payment"
        stateOn="Loan Amount"
        value={calcTypeToggle}
        onChange={(toggleVal) => onChangeControl("calcType", toggleVal)}
      />

      <ToggleButton
        label="Include Annual Property Tax?"
        stateOff="No"
        stateOn="Yes"
        value={taxToggle}
        onChange={(toggleVal) => onChangeControl("tax", toggleVal)}
      />
      <ToggleButton
        label="Include Annual Insurance?"
        stateOff="No"
        stateOn="Yes"
        value={insuranceToggle}
        onChange={(toggleVal) => onChangeControl("insurance", toggleVal)}
      />
      <ToggleButton
        label="Include PMI?"
        stateOff="No"
        stateOn="Yes"
        value={pmiToggle}
        onChange={(toggleVal) => onChangeControl("pmi", toggleVal)}
      />
    </>
  );
}
