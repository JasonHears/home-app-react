import * as config from "./config";
import { roundMoney } from "./helper";

/**
 * Calculates the monthly PMI payment cost based on loan amount and down payment
 * @param {Number} loanAmt amount being financed via loan
 * @param {Number} downPayment amount provided for down payment
 * @returns
 */
const _calculateMonthlyPMI = function (loanAmt, downPayment) {
  // loanAmt + downPayment = purchase price
  const percentFunded = (downPayment / (loanAmt + downPayment)) * 100;

  if (percentFunded >= config.PMI_QUALIFY_PCT) return 0;

  // calculate 0-1 scale for determining how much PMI percentage rate will be
  const pctPMI =
    (config.PMI_QUALIFY_PCT - percentFunded) / config.PMI_QUALIFY_PCT;
  // use above percentage to determine actual PMI percentage rate
  const pmiRate = (config.PMI_MAXIMUM * pctPMI + config.PMI_MINIMUM) / 100;

  // return monthly PMI cost
  return (loanAmt * pmiRate) / 12;
};

/**
 * Calculates the total PMI cost over the life of a loan
 * @param {Number} loanAmt amount being financed via loan
 * @param {Number} downPayment amount provided for down payment
 * @param {Number} termYears number of years loan is financed for
 * @returns
 */
const _calculateAmountPMI = function (loanAmt, downPayment, termYears) {
  // 20% of loan is paid off after x months of loan (assumes straight-line)
  // assuming PMI is removed after 20% ltv
  const pmiTermMonths = termYears * 12 * 0.2; // 20% of total months of loan

  // calculate the monthly PMI cost
  const monthlyPMI = _calculateMonthlyPMI(loanAmt, downPayment);

  // calculate the total PMI cost over the loan (assumes PMI removed after 20% ltv)
  const totalPMICost = monthlyPMI * pmiTermMonths;

  // return total PMI cost of loan
  return totalPMICost;
};

/**
 * Calculates the monthly payment based on loan amount
 * @param {Object} calc calculator object
 * @param {boolean} togglePropertyTax
 * @param {boolean} toggleInsurance
 * @param {boolean} togglePMI
 * @returns {Number} Non-negative/zero amount of calculation for loan amount or "--"
 */
export const calculatePayment = function (
  calc,
  togglePropertyTax,
  toggleInsurance,
  togglePMI
) {
  const interest = calc.interest / 100 / 12;
  const numPayments = calc.termYears * 12;

  const discountFactor =
    ((1 + interest) ** numPayments - 1) /
    (interest * (1 + interest) ** numPayments);

  let result = roundMoney(calc.loan / discountFactor);

  // Property Tax Inclusion
  if (togglePropertyTax && calc.tax > 0) {
    result += calc.tax / 12;
  }

  // Property Insurance Inclusion
  if (toggleInsurance && calc.insurance > 0) {
    result += calc.insurance / 12;
  }

  // PMI Inclusion
  if (togglePMI && calc.down > 0) {
    const monthlyPMI = _calculateMonthlyPMI(calc.loan, calc.down);
    result += monthlyPMI;
  }

  console.log("result payment: ", result);
  return result > 0 ? result : "--";
};

/**
 * Calculates the maximum loan amount based on monthly payment
 * @param {Object} calc calculator object
 * @param {boolean} togglePropertyTax
 * @param {boolean} toggleInsurance
 * @param {boolean} togglePMI
 * @returns {Number, String} Non-negative/zero amount of calculation for loan amount or "--"
 */
export const calculateLoanAmount = function (
  calc,
  togglePropertyTax,
  toggleInsurance,
  togglePMI
) {
  const interest = calc.interest / 100 / 12;
  const numPayments = calc.termYears * 12;

  const discountFactor =
    ((1 + interest) ** numPayments - 1) /
    (interest * (1 + interest) ** numPayments);

  let adjustedPayment = calc.payment;

  // Property Tax Inclusion
  if (togglePropertyTax && calc.tax > 0) {
    adjustedPayment -= calc.tax / 12;
  }

  // Property Insurance Inclusion
  if (toggleInsurance && calc.insurance > 0) {
    adjustedPayment -= calc.insurance / 12;
  }

  let result = roundMoney(adjustedPayment * discountFactor); // current loan amount

  // PMI Inclusion
  if (togglePMI && calc.down > 0) {
    const totalPMICost = _calculateAmountPMI(result, calc.down, calc.termYears);
    result -= totalPMICost;
  }

  console.log("result loan: ", result);
  return result > 0 ? result : "??";
};

/**
 * Returns whether or not calculator has valid inputs to run against
 * @param {Object} calc calculator object
 * @param {boolean} calcTypeToggle
 * @returns {boolean} true if calculator is valid, false if not
 */
export const isCalculatorValid = function (calc, calcTypeToggle) {
  return (
    // validate interest and termYears are > 0
    calc.interest > 0 &&
    calc.termYears > 0 &&
    // validate loan amount or payment is > 0 based on calculation type
    ((calcTypeToggle === config.CALC_TYPE_MONTHLY && calc.loan > 0) ||
      (calcTypeToggle === config.CALC_TYPE_AMOUNT && calc.payment > 0))
  );
};
