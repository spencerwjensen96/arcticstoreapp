import React, { useContext } from 'react'
import {Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
//import PRODUCTS from '../products';
import AppContext from '../context'

      

export default function Left(props){
  
  const state = useContext(AppContext)

  const cat = {}
  for (let c of Object.values(state.categories)){
    cat[c.id] = 0
  }

  for (let p of Object.values(state.products)){
    for (let x in cat){
      if (String(p.category) === x){
        cat[p.category]++
      }
    }
  }
  //console.log(cat)

  return(
    <div> 
      <Nav defaultActiveKey="/home" className="flex-column">
        <Link to="/" className="nav-link">
          All Products ({Object.values(state.products).length})
        </Link>
        <Nav.Item>
          {Object.entries(state.categories).map((c => (
              <Link to={'/category/' + c[1].id} key={c[0]} className="nav-link">
                  {c[1].title} ({cat[c[1].id]})
                
              </Link>
          )))}
        </Nav.Item>
      </Nav>
    </div>
  )

};