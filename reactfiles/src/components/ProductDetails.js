import React, {useState, useContext} from 'react'
import {useRouteMatch} from "react-router-dom";
import {Row, Col, Image, Button} from 'react-bootstrap'
//import PRODUCTS from '../products'
import NotFound from './pages/NotFound';
import AppContext from '../context'

function ProductDetails(props){

    const context = useContext(AppContext)

    //filter the Array and get the product that we are displaying details for
    let ProdArray = Object.values(props.product)

    const match = useRouteMatch()

    if(match){
        ProdArray = ProdArray.filter(prod => {
            return String(prod.id) === match.params.id
        })
    }

    let prod = ProdArray[0]

    //Changing the picture using React State 
    const [ind, setPicInd] = useState(1);

    if(prod === undefined){
        return(
            <NotFound/>
        )
    }


    return(
        <div className="flex" style={{height: '100vh'}}>
            <br/>
            <br/>
            <br/>
            <h1>{prod.name}</h1>
            <Row>
                <Col md={8} style={{textAlign: 'left'}}>
                    <h2 className="pl-5">${prod.price}</h2>
                    <p className="p-5 text-justify">
                        {prod.description}
                    </p>
                    
                    <Button 
                        variant="warning"
                        onClick={() => context.addToCart(prod.id)}>
                        Add to Cart
                    </Button>
                </Col> 
                <Col md={4}>
                    <Row>
                        <Image src={"/media/products/" + prod.filename + "-" + ind + ".png"} fluid rounded/>
                    </Row>
                    <Row style={{display: 'flex', float: 'left'}}>
                        <Col sm={1} className="m-2">
                            <Image width="50rem" src={"/media/products/" + prod.filename + "-1.png"} className="border p-0" onMouseOver={() => setPicInd(1)} onMouseOut={() => setPicInd(1)}/>
                        </Col>
                        <Col sm={1} className="m-2">
                            <Image height="50rem" src={"/media/products/" + prod.filename + "-2.png"} className="border p-0" onMouseOver={() => setPicInd(2)} onMouseOut={() => setPicInd(1)}/>
                        </Col>
                        <Col sm={1} className="m-2">
                            <Image height="50rem" src={"/media/products/" + prod.filename + "-3.png"} className="border p-0" onMouseOver={() => setPicInd(3)} onMouseOut={() => setPicInd(1)}/>
                        </Col>
                        <Col sm={1} className="m-2">
                            <Image height="50rem" src={"/media/products/" + prod.filename + "-4.png"} className="border p-0" onMouseOver={() => setPicInd(4)} onMouseOut={() => setPicInd(1)}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
            
            
        </div>
    )
}

export default ProductDetails