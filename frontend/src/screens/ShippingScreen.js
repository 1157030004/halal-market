import { Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import './ShippingScreen.css'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({
            address,
            city,
            postalCode,
            country
        }))
        history.push('/payment')
    }

    return (
        <div className="shipping">
            <CheckoutSteps step1 step2 />
            <div>
                <h1>Shipping</h1>
                <ValidatorForm className="form__container" onSubmit={submitHandler}>
                    <TextField className="shipping__input" style={{ width: "195px" }}
                        label="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        name="address"
                        required
                        multiline
                        rows={4}
                        value={address}>
                    </TextField>
                    <TextValidator className="shipping__input"
                        label="City"
                        onChange={(e) => setCity(e.target.value)}
                        name="city"
                        required
                        value={city}>
                    </TextValidator>
                    <TextValidator className="shipping__input"
                        label="Postal Code"
                        onChange={(e) => setPostalCode(e.target.value)}
                        name="postalCode"
                        required
                        value={postalCode}>
                    </TextValidator>
                    <TextValidator className="shipping__input"
                        label="Country"
                        onChange={(e) => setCountry(e.target.value)}
                        name="country"
                        required
                        value={country}>
                    </TextValidator>
                    <Button variant="contained" type="submit" color="secondary" style={{ width: "100px" }}>
                        Continue
                </Button>
                </ValidatorForm>
            </div>
        </div>
    )
}

export default ShippingScreen
