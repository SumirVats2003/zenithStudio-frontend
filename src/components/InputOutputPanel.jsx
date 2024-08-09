import React from 'react'

const InputOutputPanel = ({ input, setInput, output, handleRunCode }) => {
  return (
    <div className='input-output-panel'>
      <div className='input-container'>
        <textarea
          placeholder='Input'
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={handleRunCode}>Run Code</button>
      </div>
      <div className='output-container'>
        <h6>Output:</h6>
        <pre>{output}</pre>
      </div>
    </div>
  )
}

export default InputOutputPanel
