import React from 'react'
import MonacoEditor from 'react-monaco-editor'

const Editor = ({ language, code, setCode }) => {
  const editorOptions = {
    selectOnLineNumbers: true,
    theme: 'one-dark',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 16,
    fontLigatures: true,
    wordWrap: true,
  }

  return (
    <div className='editor-container'>
      <MonacoEditor
        width='100%'
        language={language}
        value={code}
        options={editorOptions}
        onChange={newCode => setCode(newCode)}
      />
    </div>
  )
}

export default Editor
