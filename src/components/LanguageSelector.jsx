import React from 'react'

const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <div className='language-selector'>
      <label htmlFor='language'>Language</label>
      <select
        id='language'
        value={language}
        onChange={e => setLanguage(e.target.value)}
      >
        <option value='javascript'>JavaScript</option>
        <option value='typescript'>TypeScript</option>
        <option value='python'>Python</option>
        <option value='java'>Java</option>
        <option value='csharp'>C#</option>
        <option value='cpp'>C++</option>
        <option value='go'>Go</option>
        <option value='ruby'>Ruby</option>
        <option value='php'>PHP</option>
      </select>
    </div>
  )
}

export default LanguageSelector
