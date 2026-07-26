import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import FooterLogo from "../assets/logo-dark.svg";
import { FaInstagram, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <footer id="Footer">
        <div className="FooterTop">
          <Link to="/" className="Logo">
            <img src={FooterLogo} alt="Wisemonie logo" />
          </Link>

          <div className="FooterLinks">
            <div className="FooterLinksCol ProductCol">
              <h2 className="FooterHead"> Product</h2>
              <HashLink smooth to="/#how-it-works">
                How It Works
              </HashLink>
              <HashLink smooth to="/#features">
                Features
              </HashLink>
              <HashLink smooth to="/#who-its-for">
                Who Its For
              </HashLink>
              {/* <HashLink smooth to="/#private-beta">How It Works</HashLink> */}
              <HashLink smooth to="/#faq">
                FAQ
              </HashLink>
            </div>

            <div className="FooterLinksCol CompanyCol">
              <h2 className="FooterHead">Company</h2>
              <Link to="/about">About WiseMonie</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <div className="FooterLinksCol LegalCol">
              <h2 className="FooterHead">Legal</h2>
              <Link to="/terms-of-service">Terms Of Service</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>

            <div className="FooterLinksCol FooterSocials">
              <h2 className="FooterHead">Socials</h2>
              <a
                href="https://instagram.com/wisemonie_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram /> @wisemonie_app
              </a>
              <a
                href="https://x.com/wisemonie_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter /> @wisemonie_app
              </a>
              <a
                href="https://whatsapp.com/channel/0029Vb6kU683bbUy3azQF047"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp /> Join Whatsapp Channel
              </a>
            </div>
          </div>
        </div>

        <span className="FooterDivider"></span>

        <div className="FooterBottom">
          <h3 className="FooterMotto">
            Wisemonie. Built on Regulated Nigerian Rails.
          </h3>
          <h3 className="FooterCopyright">
            © 2026 Wisemonie. All Rights Reserved
          </h3>
        </div>
      </footer>
    </>
  );
}

export default Footer;
