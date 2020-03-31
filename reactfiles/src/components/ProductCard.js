import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

function ProductCard (props){
    return(
        <div>
            <Card border="info" className="shadow m-3" style={{ width: '90%'}}>
                <Link to={"/details/" + props.product.id} className="btn btn-info sm position-absolute" style={{left: '66%', opacity: '0.8'}}>Details</Link>
                <Card.Img variant="top" src={"/media/products/" + props.product.filename + "-1.png"} />
                <Card.Header>
                <Card.Title>{props.product.name}</Card.Title>
                <Card.Text>
                    ${props.product.price}
                </Card.Text>
                </Card.Header>
            </Card>
        </div>
    )
    
}

export default ProductCard;