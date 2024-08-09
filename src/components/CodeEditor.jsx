import React, { useState, useEffect } from 'react'
import MonacoEditor from 'react-monaco-editor'
import {
  Box,
  Button,
  TextField,
  Paper,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material'
import * as monaco from 'monaco-editor'
import { ResizableBox } from 'react-resizable'
import Navbar from './Navbar'

const CodeEditor = () => {
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

  const editorOptions = {
    selectOnLineNumbers: true,
    theme: 'one-dark',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 16,
    fontLigatures: true,
    wordWrap: true,
  }

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'row', p: 2 }}>
        <Box sx={{ flex: 1, pr: 2 }} style={{ height: '90vh' }}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                label='Language'
              >
                <MenuItem value='javascript'>JavaScript</MenuItem>
                <MenuItem value='typescript'>TypeScript</MenuItem>
                <MenuItem value='python'>Python</MenuItem>
                <MenuItem value='java'>Java</MenuItem>
                <MenuItem value='csharp'>C#</MenuItem>
                <MenuItem value='cpp'>C++</MenuItem>
                <MenuItem value='go'>Go</MenuItem>
                <MenuItem value='ruby'>Ruby</MenuItem>
                <MenuItem value='php'>PHP</MenuItem>
              </Select>
            </FormControl>
            <MonacoEditor
              width='100%'
              height='90%'
              language={language}
              value={code}
              options={editorOptions}
              onChange={newCode => setCode(newCode)}
            />
          </Paper>
        </Box>

        {/* Right Column - Input and Output */}
        <Box sx={{ flex: 1, pl: 2, display: 'flex', flexDirection: 'column' }}>
          <ResizableBox
            width={Infinity}
            height={200}
            minConstraints={[Infinity, 100]}
            maxConstraints={[Infinity, 400]}
            axis='y'
            handle={<span className='react-resizable-handle' />}
            style={{ marginBottom: '16px' }}
          >
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <TextField
                label='Input'
                multiline
                rows={4}
                variant='outlined'
                fullWidth
                value={input}
                onChange={e => setInput(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: {
                    backgroundColor: '#2c313c',
                    color: '#ffffff',
                    fontFamily: 'JetBrains Mono, monospace',
                  },
                }}
              />
              <Button
                variant='contained'
                color='primary'
                onClick={handleRunCode}
              >
                Run Code
              </Button>
            </Paper>
          </ResizableBox>
          <ResizableBox
            width={Infinity}
            height={300}
            minConstraints={[Infinity, 100]}
            maxConstraints={[Infinity, 500]}
            axis='y'
            handle={<span className='react-resizable-handle' />}
            style={{ marginBottom: '16px' }}
          >
            <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
              <Typography variant='h6' color='primary'>
                Output:
              </Typography>
              <pre
                style={{
                  color: '#abb2bf',
                  fontFamily: 'JetBrains Mono, monospace',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {output}
              </pre>
            </Paper>
          </ResizableBox>
        </Box>
      </Box>
    </>
  )
}

export default CodeEditor
