import { useState } from "react"

function InputField(value, placholder, classes, name, id) {
  const [inputValue, setInputValue] = useState(value);
  const [editMode, setEditMode] = useState({status: false, btnValue: 'Read'});
  return (
    <div>
      <input 
        type='text' 
        className={classes || ''} 
        placeholder={placholder || ''} 
        name={name || ''} 
        id={id ? id: crypto.randomUUID()}
        value = {inputValue}
        onChange={(event) => {
          if (editMode) setInputValue(event.target.value);
        }}
      />
      <button
        type='button'
        name={`${name}-btn`}
        value={editMode.btnValue}
        onClick={() => {
          if (editMode) {
            setEditMode({status: false, btnValue: 'Read'});
          } else {
            setEditMode({status: true, btnValue: 'Edit'});
          }
        }}
      >
      </button>
    </div>
  )
}

export { InputField} ;