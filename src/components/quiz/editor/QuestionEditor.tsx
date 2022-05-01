import React from 'react'
import { Row, Col } from 'react-bootstrap'

import MultipleChoiceEditor from './MultipleChoice/QuestionEditor'
import FillInEditor from './Fillin/QuestionEditor'

import { FillInQuestion, MultipleChoiceQuestion, Question } from 'api/models'

type Props = {
  id: string
  label: string
  editing: boolean
  validate: boolean
  value: Question
  onChange: (question: Question) => void
  onRemove: () => void
}

const QuestionBody = (props: Props) => {
  const { value: question, ...rest } = props
  const { type } = question

  if (type === 'FillIn') {
    return <FillInEditor value={question as FillInQuestion} {...rest} />
  } else {
    return (
      <MultipleChoiceEditor
        value={question as MultipleChoiceQuestion}
        {...rest}
      />
    )
  }
}

const QuestionEditor = (props: Props) => {
  return (
    <>
      <Row className='mb-2'>
        <Col>
          <QuestionBody {...props} />
        </Col>
      </Row>
    </>
  )
}

export default QuestionEditor
