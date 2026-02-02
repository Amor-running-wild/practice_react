import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FunctionalInput from './Todo'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FunctionalInput name='Just Do It'></FunctionalInput>
  </StrictMode>,
)
