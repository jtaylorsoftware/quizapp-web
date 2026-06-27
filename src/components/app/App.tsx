import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Register from 'components/user/Register'
import Login from 'components/user/Login'

import QuizEditor from 'components/quiz/editor/QuizEditor'
import Dashboard from 'components/user/dashboard/Dashboard'
import QuizResult from 'components/quiz/result/QuizResult'
import QuizRoute from 'components/routing/QuizRoute'
import QuizCreator from 'components/quiz/editor/QuizCreator'
import ErrorPage from 'components/errors/ErrorPage'

import AlertBar from './AlertBar'
import Navbar from './Navbar'
import Landing from './Landing'
import RequireAuth from 'components/routing/RequireAuth'
import RequireRole from 'components/routing/RequireRole'

const App = () => {
  return (
    <>
      <Navbar />
      <AlertBar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/dashboard'
          element={
            <RequireAuth redirectTo={'/login'}>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path='/quizzes/create'
          element={
            <RequireAuth redirectTo={'/login'}>
              <RequireRole allowedRoles={['teacher']}>
                <QuizCreator />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route
          path='/quizzes/:id/edit'
          element={
            <RequireAuth redirectTo={'/login'}>
              <RequireRole allowedRoles={['teacher']}>
                <QuizEditor />
              </RequireRole>
            </RequireAuth>
          }
        />
        <Route
          path='/quizzes/:id'
          element={
            <RequireAuth redirectTo={'/login'}>
              <QuizRoute />
            </RequireAuth>
          }
        />
        <Route
          path='/results'
          element={
            <RequireAuth redirectTo={'/login'}>
              <QuizResult />
            </RequireAuth>
          }
        />
        <Route element={<ErrorPage status={404} />} />
      </Routes>
    </>
  )
}

export default App
