import React from 'react'
import {loadStripe} from '@stripe/stripe-js'
import PaymentForm from './components/PaymentForm'
import { Elements } from '@stripe/react-stripe-js'
import Navbar from './components/Navbar'
import Banner from './components/Banner'
import './App.css'
const pk = 'pk_test_51M6AduSJVCB993v35jS2mZx4sQVOmFgJzbgtkHSLiBcse4l0n3rzWeWkI4DjokyySu5kRdLKiDfuBqO3g6xWiCoH00hhSWmLpM'
const stripePromise = loadStripe(pk)
const App = () => {
  return (
    <div>
    <Navbar/>
    <Banner/>
    <Elements stripe={stripePromise} >
    <PaymentForm/>
    </Elements>
    </div>
  )
}

export default App