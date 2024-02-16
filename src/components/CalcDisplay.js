import {
  calculatePayment,
  calculateLoanAmount,
  isCalculatorValid,
} from "../helpers/calculator";
import { CALC_TYPE_MONTHLY } from "../helpers/config";
import { formatCurrency } from "../helpers/helper";

export default function CalcDisplay({
  calculator,
  calcTypeToggle,
  taxToggle,
  insuranceToggle,
  pmiToggle,
}) {
  let displayTotal = "--";
  let displayLabel = "Enter your information.";

  // if calculator is valid for calculating, do so and display the results
  if (isCalculatorValid(calculator, calcTypeToggle)) {
    // calculate & update
    displayTotal =
      calcTypeToggle === CALC_TYPE_MONTHLY
        ? calculatePayment(calculator, taxToggle, insuranceToggle, pmiToggle)
        : calculateLoanAmount(
            calculator,
            taxToggle,
            insuranceToggle,
            pmiToggle
          );

    displayLabel =
      +displayTotal > 0
        ? calcTypeToggle === CALC_TYPE_MONTHLY
          ? "Estimated Monthly Payment"
          : "Estimated Loan Amount"
        : "Unable to calculate based on input.";
  }

  return (
    <div className="calculator-display">
      <div className="calculator-display__amount">
        {formatCurrency(displayTotal, "en-US", "USD")}
      </div>
      <div className="calculator-display__label calculator-mode">
        {displayLabel}
      </div>
    </div>
  );
}
