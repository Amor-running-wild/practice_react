import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FunctionalInput from './Todo'
import ClassInput from './TodoClass'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClassInput name="Just Do It"></ClassInput>
  </StrictMode>,
)
