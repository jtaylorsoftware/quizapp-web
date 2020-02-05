import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { changeTitle } from '../../../actions/editor'

const Title = ({ defaultValue, changeTitle, error }) => {
  const [text, setText] = useState(defaultValue)
  const isValid = text.length !== 0
  const shouldDisplayWarning = error && error.status === 400 && !isValid
  const onChange = e => {
    setText(e.target.value)
  }
  const onBlur = () => {
    changeTitle(text)
  }
  return (
    <>
      <div className='row'>
        <div className='col'>
          <label htmlFor='quizTitle'>Quiz Title:</label>
        </div>
      </div>
      <div className='row mb-4'>
        <div className='col'>
          <input
            type='text'
            className={
              'form-control form-control-lg mb-0 ' +
              (shouldDisplayWarning ? ' is-invalid' : '')
            }
            id='quizTitle'
            value={text}
            placeholder={'My Quiz Title...'}
            onChange={onChange}
            onBlur={onBlur}
            minLength={1}
          />
          {shouldDisplayWarning ? (
            <div className='invalid-feedback'>
              Please enter at least one character.
            </div>
          ) : null}
        </div>
      </div>
    </>
  )
}

Title.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  changeTitle: PropTypes.func.isRequired,
  error: PropTypes.object
}

const mapStateToProps = state => ({
  defaultValue: state.editor.quiz.title,
  error: state.editor.error
})

export default connect(mapStateToProps, { changeTitle })(Title)
