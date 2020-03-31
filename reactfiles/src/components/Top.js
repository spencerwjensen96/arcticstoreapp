import React, {useContext} from 'react'
import {Navbar, Nav, NavDropdown
    } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import AppContext from '../context'

export default function Top(props){
  const state = useContext(AppContext)

      return(
        <div>
          <Navbar bg="info" expand="lg" className="border">
            <Navbar.Brand><i className="fab fa-artstation"></i>  Arctic General Store</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to="/" style={{textDecoration: 'none', color: 'black', paddingLeft: '1rem', paddingRight: '2rem', margin: 'auto'}}>Home</Link>
                <Link to="/about" style={{textDecoration: 'none', color: 'black', paddingLeft: '1rem', paddingRight: '2rem', margin: 'auto'}}>About</Link>
                <Link to="/help" style={{textDecoration: 'none', color: 'black', paddingLeft: '1rem', paddingRight: '2rem', margin: 'auto'}}>Help</Link>
              </Nav>
              <Nav>
              <Link to="/cart" variant="" style={{textDecoration: 'none', color: 'black', margin: 'auto'}}><i className="fas fa-shopping-cart"></i>({state.cartCount})</Link>
                <NavDropdown title="Welcome, Friend" id="collasible-nav-dropdown" alignRight>
                    <NavDropdown.Item>Login</NavDropdown.Item>
                    <NavDropdown.Item>Sign Up</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      )
  }
