import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom'
import * as bs from 'react-bootstrap'
import axios from 'axios'
import { Formik, Form, Field} from 'formik'
import AppContext from '../../context'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_aht8e7kdTRZm2ugWS8OUmRCh00gvELhJQR')

const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        backgroundColor: "white",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

function Checkout(props) {

    // we'll add Stripe's Elements component here later
    return (
        <div sytle={{height: '100vh'}}>
            <h1 className="p-5">
                Checkout
            </h1>
            <Elements stripe={stripePromise}>
                <CheckoutController/>
            </Elements>
        </div>
        
        
    )
}
export default Checkout


const CheckoutController = props => {
    const context = useContext(AppContext);
    let history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    return (
        <Formik
            initialValues={{
                name: 'John Doe',
                address1: '123 BYU Ln',
                address2: '',
                city: 'Provo',
                state: 'UT',
                zipcode: '84606',
            }}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {}
                if (values.name === ""){
                    errors.name = 'The name is required'
                }
                if (values.address1 === ""){
                    errors.address1 = 'The address is required'
                }
                if (values.city === ""){
                    errors.city = 'The city is required'
                }
                if (values.state === ''){
                    errors.state = 'The state is required'
                }
                if (values.zipcode === ''){
                    errors.zipcode = 'The zipcode is required'
                }
                console.log('validating', values)
                return errors
            }}
            onSubmit={async (values, actions) => {
                if(context.cartTotal === 0){
                    alert('Add stuff to your cart first!')
                    return
                }
                console.log('submit', values)
                //console.log(values)
                const resp = await axios.post('http://localhost:8000/api/sales/', {
                    name: values.name,
                    address1: values.address1,
                    address2: values.address2,
                    city: values.city,
                    state: values.state,
                    zipcode: values.zipcode,
                    total: (context.cartTotal * 100).toFixed(0),
                    items: context.cart
                })
                console.log(resp.data)
                const result = await stripe.confirmCardPayment(resp.data.client_secret , {
                    payment_method: {
                      card: elements.getElement(CardElement),
                      billing_details: {
                        name: values.name,
                      },
                    }
                  });
                console.log(result)
                if(result.error){
                    console.log(result.error)
                    alert(result.error.message)
                }
                else{
                    context.clearCart();
                    history.push('/receipt')
                }
                
            }}
        >{form => (
            <PaymentForm form={form} st={stripe}/>
        )}</Formik>
    )
}


/**
 * The form layout/html.
 */

const PaymentForm = props => (
    <Form>
        <bs.Row>
            <bs.Col md={6}>
                <bs.Table borderless size="sm" variant="info">
                    <thead><tr className="m-4"><th>Shipping</th></tr></thead>
                    <tbody>
                        <tr className="p-1">
                            <td>
                                <Input disabled={props.form.isSubmitting} title="Name:" name="name" type="text" placeholder="Name"/>
                            </td>
                        </tr>
                        <tr className="p-1">
                            <td>
                                <Input disabled={props.form.isSubmitting} title="Address 1:" name="address1" type="text" placeholder="Address1"/>
                            </td>
                        </tr>
                        <tr className="p-1">
                            <td>
                                <Input disabled={props.form.isSubmitting} title="Address 2:" name="address2" type="text" placeholder="Address2"/>
                            </td>
                        </tr>
                        <tr className="p-1">
                            <td>
                                <Input disabled={props.form.isSubmitting} title="City:" name="city" type="text" placeholder="City"/>
                            </td>
                        </tr>
                        <tr className="p-1">
                            <td>
                                <Input disabled={props.form.isSubmitting} title="State:" name="state" type="text" placeholder="State"/>
                            </td>
                        </tr>
                        <tr className="p-1">
                            <td>
                                <Input disabled={props.form.isSubmitting} title="Zip Code:" name="zipcode" type="text" placeholder="ZipCode"/>
                            </td>
                        </tr>
                    </tbody>
                </bs.Table>
            </bs.Col>
            <bs.Col>
                <bs.Table borderless size="sm" variant="info">
                    <thead><tr className="m-4"><th>Card Information</th></tr></thead>
                    <tbody>
                        <tr>
                            <td>
                                <CardElement options={CARD_ELEMENT_OPTIONS} />
                            </td>
                        </tr>
                    </tbody>
                </bs.Table>
                <h4>Order Total: ${useContext(AppContext).cartTotal.toFixed(2)}</h4>
                
                <bs.Button disabled={!props.st} type="submit" variant="info">
                    {(props.form.isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span></span>)}
                    Submit
                </bs.Button>
            </bs.Col>
        </bs.Row>
        
    </Form>
)


/**
 * A form input.
 *   props.title - the title that shows above the input box
 *   props.type - the type of input (see React Bootstrap Form.Control)
 *   props.placeholder - placeholder text in the input.
 * This component is finished and doesn't need additional work.
 */
const Input = (props) => (
    <Field name={props.name}>{rProps => (
        <bs.Form.Group>
            <bs.Row>
                {/* <bs.Col md={2} style={{alignContent: 'left'}}>
                    {props.title &&
                        <bs.Form.Label>{props.title}</bs.Form.Label>
                    }
                </bs.Col> */}
                <bs.Col className="m-2">
                    <bs.Form.Control
                        type={props.type}
                        placeholder={props.placeholder}
                        disabled={rProps.form.isSubmitting}
                        {...rProps.field}
                        //className="p-1"
                    />
                    {rProps.meta.touched && rProps.meta.error &&
                        <div className="text-danger">{rProps.meta.error}</div>
                    }
                </bs.Col>
            </bs.Row>
        </bs.Form.Group>
    )}</Field>
)