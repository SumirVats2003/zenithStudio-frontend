import React from 'react'
import './LanguageSelector.css'

const LanguageSelector = ({
  language,
  setLanguage,
  fontSize,
  setFontSize,
  wordWrap,
  setWordWrap,
  theme,
  setTheme,
}) => {
  const handleLanguageChange = e => {
    setLanguage(e.target.value)
  }

  const handleFontSizeChange = e => {
    setFontSize(e.target.value)
  }

  const handleWordWrapToggle = () => {
    setWordWrap(!wordWrap)
  }

  const handleThemeChange = e => {
    setTheme(e.target.value)
  }

  return (
    <div className='language-selector'>
      {/* <div className='settings-group'>
        <label htmlFor='language'>Language</label>
        <select id='language' value={language} onChange={handleLanguageChange}>
          <option value='javascript'>JavaScript</option>
          <option value='python'>Python</option>
          <option value='java'>Java</option>
          <option value='csharp'>C#</option>
          <option value='cpp'>C++</option>
          <option value='go'>Go</option>
          <option value='ruby'>Ruby</option>
          <option value='php'>PHP</option>
        </select> 
      </div> */}

      <div className='settings-group'>
        <label htmlFor='font-size'>Font</label>
        <select id='font-size' value={fontSize} onChange={handleFontSizeChange}>
          <option value='12'>12px</option>
          <option value='14'>14px</option>
          <option value='16'>16px</option>
          <option value='18'>18px</option>
        </select>
      </div>

      <div className='settings-group'>
        <label htmlFor='word-wrap'>Wrap</label>
        <input
          type='checkbox'
          id='word-wrap'
          checked={wordWrap}
          onChange={handleWordWrapToggle}
        />
      </div>

      <div className='settings-group'>
        <label htmlFor='theme'>Theme</label>
        <select id='theme' value={theme} onChange={handleThemeChange}>
          <option value='one-dark'>One Dark</option>
          <option value='vs-dark'>Visual Studio Dark</option>
          <option value='light'>Visual Studio Light</option>
        </select>
      </div>
    </div>
  )
}

export default LanguageSelector
