import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import * as monaco from 'monaco-editor'
import InputOutputPanel from '../components/InputOutputPanel'
import LanguageSelector from '../components/LanguageSelector'
import './ProblemPage.css'
import Navbar from '../components/Navbar'

const ContestPage = () => {
  const { contestId } = useParams()
  const navigate = useNavigate()
  const [problem, setProblem] = useState(null)
  const [code, setCode] = useState(localStorage.getItem('code') || templateCode)
  const [output, setOutput] = useState('')
  const [input, setInput] = useState('')
  const [fontSize, setFontSize] = useState(
    parseInt(localStorage.getItem('fontSize'), 10) || 14,
  )
  const [wordWrap, setWordWrap] = useState(
    JSON.parse(localStorage.getItem('wordWrap')) || true,
  )
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'one-dark',
  )

  const templateCode = `public class Test {
    public static void main(String[] args) {
        // write your code here
        System.out.println("Hello world");
    }
}\n`

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contests/${contestId}`,
        )
        const data = await response.json()
        setProblem(data)
      } catch (error) {
        console.error('Error fetching problem:', error)
      }
    }

    fetchProblem()
  }, [contestId])

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
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const editorInstance = monaco.editor.create(
      document.getElementById('editor-container'),
      {
        value: code,
        language: 'java',
        theme: theme,
        fontSize: fontSize,
        wordWrap: wordWrap ? 'on' : 'off',
      },
    )

    editorInstance.onDidChangeModelContent(() => {
      setCode(editorInstance.getValue())
    })

    localStorage.setItem('code', code)
    localStorage.setItem('fontSize', fontSize)
    localStorage.setItem('wordWrap', JSON.stringify(wordWrap))

    return () => editorInstance.dispose()
  }, [fontSize, wordWrap, theme])

  const handleRunCode = async () => {
    setOutput('Running all test cases...')
    let allPassed = true
    const results = []

    for (const testCase of problem.testCases) {
      const requestBody = {
        code: code,
        input: testCase.input,
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/execute`,
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
          allPassed = false
          results.push(`Test Case Failed: ${result.error}`)
        } else {
          const output = result.output.trim()
          const expectedOutput = testCase.expectedOutput.trim()

          if (output === expectedOutput) {
            results.push('Test Case Passed')
          } else {
            allPassed = false
            results.push(
              `Test Case Failed: \nExpected: ${expectedOutput}\nGot: ${output}`,
            )
          }
        }
      } catch (error) {
        allPassed = false
        results.push(`Error: ${error.message}`)
      }
    }

    if (allPassed) {
      setOutput('All test cases passed! Problem accepted!')
      await submitSolution()
    } else {
      setOutput(`Some test cases failed:\n\n${results.join('\n\n')}`)
    }
  }

  const submitSolution = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contests/${contestId}/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
            username: localStorage.getItem('authToken'),
          }),
        },
      )

      if (response.ok) {
        alert('Solution submitted successfully!')
      } else {
        alert('Error submitting solution.')
      }
    } catch (error) {
      console.error('Error submitting solution:', error)
      alert('Error submitting solution.')
    }
  }

  const handleLeaderboardClick = () => {
    navigate(`/contests/${contestId}/leaderboard`)
  }

  return (
    <>
      <Navbar pgvisible={true} bgvisible={true} arvisible={true} />
      <div className='problem-page-container'>
        <div className='problem-description'>
          <h1>{problem?.title}</h1>
          <p>{problem?.description}</p>
          <h2>Constraints</h2>
          <p>{problem?.constraints}</p>
          <h2>Examples</h2>
          {problem?.examples.map((example, index) => (
            <div key={index}>
              <p>
                <strong>Input:</strong> {example.input}
              </p>
              <p>
                <strong>Output:</strong> {example.output}
              </p>
              <p>
                <strong>Explanation:</strong> {example.explanation}
              </p>
            </div>
          ))}
          <button
            onClick={handleLeaderboardClick}
            className='leaderboard-button'
          >
            View Leaderboard
          </button>
        </div>
        <div className='problem-editor-container'>
          <LanguageSelector
            fontSize={fontSize}
            setFontSize={setFontSize}
            wordWrap={wordWrap}
            setWordWrap={setWordWrap}
            theme={theme}
            setTheme={setTheme}
          />
          <div id='editor-container' className='editor-container'></div>
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

export default ContestPage
