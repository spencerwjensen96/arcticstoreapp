import React, { useContext } from 'react'
import {Container, Col, Row} from 'react-bootstrap'
import {useRouteMatch} from "react-router-dom";
import ProductCard from '../ProductCard'
import NotFound from '../pages/NotFound'
//import PRODUCTS from '../../products'
import AppProvider from '../../context';

function Home (props){

    const state = useContext(AppProvider)

    let ProdArray = Object.values(state.products)

    const match = useRouteMatch()
    if(match){
        if(match.url !== "/"){
            ProdArray = ProdArray.filter(prod => {
                return String(prod.category) === match.params.slug
            })
            if(ProdArray.length === 0){
                return(
                    <NotFound/>
                )
            }
        }
    }

    return(
        <div>
            <Container>
                <Row>
                <Col>
                    
                    <h1>{/* {state.categories[match.params.slug - 1].title} */} Products Page</h1>
                    <p>We have the best stuff.</p>
                </Col>
                </Row>
                <Row>
                {/* Products filtered deck */}
                    {ProdArray
                    .map((p) => {
                        return (
                            <Col xs={3} key={p.id}>
                                <ProductCard product={p} key={p.id}/>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
        )
};

export default Home;