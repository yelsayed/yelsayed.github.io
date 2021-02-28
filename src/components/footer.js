import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {faInstagram, faTwitter, faMedium} from "@fortawesome/free-brands-svg-icons";

const Footer = ({social}) => {
  return (
    <footer style={{
      display: "flex",
      justifyContent: "space-between",
    }}>
      <span className="footer-copyright">
        © {new Date().getFullYear()}, Yasser Codes
      </span>
      <span className="footer-social">
        {
          social?.email ? (
            <a href={`mailto:${social.email}`}>
              <FontAwesomeIcon icon={faEnvelope}/>
            </a>
          ) : null
        }

        {
          social?.twitter ? (
            <a href={`https://twitter.com/${social.twitter}`}>
              <FontAwesomeIcon icon={faTwitter}/>
            </a>
          ) : null
        }


        {
          social?.medium ? (
            <a href={`https://${social.medium}.medium.com`}>
              <FontAwesomeIcon
                icon={faMedium}/>
            </a>
          ) : null
        }

        {
          social?.instagram ? (
            <a href={`https://instagram.com/${social.instagram}`}>
              <FontAwesomeIcon icon={faInstagram}/>
            </a>
          ) : null
        }
      </span>
    </footer>
  )
}

export default Footer;