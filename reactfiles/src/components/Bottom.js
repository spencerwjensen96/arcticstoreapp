import React from 'react'
import {Navbar, Container} from 'react-bootstrap'

class Footer extends React.Component{
    render(){
      var today = new Date();
  
      return(
        <Navbar bg="info">
          <Container style={{marginLeft: "45%"}}>
            <p> © {today.getFullYear()} Northwest Labs</p>
          </Container>
        </Navbar>
      )
    }
  }

export default Footer;