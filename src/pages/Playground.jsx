import React, { useState, useEffect } from 'react'
import * as monaco from 'monaco-editor'
import LanguageSelector from '../components/LanguageSelector'
import Editor from '../components/Editor'
import InputOutputPanel from '../components/InputOutputPanel'
import './Playground.css'
import Navbar from '../components/Navbar'

const Playground = () => {
  const [code, setCode] = useState('// Start coding here...')
  const [output, setOutput] = useState('')
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState('javascript')

  useEffect(() => {
    monaco.editor.defineTheme('one-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c678dd' },
        { token: 'string', foreground: '98c379' },
        { token: 'number', foreground: 'd19a66' },
        { token: 'delimiter', foreground: 'abb2bf' },
        { token: 'type', foreground: 'e5c07b' },
        { token: 'function', foreground: '61afef' },
        { token: 'variable', foreground: 'e06c75' },
      ],
      colors: {
        'editor.background': '#282c34',
        'editor.foreground': '#abb2bf',
        'editor.lineHighlightBackground': '#2c313c',
        'editorCursor.foreground': '#528bff',
        'editor.selectionBackground': '#3e4451',
        'editor.inactiveSelectionBackground': '#2c313c',
      },
    })

    monaco.editor.setTheme('one-dark')
  }, [])

  const handleRunCode = () => {
    setOutput(`Output:\n${code}\nInput:\n${input}`)
  }

  return (
    <>
      <Navbar />
      <div className='playground-container'>
        <div className='left-column'>
          <LanguageSelector language={language} setLanguage={setLanguage} />
          <Editor
            language={language}
            code={code}
            setCode={setCode}
            className='editor-container'
          />
        </div>
        <div className='right-column'>
          <InputOutputPanel
            input={input}
            setInput={setInput}
            output={output}
            handleRunCode={handleRunCode}
          />
        </div>
      </div>
    </>
  )
}

export default Playground
