export default function PanelBox({ title, children, classes = "" }) {
  return (
    <div className={`${classes} panel-box`}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
