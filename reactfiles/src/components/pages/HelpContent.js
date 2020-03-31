import React from 'react'
import {Button,
    Container, Col, Row, 
    Card} from 'react-bootstrap'

    class HelpHeader extends React.Component{
        render(){
          return(
            <div>
              <header className="App-header"  style={{backgroundColor: "light grey"}}>
                <div>
                  <i className="fas fa-book-open m-3 p-4" style={{
                    fontSize: "10rem",
                    color: "#FAF9F9"
                  }}></i></div>
                <div>
                  <h1>Arctic General Store Help</h1>
                  
                  <h3>Where all your questions and life ambitions get answers!</h3>
                </div>
              </header>
            </div>
          )
        }
      }
      
      class HelpContent extends React.Component{
        render(){
          return (
            <div>
              <HelpHeader/>
              <Container>
                <Row>
                  <Col>
                    <h1>Help Page</h1>
                    <p>This is some other content that we can put on here</p>
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

export default HelpContent;