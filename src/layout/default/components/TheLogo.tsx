import { Link } from "react-router-dom";
import Logo from "@/static/image/logo.png";
import "./TheLogo.scss";

const LayoutLogo = () => {
  return (
    <Link className="logo"
          to="/">
      <img style={ { width: "60px", height: "30px" } }
           src={ Logo } />
      <h1 className="logo_text">华玥店</h1>
    </Link>
  );
};
export default LayoutLogo;
