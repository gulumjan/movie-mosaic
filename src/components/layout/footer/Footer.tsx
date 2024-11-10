import { FaDiscord, FaInstagram, FaLinkedin, FaVk } from "react-icons/fa";
import scss from "./Footer.module.scss";
import { FaGithub } from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={scss.Footer}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.terms}>
            <h3>Terms of Use</h3>
            <h3>Privacy-Policy</h3>
            <h3>About</h3>
            <h3>FAQ</h3>
          </div>
          <p>
            Movie Mosaic - a unique website providing fascinating information
            about movies and TV shows. Here you can discover all the <br />{" "}
            necessary details about your favorite films, actors, directors,
            ratings, and much more.
          </p>
          <div className={scss.logos}>
            <Link
              href="
https://www.instagram.com/kabylovnaya?igsh=MXg3dXRqZGI4ZW9mYg=="
            >
              <FaInstagram className={scss.logo} />
            </Link>
            <FaDiscord className={scss.logo} />
            <FaVk className={scss.logo} />
            <FaLinkedin className={scss.logo} />
            <FaGithub className={scss.logo} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
