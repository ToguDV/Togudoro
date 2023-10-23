import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Pomodoro from './components/Pomodoro/Pomodoro'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Pomodoro/>
  )
}

export default App
