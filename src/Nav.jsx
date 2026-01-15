function Nav() {
  return <ul className="flex">
    <li><Button text = "Home"/></li>
    <li><Button text = "About"/></li>
    <li><Button text = "Projects"/></li>
    <li><Button text = "Contact" /></li>
  </ul>
  
}

function Button (props) {
  return <button className="btn">{props.text}</button>
}

export default Nav;