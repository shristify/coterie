import React, { useState, useEffect } from 'react'
import "./Payment.css";
import './axios'
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
  } from '@stripe/react-stripe-js';
import Axios from 'axios';
  


 
  
  function Payment() {

    const stripe = useStripe();
    const elements = useElements();
  
 const [error,setError]=useState(null)
 const [disabled , setDisabled]=useState(true)  
 const [client , setClient]=useState(true) 
 
 useEffect(() => {
    const getClientSecret=async()=>{
        // const response= await axios
    }
 }, [])
    const handleChange=event=>{
      setDisabled(event.empty)
      setError(event.error? event.error.message:"")
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });
    };
    
    return (
        <div>
            <h1>hey</h1>
            <div className="paymentForm">
            <form onSubmit={handleSubmit}>
      <CardElement onChange={handleChange} />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form></div>
        </div>
    )
}

export default Payment
