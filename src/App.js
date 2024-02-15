import FormMortgageCalculator from "./components/FormMortgageCalculator";
import Nav from "./components/Nav";
import CalculatorControls from "./components/CalcControls";
import CalcDisplay from "./components/CalcDisplay";
import { useState } from "react";
import {
  calculatePayment,
  calculateLoanAmount,
  isCalculatorValid,
} from "./helpers/calculator";
import {
  TOGGLE_CALC_TYPE,
  TOGGLE_PROPERTY_TAX,
  TOGGLE_INSURANCE,
  TOGGLE_PMI,
  CALC_TYPE_MONTHLY,
} from "./helpers/config";

export default function App() {
  const [calculator, setCalculator] = useState({
    loan: "",
    payment: "",
    interest: "",
    termYears: "",
    termType: "",
    tax: "",
    insurance: "",
    down: "",
  });

  const [displayTotal, setDisplayTotal] = useState("--");
  const [displayLabel, setDisplayLabel] = useState("Enter your information.");

  const initControl = {};
  initControl[TOGGLE_CALC_TYPE] = CALC_TYPE_MONTHLY;
  initControl[TOGGLE_PROPERTY_TAX] = false;
  initControl[TOGGLE_INSURANCE] = false;
  initControl[TOGGLE_PMI] = false;

  const [controls, setControls] = useState(initControl);

  function handleUpdateCalculator(calcUpdate) {
    setCalculator(calcUpdate);

    if (!isCalculatorValid(calcUpdate, controls)) return;

    // calculate & update
    // TODO: payment vs loan amount
    const newCalc =
      controls[TOGGLE_CALC_TYPE] === CALC_TYPE_MONTHLY
        ? calculatePayment(calcUpdate, controls)
        : calculateLoanAmount(calcUpdate, controls);
    setDisplayTotal(newCalc);

    setDisplayLabel(
      controls[TOGGLE_CALC_TYPE] === CALC_TYPE_MONTHLY
        ? "Estimated Monthly Payment"
        : "Estimated Loan Amount"
    );
  }

  return (
    <div className="container">
      <Header />
      <Nav />

      <div className="panel-box gray">
        <h2>Mortgage Calculator</h2>
        <CalcDisplay total={displayTotal} label={displayLabel} />
        <hr />
        <CalculatorControls />
      </div>

      <div className="panel-box">
        <h2>Calculator Input</h2>
        <FormMortgageCalculator
          calculator={calculator}
          onUpdateCalc={handleUpdateCalculator}
        />
      </div>

      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Home App Web</h1>
    </header>
  );
}

function Footer() {
  return <footer>© Copyright 2024 Jason Holderness</footer>;
}
