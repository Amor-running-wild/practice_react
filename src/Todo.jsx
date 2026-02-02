import { useState } from 'react';

function FunctionalInput ({name}) {
  const [todos, setTodos] = useState(['Add todos to see here'])
  const [inputValue, setInputValue] = useState('')
  const handleChange = (e) => {
    setInputValue(e.target.value);
  }

  const handleSubmit = () => {
    if (todos[0] === 'Add todos to see here' && todos.length === 1) {
      setTodos([inputValue])
    } else {
       setTodos ((prevTodos) => [...prevTodos, inputValue]);
    }
    setInputValue('');
  }

  return (
    <div>
        <h1>{name}</h1>
        <input
          type='text'
          name='task-input'
          id='task-inupt'
          value={inputValue}
          onChange={(e) => handleChange(e)}
        />
        <button
          type='button'
          onClick={handleSubmit}
        >
            Add Task
        </button>
        <ul>
            {todos.map(todo => (
              <li>{todo}</li>
            ))}
        </ul>
    </div>
  )
}

export default FunctionalInput;