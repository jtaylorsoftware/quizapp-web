import { FillInResponse, MultipleChoiceResponse } from 'api/models'

export type ResponseValue =
  | MultipleChoiceResponse['choice']
  | FillInResponse['answer']
export type OnAnswerChanged = (
  answer: ResponseValue,
  questionIndex: number
) => void
