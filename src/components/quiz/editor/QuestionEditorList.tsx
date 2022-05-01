import React from 'react'
import { v4 as uuid } from 'uuid'
import QuestionEditor from './QuestionEditor'
import QuestionDeleteButton from './QuestionDeleteButton'
import { Props, questionTypeDisplay } from './QuestionList'

const QuestionEditorList = ({
  editing,
  validate,
  questions,
  onRemove,
  onChange,
}: Props) => {
  return (
    <>
      {questions.map((question, index) => {
        let key: string
        if (question._id) {
          key = question._id
        } else {
          key = uuid()
          question._id = key
        }
        return (
          <div key={key}>
            <QuestionEditor
              id={`question-${index}`}
              label={`Question ${index + 1} (${
                questionTypeDisplay[question.type]
              }):`}
              editing={editing}
              validate={validate}
              value={question}
              onChange={(question) => {
                onChange(index, question)
              }}
              onRemove={() => {
                onRemove(index)
              }}
            />
            <QuestionDeleteButton
              index={index}
              editing={editing}
              onRemove={onRemove}
            />
          </div>
        )
      })}
    </>
  )
}

export default QuestionEditorList
