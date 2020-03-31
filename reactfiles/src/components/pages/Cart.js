import React, { useContext } from 'react'
import {Table, Image, Button, Col, Row} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import AppContext from '../../context'

export default function Cart(props) {
    
    const context = useContext(AppContext)

    let ProdArray = Object.values(context.products)
    //console.log(context)
    //console.log(context.cart)
    ProdArray = ProdArray.filter(p =>{
        return p.id in context.cart
    })
    //console.log(ProdArray)
    //console.log(context.cart.length)
    if(Object.entries(context.cart).length === 0){
        return(
            <div>
                <br></br>
                <br></br>
                <br></br>
                <h1>There is nothing in your cart!</h1>
                <h3>Start shopping!</h3>
                <Link to="/">
                    <Button variant="info">
                        Browse Products
                    </Button>
                </Link>
            </div>
        )
    }

    //let total = 0;

    return(
        <div style={{height: '100vh'}}>
            <h1 className="p-4">Cart</h1>
            <Table id="table" striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {ProdArray.map((p) => {
                        let cnt = 0;
                        
                        for (let i of Object.entries(context.cart)){
                            if(p.id.toString() === i[0]){
                                cnt = i[1];
                            }
                        };
                        
                        let subtotal = p.price * cnt;
                        context.cartTotal += subtotal;
                        //console.log(context.cartTotal)

                        return(
                            <tr key={p.id}>
                                <td id={"image-" + p.id}>
                                    <Image key={p.id} style={{height: '3rem'}} src={"/media/products/" + p.filename + "-1.png"} fluid rounded/>
                                </td>
                                <td id={"name-" + p.id}>{p.name}</td>
                                <td id={"price-" + p.id}>${p.price}</td>
                                <td id={"qty-" + p.id}>{cnt}</td>
                                <td id={"subtotal-" + p.id}>${subtotal.toFixed(2)}</td>
                                <td id={"remove-" + p.id}>
                                    <Button 
                                        key={p.name}
                                        variant="warning" 
                                        onClick={() => context.removeFromCart(p.id)}>
                                        Remove
                                    </Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
                
            </Table>
            <Row id="row2">
                <Col id="total-filler" xs={9}></Col>
                <Col id="total" xs={3}><h1>Total: ${context.cartTotal.toFixed(2)}</h1></Col>
            </Row>
            <Row></Row>
            <Row>
                <Col xs={5}></Col>
                <Col xs={2}> 
                    <Link to="/checkout">
                        <Button variant="info">
                            Checkout
                        </Button>
                    </Link> 
                </Col>
                <Col xs={5}></Col>
            </Row>
            
        </div>
    )
}