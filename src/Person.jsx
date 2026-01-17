import { useState } from "react";

function Person () {
  const [person, setPerson] = useState({firstName: "", lastName: ""})

  return (
  <div>
    <input 
      type='text' 
      name='firstname' 
      placeholder="Haris" 
      onChange={(event) => setPerson({...person, firstName: event.target.value})}
    />
    <input 
      type="text" 
      name='lastname' 
      placeholder="Baig" 
      onChange={(event) => setPerson({...person, lastName: event.target.value})}
    />
  </div>
  )
}

export default Person;