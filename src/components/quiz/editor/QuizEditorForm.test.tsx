import React from 'react'

import '@testing-library/jest-dom'
import { changeInput, fireEvent, render, screen } from 'util/test-utils'

import QuizEditorForm from './QuizEditorForm'
import moment from 'moment'
import { QuestionType } from 'api/models'

const mockQuiz = {
  title: '',
  date: '',
  isPublic: true,
  allowedUsers: [],
  expiration: moment().add(1, 'd').toISOString(),
  questions: [],
}

describe('QuizEditorForm', () => {
  const mockOnSubmit = jest.fn(() => {})
  const mockCancel = jest.fn(() => {})
  const renderForm = (editing?: boolean, validate?: boolean) => {
    render(
      <QuizEditorForm
        defaultValue={mockQuiz}
        cancelSubmit={mockCancel}
        onSubmit={mockOnSubmit}
        editing={editing ?? false}
        validate={validate ?? false}
      />
    )
  }

  beforeEach(() => {
    mockOnSubmit.mockClear()
    mockCancel.mockClear()
  })

  it('renders without crashing', () => {
    renderForm()
  })

  it('does not reset quiz title after input and blur', () => {
    renderForm()
    const title = 'My Quiz'
    const titleInput = screen.getByPlaceholderText(/quiz title.../i)

    fireEvent.change(titleInput, { target: { value: title } })
    expect(screen.queryByDisplayValue(title)).not.toBeNull()

    fireEvent.blur(titleInput)
    expect(screen.queryByDisplayValue(title)).not.toBeNull()
  })

  it('"Public" checkbox is checked by default', () => {
    renderForm()
    const checkbox = screen.getByLabelText(/public/i) as HTMLInputElement
    expect(checkbox.checked).toBe(true)
  })

  it('displays the allowed users list after unchecking "Public"', () => {
    renderForm()
    const checkbox = screen.getByLabelText(/public/i) as HTMLInputElement
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
    expect(screen.queryByText(/allowed users/i)).not.toBeNull()
  })

  it('keeps the values of allowed users between toggling "Public"', () => {
    renderForm()
    const checkbox = screen.getByLabelText(/public/i) as HTMLInputElement
    // uncheck the box
    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)

    // set the usernames
    const usernames = 'username1,username2'
    changeInput('User1, User2, ...', usernames)
    expect(screen.queryByDisplayValue(usernames)).not.toBeNull()

    // check the box and uncheck
    fireEvent.click(checkbox)
    fireEvent.click(checkbox)

    // text should still be the same
    expect(screen.queryByDisplayValue(usernames)).not.toBeNull()
  })

  it('can add a MultipleChoice question when clicking "Add Question"', async () => {
    renderForm()
    await addQuestion('MultipleChoice')
    expect(
      screen.queryByText(/question \d \(multiple choice\)/i)
    ).not.toBeNull()
  })

  it('can add a FillIn question when clicking "Add Question"', async () => {
    renderForm()
    await addQuestion('FillIn')
    expect(
      screen.getByText(/question \d \(fill in the blank\)/i)
    ).not.toBeNull()
  })

  it('can input the answer to a FillIn Question', async () => {
    renderForm()
    await addQuestion('FillIn')
    const input = await screen.findByPlaceholderText<HTMLInputElement>(
      'Answer text...'
    )
    const answerText = 'my answer'
    fireEvent.change(input, { target: { value: answerText } })
    expect(input.value).toEqual(answerText)
  })

  it('deletes the question when clicking "Delete Question"', async () => {
    renderForm()
    await addQuestion()
    expect(screen.queryByText(/question \d/i)).not.toBeNull()
    deleteQuestion(0)
    expect(screen.queryByText(/question \d/i)).toBeNull()
  })

  it('adds an answer to a MultipleChoice question when clicking "Add Answer"', async () => {
    renderForm()
    await addQuestion()
    addAnswerToQuestion(0)
    expect(screen.queryByPlaceholderText(/answer text.../i)).not.toBeNull()
  })

  it('deletes an answer from a MultipleChoice question when clicking "Delete"', async () => {
    renderForm()
    await addQuestion()
    addAnswerToQuestion(0)
    expect(screen.queryByPlaceholderText(/answer text.../i)).not.toBeNull()
    deleteAnswer(0)
    expect(screen.queryByPlaceholderText(/answer text.../i)).toBeNull()
  })

  it('retains question text after input and blur', async () => {
    renderForm()
    await addQuestion()

    const question = 'My Question'
    const questionInput = screen.getByPlaceholderText(/question prompt/i)

    fireEvent.change(questionInput, { target: { value: question } })
    expect(screen.queryByDisplayValue(question)).not.toBeNull()

    fireEvent.blur(questionInput)
    expect(screen.queryByDisplayValue(question)).not.toBeNull()
  })

  it('keeps question text in correct order after deleting other questions', async () => {
    renderForm()

    const questions = [
      'first question',
      'second question',
      'third question',
      'fourth question',
    ]
    const placeholder = /question prompt/i

    // Fill out the question text
    for (const question of questions) {
      await addQuestion()
    }

    let allQuestions = screen.getAllByPlaceholderText(placeholder)
    allQuestions.forEach((input, ind) => {
      changeAndBlurIput(input, questions[ind])
    })

    // Delete all except first question while checking the others are still correct
    const len = questions.length
    for (let i = 1; i < len; i++) {
      deleteQuestion(1)
      questions.splice(1, 1)

      allQuestions = screen.getAllByPlaceholderText(placeholder)
      for (let j = 0; j < allQuestions.length; j++) {
        expect((allQuestions[j] as HTMLInputElement).value).toEqual(
          questions[j]
        )
      }
    }
    // Check last question is correct, remove it, and ensure none are left
    expect(screen.queryByDisplayValue(questions[0])).not.toBeNull()
    deleteQuestion(0)
    expect(screen.queryByPlaceholderText(placeholder)).toBeNull()
  })

  it('keeps answer text of MultipleChoice Question in correct order after deleting other answers', async () => {
    renderForm()
    const answers = [
      'first answer',
      'second answer',
      'third answer',
      'fourth answer',
    ]

    const placeholder = /answer text.../i

    await addQuestion()

    // Fill out the answer text
    answers.forEach(() => addAnswerToQuestion(0))
    let allAnswers = screen.getAllByPlaceholderText(placeholder)
    allAnswers.forEach((input, ind) => {
      changeAndBlurIput(input, answers[ind])
    })

    // Delete all except first answer while checking the others are still correct
    const len = answers.length
    for (let i = 1; i < len; i++) {
      deleteAnswer(1)
      answers.splice(1, 1)

      allAnswers = screen.getAllByPlaceholderText(placeholder)
      for (let j = 0; j < allAnswers.length; j++) {
        expect((allAnswers[j] as HTMLInputElement).value).toEqual(answers[j])
      }
    }
    // Check last answer is correct, remove it, and ensure none are left
    expect(screen.queryByDisplayValue(answers[0])).not.toBeNull()
    deleteQuestion(0)
    expect(screen.queryByPlaceholderText(placeholder)).toBeNull()
  })
})

const addQuestion = async (questionType: QuestionType = 'MultipleChoice') => {
  await chooseQuestionType(questionType)
  fireEvent.click(screen.getByText('Add Question'))
}
const deleteQuestion = (index: number) => {
  fireEvent.click(screen.getAllByText('Delete Question')[index])
}
const addAnswerToQuestion = (index: number) => {
  fireEvent.click(screen.getAllByText('Add Answer')[index])
}
const deleteAnswer = (index: number) => {
  fireEvent.click(screen.getAllByText('Delete')[index])
}
const changeAndBlurIput = (input: HTMLElement, value: string) => {
  fireEvent.change(input, { target: { value } })
  fireEvent.blur(input)
}
const chooseQuestionType = async (
  questionType: QuestionType = 'MultipleChoice'
) => {
  const selector = await screen.findByRole('button', { expanded: false })
  fireEvent.click(selector)
  const dropdownItem = await screen.findByTestId(`dropdown-${questionType}`)
  fireEvent.click(dropdownItem)
}
