import React, { useState, useEffect } from 'react'
import * as monaco from 'monaco-editor'
import LanguageSelector from '../components/LanguageSelector'
import Editor from '../components/Editor'
import InputOutputPanel from '../components/InputOutputPanel'
import './Playground.css'
import Navbar from '../components/Navbar'

const Playground = () => {
  // Initialize state from local storage or default values
  const storedCode = localStorage.getItem('code') || '// Start coding here...'
  const storedLanguage = localStorage.getItem('language') || 'javascript'
  const storedFontSize = parseInt(localStorage.getItem('fontSize'), 10) || 14
  const storedWordWrap = JSON.parse(localStorage.getItem('wordWrap')) || true
  const storedTheme = localStorage.getItem('theme') || 'one-dark'

  const [code, setCode] = useState(storedCode)
  const [output, setOutput] = useState('')
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState(storedLanguage)
  const [fontSize, setFontSize] = useState(storedFontSize)
  const [wordWrap, setWordWrap] = useState(storedWordWrap)
  const [theme, setTheme] = useState(storedTheme)

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

    monaco.editor.defineTheme('vs-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {},
    })

    monaco.editor.defineTheme('light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {},
    })

    monaco.editor.setTheme(theme)
  }, [theme])

  useEffect(() => {
    const editorInstance = monaco.editor.create(
      document.getElementById('editor-container'),
      {
        value: code,
        language: language,
        theme: theme,
        fontSize: fontSize,
        wordWrap: wordWrap ? 'on' : 'off',
      },
    )

    editorInstance.onDidChangeModelContent(() => {
      setCode(editorInstance.getValue())
    })

    return () => editorInstance.dispose()
  }, [language, fontSize, wordWrap, theme])

  const handleRunCode = async () => {
    setOutput('Running...')

    const requestBody = {
      clientId: 'f20ac288b8c74e8ca64627ab90d4a2d5',
      clientSecret:
        '217da182de1be8a3e827cfa408957a7dae9e226d33a9d9d5d257d1dafa624d78',
      script: code,
      language: language,
      versionIndex: '3',
      stdin: input,
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/compile`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      )

      const result = await response.json()
      if (result.error) {
        setOutput(`Error: ${result.error}`)
      } else {
        setOutput(
          `Output:\n${result.output}\nMemory: ${result.memory} KB\nCPU Time: ${result.cpuTime} s`,
        )
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`)
    }

    // Save state to local storage
    localStorage.setItem('code', code)
    localStorage.setItem('language', language)
    localStorage.setItem('fontSize', fontSize)
    localStorage.setItem('wordWrap', JSON.stringify(wordWrap))
    localStorage.setItem('theme', theme)
  }

  return (
    <>
      <Navbar />
      <div className='playground-container'>
        <div className='left-column'>
          <LanguageSelector
            language={language}
            setLanguage={setLanguage}
            fontSize={fontSize}
            setFontSize={setFontSize}
            wordWrap={wordWrap}
            setWordWrap={setWordWrap}
            theme={theme}
            setTheme={setTheme}
          />
          <div id='editor-container' className='editor-container'></div>
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
