import React from 'react'
import userEvent, { type UserEvent } from '@testing-library/user-event'

import '@testing-library/jest-dom'
import { render, screen } from 'util/test-utils'

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

  it('does not reset quiz title after input and blur', async () => {
    const user = userEvent.setup()
    renderForm()
    const title = 'My Quiz'
    const titleInput = screen.getByPlaceholderText(/quiz title.../i)

    await user.type(titleInput, title)
    expect(screen.queryByDisplayValue(title)).not.toBeNull()

    await user.tab()
    expect(screen.queryByDisplayValue(title)).not.toBeNull()
  })

  it('"Public" checkbox is checked by default', () => {
    renderForm()
    const checkbox = screen.getByLabelText(/public/i) as HTMLInputElement
    expect(checkbox.checked).toBe(true)
  })

  it('displays the allowed users list after unchecking "Public"', async () => {
    const user = userEvent.setup()
    renderForm()
    const checkbox = screen.getByLabelText(/public/i) as HTMLInputElement
    await user.click(checkbox)
    expect(checkbox.checked).toBe(false)
    expect(screen.queryByText(/allowed users/i)).not.toBeNull()
  })

  it('keeps the values of allowed users between toggling "Public"', async () => {
    const user = userEvent.setup()
    renderForm()
    const checkbox = screen.getByLabelText(/public/i) as HTMLInputElement
    // uncheck the box
    await user.click(checkbox)
    expect(checkbox.checked).toBe(false)

    // set the usernames
    const usernames = 'username1,username2'
    await user.type(screen.getByPlaceholderText('User1, User2, ...'), usernames)
    expect(screen.queryByDisplayValue(usernames)).not.toBeNull()

    // check the box and uncheck
    await user.click(checkbox)
    await user.click(checkbox)

    // text should still be the same
    expect(screen.queryByDisplayValue(usernames)).not.toBeNull()
  })

  it('can add a MultipleChoice question when clicking "Add Question"', async () => {
    const user = userEvent.setup()
    renderForm()
    await addQuestion(user, 'MultipleChoice')
    expect(
      screen.queryByText(/question \d \(multiple choice\)/i)
    ).not.toBeNull()
  })

  it('can add a FillIn question when clicking "Add Question"', async () => {
    const user = userEvent.setup()
    renderForm()
    await addQuestion(user, 'FillIn')
    expect(
      screen.getByText(/question \d \(fill in the blank\)/i)
    ).not.toBeNull()
  })

  it('can input the answer to a FillIn Question', async () => {
    const user = userEvent.setup()
    renderForm()
    await addQuestion(user, 'FillIn')
    const input = await screen.findByPlaceholderText<HTMLInputElement>(
      'Answer text...'
    )
    const answerText = 'my answer'
    await user.type(input, answerText)
    expect(input.value).toEqual(answerText)
  })

  it('deletes the question when clicking "Delete Question"', async () => {
    const user = userEvent.setup()
    renderForm()
    await addQuestion(user)
    expect(screen.queryByText(/question \d/i)).not.toBeNull()
    await deleteQuestion(user, 0)
    expect(screen.queryByText(/question \d/i)).toBeNull()
  })

  it('adds an answer to a MultipleChoice question when clicking "Add Answer"', async () => {
    const user = userEvent.setup()
    renderForm()
    await addQuestion(user)
    await addAnswerToQuestion(user, 0)
    expect(screen.queryByPlaceholderText(/answer text.../i)).not.toBeNull()
  })

  it('deletes an answer from a MultipleChoice question when clicking "Delete"', async () => {
    const user = userEvent.setup()
    renderForm()
    await addQuestion(user)
    await addAnswerToQuestion(user, 0)
    expect(screen.queryByPlaceholderText(/answer text.../i)).not.toBeNull()
    await deleteAnswer(user, 0)
    expect(screen.queryByPlaceholderText(/answer text.../i)).toBeNull()
  })

  it('retains question text after input and blur', async () => {
    const user = userEvent.setup()
    renderForm()
    await addQuestion(user)

    const question = 'My Question'
    const questionInput = screen.getByPlaceholderText(/question prompt/i)

    await user.type(questionInput, question)
    expect(screen.queryByDisplayValue(question)).not.toBeNull()

    await user.tab()
    expect(screen.queryByDisplayValue(question)).not.toBeNull()
  })

  it('keeps question text in correct order after deleting other questions', async () => {
    const user = userEvent.setup()
    renderForm()

    const questions = [
      'first question',
      'second question',
      'third question',
      'fourth question',
    ]
    const placeholder = /question prompt/i

    // Fill out the question text
    for (let i = 0; i < questions.length; i++) {
      await addQuestion(user)
    }

    let allQuestions = screen.getAllByPlaceholderText(placeholder)
    for (const [ind, input] of allQuestions.entries()) {
      await changeAndBlurInput(user, input, questions[ind])
    }

    // Delete all except first question while checking the others are still correct
    const len = questions.length
    for (let i = 1; i < len; i++) {
      await deleteQuestion(user, 1)
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
    await deleteQuestion(user, 0)
    expect(screen.queryByPlaceholderText(placeholder)).toBeNull()
  })

  it('keeps answer text of MultipleChoice Question in correct order after deleting other answers', async () => {
    const user = userEvent.setup()
    renderForm()
    const answers = [
      'first answer',
      'second answer',
      'third answer',
      'fourth answer',
    ]

    const placeholder = /answer text.../i

    await addQuestion(user)

    // Fill out the answer text
    for (let i = 0; i < answers.length; i++) {
      await addAnswerToQuestion(user, 0)
    }
    let allAnswers = screen.getAllByPlaceholderText(placeholder)
    for (const [ind, input] of allAnswers.entries()) {
      await changeAndBlurInput(user, input, answers[ind])
    }

    // Delete all except first answer while checking the others are still correct
    const len = answers.length
    for (let i = 1; i < len; i++) {
      await deleteAnswer(user, 1)
      answers.splice(1, 1)

      allAnswers = screen.getAllByPlaceholderText(placeholder)
      for (let j = 0; j < allAnswers.length; j++) {
        expect((allAnswers[j] as HTMLInputElement).value).toEqual(answers[j])
      }
    }
    // Check last answer is correct, remove it, and ensure none are left
    expect(screen.queryByDisplayValue(answers[0])).not.toBeNull()
    await deleteQuestion(user, 0)
    expect(screen.queryByPlaceholderText(placeholder)).toBeNull()
  })
})

const addQuestion = async (
  user: UserEvent,
  questionType: QuestionType = 'MultipleChoice'
) => {
  await chooseQuestionType(user, questionType)
  await user.click(screen.getByText('Add Question'))
}

const deleteQuestion = async (
  user: UserEvent,
  index: number
) => {
  await user.click(screen.getAllByText('Delete Question')[index])
}

const addAnswerToQuestion = async (
  user: UserEvent,
  index: number
) => {
  await user.click(screen.getAllByText('Add Answer')[index])
}

const deleteAnswer = async (
  user: UserEvent,
  index: number
) => {
  await user.click(screen.getAllByText('Delete')[index])
}

const changeAndBlurInput = async (
  user: UserEvent,
  input: HTMLElement,
  value: string
) => {
  await user.clear(input)
  await user.type(input, value)
  await user.tab()
}

const chooseQuestionType = async (
  user: UserEvent,
  questionType: QuestionType = 'MultipleChoice'
) => {
  const selector = await screen.findByRole('button', { expanded: false })
  await user.click(selector)
  const dropdownItem = await screen.findByTestId(`dropdown-${questionType}`)
  await user.click(dropdownItem)
}
