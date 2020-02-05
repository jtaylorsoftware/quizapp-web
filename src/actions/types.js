// Types for actions done with authorization & auth reducer
export const Auth = {
  // User has successfully registered, action data contains JWT
  REGISTER_USER: 'REGISTER_USER',
  REGISTER_ERROR: 'REGISTER_ERROR',
  // User has logged in, action data contains JWT
  LOGIN_USER: 'LOGIN_USER',
  LOGIN_ERROR: 'LOGIN_ERROR',
  // Catch-all clear current auth data (usually after user logout/delete)
  CLEAR_AUTH: 'CLEAR_AUTH'
}
export const Dashboard = {
  LOAD_DASHBOARD: 'LOAD_DASHBOARD',
  LOAD_DASHBOARD_ERROR: 'LOAD_DASHBOARD_ERROR',
  CLEAR_DASHBOARD: 'CLEAR_DASHBOARD'
}
// Types for actions that are done through a user (not necessarily related to the reducer)
export const User = {
  // User data received from server, contained in action data
  LOAD_USER: 'LOAD_USER',
  LOAD_USER_ERROR: 'LOAD_USER_ERROR',
  // User has changed their email or password
  CHANGE_USER_INFO: 'CHANGE_USER_INFO',
  CHANGE_USER_INFO_ERROR: 'CHANGE_USER_INFO_ERROR',
  // User deleted
  DELETE_USER: 'DELETE_USER',
  DELETE_USER_ERROR: 'DELETE_USER_ERROR',
  // User deletes one of their quizzes
  DELETE_QUIZ: 'DELETE_QUIZ',
  DELETE_QUIZ_ERROR: 'DELETE_QUIZ_ERROR',
  // Log the user out
  LOGOUT: 'LOGOUT'
}
// Types for actsions done in quiz editor
export const Editor = {
  // User posting a quiz to server
  CREATE_QUIZ: 'CREATE_QUIZ',
  CREATE_QUIZ_ERROR: 'CREATE_QUIZ_ERROR',
  // User sends edited quiz to server
  POST_EDITED_QUIZ: 'POST_EDITED_QUIZ',
  POST_EDITED_QUIZ_ERROR: 'POST_EDITED_QUIZ_ERROR',
  // Loaded quiz to edit
  LOAD_QUIZ: 'LOAD_EDITED_QUIZ',
  LOAD_QUIZ_ERROR: 'LOAD_EDITED_QUIZ_ERROR',
  // Opening quiz editor in edit mode
  EDIT_QUIZ: 'EDIT_QUIZ',
  // Add question to current quiz
  ADD_QUESTION: 'ADD_QUESTION',
  // Removes question from quiz
  REMOVE_QUESTION: 'REMOVE_QUESTION',
  // Add answer to a question
  ADD_ANSWER: 'ADD_ANSWER',
  // Remove answer from question
  REMOVE_ANSWER: 'REMOVE_ANSWER',
  // Change answer
  CHANGE_ANSWER_TEXT: 'CHANGE_ANSWER_TEXT',
  // Change non-answer part of question
  CHANGE_QUESTION: 'CHANGE_QUESTION',
  // Change quiz settings
  CHANGE_TITLE: 'CHANGE_TITLE',
  CHANGE_PUBLIC: 'CHANGE_PUBLIC',
  CHANGE_EXPIRATION: 'CHANGE_EXPIRATION',
  CHANGE_ALLOWED_USERS: 'CHANGE_ALLOWED_USERS',
  // Clear all edited quiz data (usually at the moment when user leaves editor)
  CLEAR_EDITOR: 'CLEAR_EDITOR'
}
export const Quiz = {
  // User getting the quiz form to answer
  LOAD_QUIZ: 'LOAD_ANSWER_FORM',
  LOAD_QUIZ_ERROR: 'LOAD_ANSWER_FORM_ERROR',
  // User submits answers to a quiz
  POST_ANSWERS: 'POST_ANSWERS',
  POST_ANSWERS_ERROR: 'POST_ANSWERS_ERROR',
  CLEAR_QUIZ: 'CLEAR_QUIZ'
}
export const Result = {
  // User loads quiz results
  LOAD_RESULT: 'LOAD_RESULT',
  LOAD_RESULT_ERROR: 'LOAD_RESULT_ERROR',
  CLEAR_RESULT: 'CLEAR_RESULT'
}
export const QuizResults = {
  LOAD_RESULT_LIST: 'LOAD_RESULT_LIST',
  LOAD_RESULT_LIST_ERROR: 'LOAD_RESULT_LIST_ERROR',
  CLEAR_RESULT_LIST: 'CLEAR_RESULT_LIST'
}
export const Alerts = {
  SET_ALERT: 'SET_ALERT',
  CLEAR_ALERT: 'CLEAR_ALERT'
}

export default {
  Alerts,
  Auth,
  Dashboard,
  User,
  Editor,
  Quiz,
  Result,
  QuizResults
}
