import React, { useState, useEffect } from 'react'
import * as monaco from 'monaco-editor'
import LanguageSelector from '../components/LanguageSelector'
import Editor from '../components/Editor'
import InputOutputPanel from '../components/InputOutputPanel'
import './Playground.css'
import Navbar from '../components/Navbar'

const Playground = () => {
  const storedCode = localStorage.getItem('code') || '// Start coding here...'
  const storedLanguage = localStorage.getItem('language') || 'javascript'

  const [code, setCode] = useState(storedCode)
  const [output, setOutput] = useState('')
  const [input, setInput] = useState('')
  const [language, setLanguage] = useState(storedLanguage)

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

      console.log('Response:', response)

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || 'An error occurred')
      }

      const result = await response.json()

      if (result.error) {
        setOutput(`Error: ${result.error}`)
      } else {
        setOutput(
          `Output:\n${result.output}\nMemory: ${result.memory} KB\nCPU Time: ${result.cpuTime} s`,
        )
      }
    } catch (error) {
      console.log('Error:', error)
      setOutput(`Error: ${error.message}`)
    }

    localStorage.setItem('code', code)
    localStorage.setItem('language', language)
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
