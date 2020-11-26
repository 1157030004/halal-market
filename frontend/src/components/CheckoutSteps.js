import React from 'react'
import './CheckoutSteps.css'
import { Link } from "react-router-dom"
import { Button } from '@material-ui/core'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div className="stepper">
            <div className="step__stone">
                {step1 ? (
                    <Button style={{ textTransform: 'none' }}>
                        <Link to="/login">Sign In</Link>
                    </Button>
                ) : <Button disabled style={{ color: "grey", textTransform: 'none' }}>
                        <Link to="/login">Sign In</Link>
                    </Button>}
            </div>
            <div className="step__stone">
                {step2 ? (
                    <Button style={{ textTransform: 'none' }}>
                        <Link to="/shipping">Shipping</Link>
                    </Button>
                ) : <Button disabled style={{ color: "grey", textTransform: 'none' }}>
                        <Link to="/shipping">Shipping</Link>
                    </Button>}
            </div>
            <div className="step__stone">
                {step3 ? (
                    <Button style={{ textTransform: 'none' }}>
                        <Link to="/payment">Payment</Link>
                    </Button>
                ) : <Button disabled style={{ color: "grey", textTransform: 'none' }}>
                        <Link to="/payment">Payment</Link>
                    </Button>}
            </div>
            <div className="step__stone">
                {step4 ? (
                    <Button style={{ textTransform: 'none' }}>
                        <Link to="/placeorder">Place Order</Link>
                    </Button>
                ) : <Button disabled style={{ color: "grey", textTransform: 'none' }}>
                        <Link to="/placeorder">Place Order</Link>
                    </Button>}
            </div>
        </div>
    )
}

export default CheckoutSteps
