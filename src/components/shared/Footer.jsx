import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

function Footer() {
  return (
    <footer className="footer p-10 bg-royalPurple dark:bg-base-300 text-base-100 dark:text-base-content">
      <div>
        <Link to="/">
          <div className="flex">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <span className="font-lobster text-2xl text-base-100 dark:text-royalPurple">
              Champion<span className="text-platinum">Academy</span>
            </span>
          </div>
        </Link>
        Copyright © 2023 - All right reserved
      </div>
      <div>
        <span className="footer-title">Services</span>
        <a className="link link-hover">Teach on Champion</a>
        <a className="link link-hover">Get the app</a>
        <a className="link link-hover">Affiliate</a>
        <a className="link link-hover">Help & Support</a>
      </div>
      <div>
        <span className="footer-title">Company</span>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact</a>
        <a className="link link-hover">Careers</a>
        <a className="link link-hover">Blog</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </div>
    </footer>
  );
}

export default Footer;
