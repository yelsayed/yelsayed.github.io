import {Link} from "gatsby";
import React from "react";


const Nav = ({ title }) => {
  return (
    <nav
      style={{padding: "20px 40px"}}
    >
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    </nav>
  )
}

export default Nav;