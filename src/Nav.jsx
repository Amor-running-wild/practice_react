function Nav() {
  const buttons = ['Home', 'About', 'Projects', 'Contact'];

  return <ul className="flex">
    {buttons.map((btn) => {
      return btn.startsWith('H') && <li key={btn}><Button text={btn}></Button></li>;
    })} 
  </ul>
  
}

function Button (props) {
  return <button className="btn">{props.text}</button>
}

export default Nav;