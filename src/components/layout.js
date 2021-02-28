import React from "react"
import Nav from "../components/nav"


const Layout = ({ location, title, children }) => {

  return (
    <>
      <Nav title={title}/>
      <div className="global-wrapper">
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Yasser Codes
        </footer>
      </div>
    </>
  )
}

export default Layout
