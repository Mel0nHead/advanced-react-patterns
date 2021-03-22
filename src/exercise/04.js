import * as React from 'react'
import {Switch} from '../switch'

function callAllFunctions(...fns) {
  return (...args) => {
    fns.forEach(fn => fn(...args))
  }
}

function useToggle() {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)
  const defaultProps = {'aria-pressed': on, onClick: toggle}

  function getTogglerProps({onClick, ...otherProps} = {}) {
    return {
      'aria-pressed': on,
      ...otherProps,
      onClick: onClick ? callAllFunctions(onClick, toggle) : toggle,
    }
  }

  return {on, toggle, getTogglerProps}
}

function App() {
  const {on, getTogglerProps} = useToggle()

  return (
    <div>
      <Switch {...getTogglerProps({on})} />
      <hr />
      <button
        {...getTogglerProps({
          'aria-label': 'custom-button',
          onClick: () => console.info('onButtonClick'),
          id: 'custom-button-id',
        })}
      >
        {on ? 'on' : 'off'}
      </button>
    </div>
  )
}

export default App

/*
eslint
  no-unused-vars: "off",
*/
