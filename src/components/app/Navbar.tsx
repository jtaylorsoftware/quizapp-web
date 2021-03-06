import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect, ConnectedProps } from 'react-redux'
import { Button, Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'

import { logout } from 'store/user/thunks'
import { RootState } from 'store/store'

const mapState = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

const mapDispatch = {
  logout,
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

/**
 * Displays the top navigation bar for the site, which is persistent across pages
 * @param {object} props
 * @param {bool} props.isAuthenticated True if user is logged in and authenticated
 * @param {function} props.logout Function to call to log user out
 */
const Navbar = ({ isAuthenticated, logout }: Props) => {
  const navigate = useNavigate()

  const logoutToHome = () => {
    logout()
    navigate('/')
  }
  return (
    <BsNavbar expand='md' variant='dark'>
      <Container fluid>
        <Link className='navbar-brand' to='/'>
          QuizNow
        </Link>
        <BsNavbar.Toggle aria-controls='navMenu' />
        <BsNavbar.Collapse id='navMenu'>
          <Nav className='ms-auto'>
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to='/quizzes/create'>
                  Create
                </Nav.Link>
                <Nav.Link as={Link} to='/dashboard'>
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  as={Button}
                  variant='link'
                  className='text-start'
                  onClick={logoutToHome}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to='/login'>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to='/register'>
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default connector(Navbar)
