import React, { useContext } from 'react';
import {Col, Row} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Top from './components/Top'
import Left from './components/Left'
import Right from './components/Right'
import Footer from './components/Bottom'
import Home from './components/pages/HomeContent'
import Cart from './components/pages/Cart'
import Checkout from './components/pages/Checkout'
import ProductDetails from './components/ProductDetails'
import AboutContent from './components/pages/AboutContent'
import HelpContent from './components/pages/HelpContent'
import Receipt from './components/pages/Receipt'
import NotFound from './components/pages/NotFound'
import AppContext from './context';


function App() {

  const state = useContext(AppContext)

  return (
    <Router>
      <div className="App">
        {/*top component */}
        <Row>
          <Col>
            <Top />
          </Col>
        </Row>
        {/* left and right components and a switched main cneter content */}
        <Row>
          <Col md={1} className="light border">
            <Left/>
          </Col>
          <Col className="light border">
            <Switch>
              <Route path="/details/:id">
                <ProductDetails product={state.products}/>
              </Route>
              <Route path="/category/:slug">
                <Home product={state.products}/>
              </Route>
              <Route exact path="/cart">
                <Cart id="cart-page"/>
              </Route>
              <Route exact path="/checkout">
                <Checkout/>
              </Route>
              <Route exact path="/receipt">
                <Receipt/>
              </Route>
              <Route exact path="/about">
                <AboutContent/>
              </Route>
              <Route exact path="/help">
                <HelpContent/>
              </Route>
              <Route exact path="/">
                <Home product={state.products}/>
              </Route>
              <Route>
                <NotFound/>
              </Route>
            </Switch>
          </Col>
          <Col md={1} className="light border">
            <Right/>
          </Col>
        </Row>
        {/*footer component */}
        <Row>
          <Col>
          < Footer/>
          </Col>
        </Row>
      </div>
    </Router>
  );
}

export default App;
