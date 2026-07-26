import NavbarLogo from "../assets/logo.svg";
import Hamburger from "./Hamburger";
import useMenu from "../hooks/useMenu";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Navbar() {
  const { open, toggleMenu, closeMenu } = useMenu();

  return (
    <>
      <nav id="Navbar">
        <Link to="/" className="Logo">
          <img src={NavbarLogo} alt="Wisemonie logo" />
        </Link>

        <div className={`NavLinksCon ${open ? "active" : ""}`}>
          <div className="NavLinks">
          <HashLink smooth to="/#why-wisemonie" onClick={closeMenu} className="NavLink">
            Why WiseMonie
          </HashLink>

          <HashLink smooth to="/#how-it-works" onClick={closeMenu} className="NavLink">
            How It Works
          </HashLink>

          <HashLink smooth to="/#funded-week" onClick={closeMenu} className="NavLink">
            Funded Week
          </HashLink>

          <HashLink smooth to="/#features" onClick={closeMenu} className="NavLink">
            Features
          </HashLink>
          </div>

          <HashLink smooth to="/#download" className="Btn DownloadBtn">
          Download App
        </HashLink>
        </div>


        <Hamburger open={open} onClick={toggleMenu} />
      </nav>

      
    </>
  );
}

export default Navbar;

