import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { useAppSelector, useDashboard } from 'hooks'

import UserInfo from './UserInfo'
import Spinner from 'components/common/Spinner'
import QuizList from './QuizList'
import ResultList from './ResultList'

const colSize = {
  sm: 10,
  md: 8,
  lg: 7,
  xl: 6,
}

/**
 * Dashboard for a user that shows their info and quizzes
 */
const Dashboard = () => {
  const user = useAppSelector((state) => state.user)
  const data = useDashboard(user.user)
  return user.loading ? (
    <Spinner />
  ) : (
    <div className='content'>
      <Container fluid className='dashboard'>
        <Row className='pt-1 mt-1'>
          <Col {...colSize} className='dashboard__block mx-auto'>
            <UserInfo />
          </Col>
        </Row>
        {user.user!.role !== 'student' && (
          <Row className='pt-1 mt-1'>
            <Col {...colSize} className='dashboard__block mx-auto'>
              <QuizList
                loading={data.quizzes.loading}
                quizzes={data.quizzes.data ?? []}
              />
            </Col>
          </Row>
        )}
        <Row className='pt-1 mt-1'>
          <Col {...colSize} className='dashboard__block mx-auto'>
            <ResultList
              loading={data.results.loading}
              results={data.results.data ?? []}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Dashboard
