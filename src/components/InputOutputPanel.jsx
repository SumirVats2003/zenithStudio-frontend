import React from 'react'
import './InputOutputPanel.css'

const InputOutputPanel = ({ input, setInput, output, handleRunCode }) => {
  return (
    <div className='input-output-panel'>
      <div className='input-container'>
        <textarea
          className='input-box'
          placeholder='Input'
          value={input}
          onChange={e => setInput(e.target.value)}
        />
      </div>
      <button className='run-code-button' onClick={handleRunCode}>
        Run Code
      </button>
      <div className='output-container'>
        <h4>Output:</h4>
        <pre>{output}</pre>
      </div>
    </div>
  )
}

export default InputOutputPanel
