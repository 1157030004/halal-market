import { Button, FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import './PaymentScreen.css'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps"
import { ValidatorForm } from 'react-material-ui-form-validator';


const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState('Paypal')


    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <div className="payment">
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <div>
                <ValidatorForm className="form__container" onSubmit={submitHandler}>
                    <RadioGroup className="radio__group" row aria-label="position" name="position" defaultValue="top">
                        <FormControlLabel
                            control={<Radio color="primary" />}
                            label="Paypal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Radio color="primary" />}
                            label="Transfer Bank Mandiri Syariah"
                            id="MandiriSyariah"
                            name="paymentMethod"
                            value="MandiriSyariah"
                            onChange={e => setPaymentMethod(e.target.value)}
                        />

                        <Button variant="contained" type="submit" color="secondary" style={{ width: "100px" }}>
                            Continue
                </Button>
                    </RadioGroup>
                </ValidatorForm>
            </div>
        </div>
    )
}

export default PaymentScreen
