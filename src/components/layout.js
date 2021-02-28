import React from "react"
import Nav from "../components/nav"
import Footer from "../components/footer"


const Layout = ({location, social, title, children}) => {
  return (
    <>
      <Nav title={title}/>
      <div className="global-wrapper">
        <main>{children}</main>
      </div>
      <Footer social={social}/>
    </>
  )
}

export default Layout
