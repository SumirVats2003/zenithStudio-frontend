import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './UploadPage.css'

const UploadPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    constraints: '',
    testCases: [{ input: '', expectedOutput: '' }],
    examples: [{ input: '', output: '', explanation: '' }],
    tags: [''],
    hints: [''],
    difficulty: 'EASY',
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleTestCaseChange = (index, e) => {
    const { name, value } = e.target
    const newTestCases = [...formData.testCases]
    newTestCases[index][name] = value
    setFormData(prevData => ({
      ...prevData,
      testCases: newTestCases,
    }))
  }

  const handleExampleChange = (index, e) => {
    const { name, value } = e.target
    const newExamples = [...formData.examples]
    newExamples[index][name] = value
    setFormData(prevData => ({
      ...prevData,
      examples: newExamples,
    }))
  }

  const handleAddTestCase = () => {
    setFormData(prevData => ({
      ...prevData,
      testCases: [...prevData.testCases, { input: '', expectedOutput: '' }],
    }))
  }

  const handleAddExample = () => {
    setFormData(prevData => ({
      ...prevData,
      examples: [
        ...prevData.examples,
        { input: '', output: '', explanation: '' },
      ],
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/problems/upload`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )
      if (response.ok) {
        alert('Problem uploaded successfully!')
        setFormData({
          title: '',
          description: '',
          constraints: '',
          testCases: [{ input: '', expectedOutput: '' }],
          examples: [{ input: '', output: '', explanation: '' }],
          tags: [''],
          hints: [''],
          difficulty: 'EASY',
        })
      } else {
        alert('Error uploading problem.')
      }
    } catch (error) {
      console.error('Error uploading problem:', error)
      alert('Error uploading problem.')
    }
  }

  return (
    <>
      <Navbar pgvisible={true} arvisible={true} bgvisible={true} />
      <div className='upload-page-container'>
        <div className='left-section'>
          <h1>Upload New Problem</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                required
                rows='10'
              />
            </label>
            <label>
              Constraints:
              <textarea
                name='constraints'
                value={formData.constraints}
                onChange={handleChange}
                required
                rows='5'
              />
            </label>
            <label>
              Difficulty:
              <select
                name='difficulty'
                value={formData.difficulty}
                onChange={handleChange}
                required
              >
                <option value='EASY'>Easy</option>
                <option value='MEDIUM'>Medium</option>
                <option value='HARD'>Hard</option>
              </select>
            </label>
            <label>
              Tags:
              <input
                type='text'
                name='tags'
                value={formData.tags.join(', ')}
                onChange={e =>
                  setFormData(prevData => ({
                    ...prevData,
                    tags: e.target.value.split(',').map(tag => tag.trim()),
                  }))
                }
              />
            </label>
            <label>
              Hints:
              <input
                type='text'
                name='hints'
                value={formData.hints.join(', ')}
                onChange={e =>
                  setFormData(prevData => ({
                    ...prevData,
                    hints: e.target.value.split(',').map(hint => hint.trim()),
                  }))
                }
              />
            </label>
            <button type='submit'>Upload Problem</button>
          </form>
        </div>
        <div className='right-section'>
          <div className='test-case-section'>
            <h3>Test Cases</h3>
            {formData.testCases.map((testCase, index) => (
              <div key={index}>
                <label>
                  Input:
                  <input
                    type='text'
                    name='input'
                    value={testCase.input}
                    onChange={e => handleTestCaseChange(index, e)}
                    required
                  />
                </label>
                <label>
                  Expected Output:
                  <input
                    type='text'
                    name='expectedOutput'
                    value={testCase.expectedOutput}
                    onChange={e => handleTestCaseChange(index, e)}
                    required
                  />
                </label>
              </div>
            ))}
            <button
              type='button'
              className='add-button'
              onClick={handleAddTestCase}
            >
              Add Test Case
            </button>
          </div>
          <div className='example-section'>
            <h3>Examples</h3>
            {formData.examples.map((example, index) => (
              <div key={index}>
                <label>
                  Input:
                  <input
                    type='text'
                    name='input'
                    value={example.input}
                    onChange={e => handleExampleChange(index, e)}
                    required
                  />
                </label>
                <label>
                  Output:
                  <input
                    type='text'
                    name='output'
                    value={example.output}
                    onChange={e => handleExampleChange(index, e)}
                    required
                  />
                </label>
                <label>
                  Explanation:
                  <textarea
                    name='explanation'
                    value={example.explanation}
                    onChange={e => handleExampleChange(index, e)}
                    required
                    rows='5'
                  />
                </label>
              </div>
            ))}
            <button
              type='button'
              className='add-button'
              onClick={handleAddExample}
            >
              Add Example
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UploadPage
