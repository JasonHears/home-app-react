import logo from "../logo.svg";
import * as Icon from "react-bootstrap-icons";

export default function Nav() {
  return (
    <nav className="nav-box">
      <div className="nav-box__logo">
        <img src={logo} className="logo" alt="Home App Logo" />
      </div>

      <div className="nav-box__item nav-box__item--selected">
        <Icon.Calculator className="bi" size={"100%"} color="#fff" />
      </div>
    </nav>
  );
}
