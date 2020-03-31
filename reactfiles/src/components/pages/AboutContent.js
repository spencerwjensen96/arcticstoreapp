import React from 'react'
import {Button,
    Container, Col, Row, 
    Card} from 'react-bootstrap'

class AboutHeader extends React.Component{
    render(){
      return(
        <header className="App-header"  style={{backgroundColor: "light grey"}}>
          <div>
            <i className="far fa-newspaper m-3 p-4" style={{
              fontSize: "10rem",
              color: "#FAF9F9"
            }}></i></div>
          <div>
            <h1>About Arctic General Store</h1>
            
            <h3>Learn all about the best company in the world!</h3>
          </div>
        </header>
      )
    }
  }

  class AboutContent extends React.Component{
    render(){
      return(
        <div>
          <AboutHeader/>
          <Container>
            <Row>
              <Col>
                <h1>About Page</h1>
                <p>Adipisicing velit cillum reprehenderit ullamco ex non cillum ex sint.</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Mollit aute sunt Lorem duis qui. Eiusmod aliqua adipisicing culpa voluptate nostrud ut qui. Ut amet voluptate veniam officia non culpa voluptate pariatur labore deserunt nisi do laboris. Consectetur adipisicing Lorem nulla est elit veniam occaecat ut ex consectetur laboris. Ea fugiat ea qui aliqua voluptate non non. Lorem eu id exercitation commodo eiusmod voluptate proident laboris ut irure elit mollit cillum. Nulla eiusmod id anim deserunt proident minim sint cupidatat anim id exercitation amet.
                    </Card.Text>
                    <Button variant="info">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Esse sit ut labore quis duis tempor enim ut. Incididunt do nulla in duis veniam in ad quis amet ad do velit. Adipisicing aliquip deserunt ex consectetur do adipisicing non laborum voluptate est elit. Id ad aute reprehenderit do qui aliquip pariatur officia quis quis mollit consequat. Exercitation adipisicing sit non et magna dolor.
                    </Card.Text>
                    <Button variant="info">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                      Nostrud Lorem amet sunt aute irure Lorem qui minim dolore. Ea cupidatat tempor laboris aliqua. Reprehenderit voluptate deserunt enim sint minim id exercitation deserunt exercitation eiusmod id. Ad quis aliquip irure id ex. Labore eiusmod dolore ut elit ut enim.
                    </Card.Text>
                    <Button variant="info">Go somewhere</Button>
                  </Card.Body>
                </Card>
             </Col>
            </Row>
            <Row>
              <br></br>
            </Row>
          </Container>
        </div>
      )
    }
  }

export default AboutContent;