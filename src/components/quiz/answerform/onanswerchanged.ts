import { FillInResponse, MultipleChoiceResponse, QuestionType } from '../../../api'

export type ResponseValue = MultipleChoiceResponse['choice'] | FillInResponse['answer']
export type OnAnswerChanged =
  (answer: ResponseValue, questionIndex: number) => void
