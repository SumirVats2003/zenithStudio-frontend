import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import './CreateContest.css'

const CreateContest = () => {
  const [formData, setFormData] = useState({
    contestName: '',
    description: '',
    timeDuration: '',
    startTime: '',
    endTime: '',
    prize: '',
    createdBy: localStorage.getItem('authToken'),
    testCases: [{ input: '', expectedOutput: '' }],
    examples: [{ input: '', output: '', explanation: '' }],
    tags: [''],
    hints: [''],
  })

  const handleChange = e => {
    const { name, value } = e.target
    let updatedData = { ...formData, [name]: value }

    // Automatically calculate the end time based on start time and duration
    if (name === 'startTime' || name === 'timeDuration') {
      const startTime = new Date(updatedData.startTime)
      const duration = parseInt(updatedData.timeDuration, 10)

      if (startTime && !isNaN(duration)) {
        const endTime = new Date(startTime.getTime() + duration * 60000)
        updatedData.endTime = endTime.toISOString().slice(0, 16) // Format to 'YYYY-MM-DDTHH:MM'
      }
    }

    setFormData(updatedData)
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
        `${import.meta.env.VITE_API_URL}/api/contests/upload`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      )
      if (response.ok) {
        alert('Contest created successfully!')
        setFormData({
          contestName: '',
          description: '',
          timeDuration: '',
          startTime: '',
          endTime: '',
          prize: '',
          createdBy: 'user123',
          testCases: [{ input: '', expectedOutput: '' }],
          examples: [{ input: '', output: '', explanation: '' }],
          tags: [''],
          hints: [''],
        })
      } else {
        alert('Error creating contest.')
      }
    } catch (error) {
      console.error('Error creating contest:', error)
      alert('Error creating contest.')
    }
  }

  return (
    <>
      <Navbar pgvisible={true} arvisible={true} bgvisible={true} />
      <div className='create-contest-container'>
        <div className='left-section'>
          <h1>Create New Contest</h1>
          <form onSubmit={handleSubmit}>
            <label>
              Contest Name:
              <input
                type='text'
                name='contestName'
                value={formData.contestName}
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
                rows='5'
              />
            </label>
            <label>
              Start Time:
              <input
                type='datetime-local'
                name='startTime'
                value={formData.startTime}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Time Duration (in minutes):
              <input
                type='number'
                name='timeDuration'
                value={formData.timeDuration}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              End Time:
              <input
                type='datetime-local'
                name='endTime'
                value={formData.endTime}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Prize:
              <input
                type='text'
                name='prize'
                value={formData.prize}
                onChange={handleChange}
                required
              />
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
            <button type='submit'>Create Contest</button>
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
                    rows='3'
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

export default CreateContest
