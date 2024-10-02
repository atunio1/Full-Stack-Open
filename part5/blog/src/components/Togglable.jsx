import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const infoNotVisible = { display: visible ? 'none' : '' }
  const infoVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={infoNotVisible }>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={infoVisible}>
        {props.children}
        <button onClick={toggleVisibility}>{props.cancelButtonLabel}</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  cancelButtonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable