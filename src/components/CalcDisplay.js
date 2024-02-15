export default function CalcDisplay({ total, label }) {
  return (
    <div className="calculator-display">
      <div className="calculator-display__amount">{total}</div>
      <div className="calculator-display__label calculator-mode">{label}</div>
    </div>
  );
}
