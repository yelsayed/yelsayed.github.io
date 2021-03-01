import {graphql, Link} from "gatsby";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons'

let LocalStorage;

if (typeof window !== 'undefined') {
    LocalStorage = localStorage;
} else {
  LocalStorage = {
    getItem: () => {},
    setItem: () => {}
  }
}

const Nav = ({ title }) => {
  const [initial, setInitial] = useState(true)
  const [pageColor, setPageColor] = useState(LocalStorage.getItem('color'));

  useEffect(() => {
    if (initial) {
      toggle({color: pageColor});
      setInitial(false);
    }
  }, [pageColor, initial])

  const toggle = useCallback(({color}) => {
    const html = document.getElementsByTagName('html')[0];
    if (color)
      html.dataset.color = color;
    else {
      const newColor = pageColor  === 'dark' ? 'light' : 'dark';
      html.dataset.color = newColor;
      LocalStorage.setItem('color', newColor);
      setPageColor(newColor);
    }
  }, [pageColor])

  const toggleIcon = useMemo(() => (
    pageColor === 'dark' ? <FontAwesomeIcon icon={faSun}/> : <FontAwesomeIcon icon={faMoon}/>
  ), [pageColor])

  return (
    <nav
      style={{
        padding: "20px 30px",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Link className="header-link-home" to="/">
        {title}
      </Link>
      <button className="toggle-dark-light" onClick={toggle}> {toggleIcon} </button>
    </nav>
  )
}

export default Nav;