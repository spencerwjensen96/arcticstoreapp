import React from 'react'
import axios from 'axios'
import AppContext from './context'
import App from './App'
import produce from 'immer'

/** The context provider for our app */
export default class AppProvider extends React.Component {

    constructor(props) {
        super(props)

        this.actions = {
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            getCartTotal: this.getCartTotal,
            clearCart: this.clearCart,
        }
        this.state = {
            categories: {},
            products: {},
            cart: {},
            cartCount: 0,
            cartTotal: 0,
        }
    }

    clearCart = () => {
        this.setState(state => produce(state, draft => {
            draft.cart = {}
            draft.cartCount = 0
            draft.cartTotal = 0
        }))
        return
    }

    getCartTotal = () => {
        return this.state.cartTotal
    }

    removeFromCart = (id) => {
        this.setState(state => produce(state, draft => {
            if(draft.cart[id]){

                draft.cartCount -= draft.cart[id];
                delete draft.cart[id];

            }
            // draft.cartCount = 0;
            // for(let q in Object.values(draft.cart)){
            //     draft.cartCount += q;
            // }
        }))
    }

    addToCart = (id) => {
        this.setState(state => produce( state, draft => {
            //console.log(state.cart);
            if(!draft.cart[id]){
                draft.cart[id] = 1
                draft.cartCount += 1
                //console.log('added product to cart')
            }
            else{
                draft.cart[id] += 1
                draft.cartCount += 1
                //console.log('added 1 to quantity')
            }
            
        }))
        //console.log(this.state.cart)
    }

    render() {
        return (
            <AppContext.Provider value={{...this.state, ...this.actions}}>
                <App />
            </AppContext.Provider>
        )
    }

    async componentDidMount() {
        const resp = await axios.get('http://localhost:8000/api/category')
        const resp2 = await axios.get('http://localhost:8000/api/product')
        
        this.setState({categories: resp.data})
        this.setState({products: resp2.data})
    }

}