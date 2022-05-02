export interface User {
  _id: string
  date: string
  username: string
  email: string
  quizzes: ID[]
  results: ID[]
}

export interface UserRegistration {
  username: string
  email: string
  password: string
}

export interface UserLogin {
  username: string
  password: string
}

export type ID = string

/**
 * Models a response where the data is just an id.
 */
export type IdResult = { id: string }

/**
 * A response containing a JWT.
 */
export type JWT = { token: string }

export type FillInType = 'FillIn'
export type MultipleChoiceType = 'MultipleChoice'
export type QuestionType = FillInType | MultipleChoiceType

export interface MultipleChoiceAnswer {
  _id?: ID
  text: string
}

export type FillInAnswer = string

// An Answer as part of a Quiz as it is submitted (not a form or response).
export type Answer = MultipleChoiceAnswer | FillInAnswer

export interface MultipleChoiceQuestion {
  _id?: ID

  type: MultipleChoiceType

  // The accompanying text that describes the problem a Question wants to be answered.
  text: string

  // The index of the correct answer.
  correctAnswer: number

  // All the possible choices
  answers: MultipleChoiceAnswer[]
}

export interface FillInQuestion {
  _id?: ID

  type: FillInType

  // The accompanying text that describes the problem a Question wants to be answered.
  text: string

  // The expected answer text
  correctAnswer: FillInAnswer
}

export type Question = FillInQuestion | MultipleChoiceQuestion

// Contains all data for a Quiz that a user submits
export interface Quiz {
  _id?: ID
  date: string
  title: string
  user?: string
  allowedUsers: string[]
  questions: Question[]
  results?: Result[]
  isPublic: boolean
  expiration: string
}

// A brief format of a Quiz, shown to a Quiz creator. It includes extra
// computed data such as number of results.
export interface QuizListing {
  _id?: ID
  date: string
  title: string
  user?: string
  isPublic: boolean
  expiration: string
  resultsCount: number
  questionCount: number
}

export interface MultipleChoiceResponse {
  type: MultipleChoiceType
  choice?: number
}

export interface FillInResponse {
  type: FillInType
  answer?: string
}

// An answer as part of a QuizForm that a user is interacting with as they take a Quiz.
export type FormResponse = MultipleChoiceResponse | FillInResponse

export type FormAnswer = Answer

// https://stackoverflow.com/questions/57103834/typescript-omit-a-property-from-all-interfaces-in-a-union-but-keep-the-union-s
type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never

// A question as part of a QuizForm that a user is interacting with as they take a Quiz.
export type FormQuestion = DistributiveOmit<Question, 'correctAnswer'>

// A sanitized Quiz that contains only the data necessary for a user to take the Quiz and submit
// their response.
export interface QuizForm {
  _id: ID
  date: string
  user: string
  title: string
  expiration: string
  questions: FormQuestion[]
}

export type QuizFormat = 'full' | 'form'
export type QuizType<FormatType> = FormatType extends 'full'
  ? Quiz
  : FormatType extends 'form'
  ? QuizForm
  : never

export type QuizListFormat = 'full' | 'listing'
export type QuizListType<FormatType> = FormatType extends 'full'
  ? Quiz[]
  : FormatType extends 'listing'
  ? QuizListing[]
  : never

// A brief format of a Quiz Result, shown to a Quiz creator or taker. It includes extra
// computed data such as the graded score.
export interface ResultListing {
  _id: ID
  date: string
  user: string
  quiz: string
  quizTitle: string
  score: number
  ownerUsername: string
  username: string
}

// A graded FillInAnswer (a Result response)
export interface FillInResult {
  type: FillInType

  // The supplied answer text
  answer: string

  // The actual answer, may exclude to not send as part of Result
  correctAnswer?: string

  // The actual answer, may exclude to not indicate if the Result is graded
  isCorrect?: boolean
}

// A graded MultipleChoiceAnswer (a Result response)
export interface MultipleChoiceResult {
  type: MultipleChoiceType

  // The supplied index of the chosen answer
  choice: number

  // The actual answer, may exclude to not send as part of Result
  correctAnswer?: number

  // The actual answer, may exclude to not indicate if the Result is graded
  isCorrect?: boolean
}

// An Answer as part of a Result, which includes the original submitted choice and,
// optionally, fields indicating if it's correct and the actual correct answer.
export type ResultAnswer = FillInResult | MultipleChoiceResult

// A graded Quiz submission.
export interface Result {
  _id: ID
  date: string
  user: string
  quiz: string
  quizTitle: string
  answers: ResultAnswer[]
  score: number
  ownerUsername: string
  username: string
}

export type ResultFormat = 'full' | 'listing'
export type SingleResultType<FormatType> = FormatType extends 'full'
  ? Result
  : FormatType extends 'listing'
  ? ResultListing
  : never

export type ResultListType<FormatType> = FormatType extends 'full'
  ? Result[]
  : FormatType extends 'listing'
  ? ResultListing[]
  : never
