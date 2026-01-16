import {useState} from 'react';

const COLORS = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];

function RenderColor() {
  const [backgroundColor, setBackgroundColor] = useState(COLORS[0]);
  const [counter, setCounter] = useState(0);
  const onButtonClick = (color) => () => {
    setBackgroundColor(color);
    setCounter(counter + 1);
  }
  return (
    <div 
    className="App"
    style={{
      backgroundColor,
    }}
    >
      {COLORS.map((color) => (
        <button 
          type = "button"
          key = {color}
          onClick={onButtonClick(color)}
          className={backgroundColor === color ? "selected": ""}
        >
        {color}
        </button>
      ))}
      <button type="button" >{counter}</button>
    </div>
  );
}
export default RenderColor;