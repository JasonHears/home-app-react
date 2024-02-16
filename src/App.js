import { useState } from "react";

import Nav from "./components/Nav";
import FormMortgageCalculator from "./components/FormMortgageCalculator";
import CalculatorControls from "./components/CalcControls";
import CalcDisplay from "./components/CalcDisplay";

import { CALC_TYPE_MONTHLY } from "./helpers/config";

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

  const [toggleCalcType, setToggleCalcType] = useState(CALC_TYPE_MONTHLY);
  const [togglePropertyTax, setTogglePropertyTax] = useState(false);
  const [toggleInsurance, setToggleInsurance] = useState(false);
  const [togglePMI, setTogglePMI] = useState(false);

  /**
   * Used to handle updating toggle state in a single function used as props
   * @param {String} toggle name of the state variable to update
   * @param {boolean} value new value to set
   */
  function handleChangeControl(toggle, value) {
    if (toggle === "calcType") setToggleCalcType(value);
    if (toggle === "tax") setTogglePropertyTax(value);
    if (toggle === "insurance") setToggleInsurance(value);
    if (toggle === "pmi") setTogglePMI(value);
  }

  return (
    <div className="container">
      <Header />
      <Nav />

      <div className="panel-box gray">
        <h2>Mortgage Calculator</h2>
        <CalcDisplay
          calculator={calculator}
          calcTypeToggle={toggleCalcType}
          taxToggle={togglePropertyTax}
          insuranceToggle={toggleInsurance}
          pmiToggle={togglePMI}
        />
        <hr />
        <CalculatorControls
          calcTypeToggle={toggleCalcType}
          taxToggle={togglePropertyTax}
          insuranceToggle={toggleInsurance}
          pmiToggle={togglePMI}
          onChangeControl={handleChangeControl}
        />
      </div>

      <div className="panel-box">
        <h2>Calculator Input</h2>
        <FormMortgageCalculator
          calculator={calculator}
          calcTypeToggle={toggleCalcType}
          taxToggle={togglePropertyTax}
          insuranceToggle={toggleInsurance}
          pmiToggle={togglePMI}
          onUpdateCalc={setCalculator}
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
