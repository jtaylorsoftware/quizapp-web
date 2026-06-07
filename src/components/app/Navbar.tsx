import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, Nav, Navbar as BsNavbar } from 'react-bootstrap'

import { logout } from 'store/user/thunks'
import { useAppDispatch, useAppSelector } from 'hooks'

/**
 * Displays the top navigation bar for the site, which is persistent across pages
 */
const Navbar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)

  const logoutToHome = () => {
    dispatch(logout())
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

export default Navbar
