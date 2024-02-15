import TextInput from "./elements/TextInput";
import SelectInput from "./elements/SelectInput";
import { useState } from "react";

export default function FormMortgageCalculator({ calculator, onUpdateCalc }) {
  const [loan, setLoan] = useState(calculator.loan);
  const [payment, setPayment] = useState(calculator.payment);
  const [interest, setInterest] = useState(calculator.interest);
  const [tax, setTax] = useState(calculator.tax);
  const [down, setDown] = useState(calculator.down);
  const [insurance, setInsurance] = useState(calculator.insurance);
  const [term, setTerm] = useState(calculator.term);

  const termOptions = [
    { text: "30-year fixed", value: 30 },
    { text: "20-year fixed", value: 20 },
    { text: "15-year fixed", value: 15 },
  ];

  function handleChange(setFn, field, value) {
    setFn(value);

    const newCalc = { ...calculator };
    if (field === "term") {
      newCalc["termYears"] = +value;
      newCalc["termType"] = "fixed"; //TODO: support this
    } else {
      newCalc[field] = +value;
    }

    onUpdateCalc(newCalc);
  }

  return (
    <form className="basic-calculator-input">
      <TextInput
        label="Loan Amount"
        pre="$"
        post=".00"
        value={loan}
        onChange={(e) =>
          handleChange(setLoan, "loan", Math.trunc(+e.target.value))
        }
        type="Number"
      />
      <TextInput
        label="Monthly Payment"
        pre="$"
        post=".00"
        value={payment}
        onChange={(e) =>
          handleChange(setPayment, "payment", Math.trunc(+e.target.value))
        }
        type="Number"
      />
      <TextInput
        label="Interest Rate"
        post="%"
        value={interest}
        onChange={(e) => handleChange(setInterest, "interest", e.target.value)}
        type="Number"
        step="0.01"
      />

      <SelectInput
        label="Loan Term"
        preset="Choose your loan term..."
        options={termOptions}
        value={term}
        onChange={(e) => handleChange(setTerm, "term", +e.target.value)}
        type="Number"
      />

      <TextInput
        label="Estimated Annual Property Tax"
        pre="$"
        post=".00"
        value={tax}
        onChange={(e) =>
          handleChange(setTax, "tax", Math.trunc(+e.target.value))
        }
        type="Number"
      />
      <TextInput
        label="Estimated Annual Property Insurance"
        pre="$"
        post=".00"
        value={insurance}
        onChange={(e) =>
          handleChange(setInsurance, "insurance", Math.trunc(+e.target.value))
        }
        type="Number"
      />
      <TextInput
        label="Estimated Down Payment"
        pre="$"
        post=".00"
        value={down}
        onChange={(e) =>
          handleChange(setDown, "down", Math.trunc(+e.target.value))
        }
        type="Number"
      />
    </form>
  );
}
