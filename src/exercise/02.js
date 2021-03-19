// Compound Components
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {Switch} from '../switch'

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  return React.Children.map(children, child => {
    const isReactComponent = typeof child.type === 'function'
    return React.cloneElement(child, isReactComponent ? {on, toggle} : {})
  })
}

const ToggleOn = ({on, children}) => (on ? <span>{children}</span> : null)

const ToggleOff = ({on, children}) => (on ? null : <span>{children}</span>)

const ToggleButton = ({on, toggle}) => <Switch on={on} onClick={toggle} />

function App() {
  return (
    <div>
      <Toggle>
        <b>dlfkjdfl</b>
        <ToggleOn>The button is on</ToggleOn>
        <ToggleOff>The button is off</ToggleOff>
        <span>Hello</span>
        <ToggleButton />
      </Toggle>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
