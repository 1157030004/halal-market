import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import CheckoutSteps from "../components/CheckoutSteps"
import { Link } from 'react-router-dom'
import "./PlaceOrderScreen.css"
import { Box, Button } from '@material-ui/core'
import { createOrder } from "../actions/orderActions"

const PlaceOrderScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    // Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate= useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    
    useEffect(() =>{
        if(success){
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    },[history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="placeOrder__container">
                <div className="placeOrder__left">
                    <div className="placeOrder__item">
                        <h2>Shipping</h2>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address},{cart.shippingAddress.city}{' '}
                            {cart.shippingAddress.postalCode}, {' '}
                            {cart.shippingAddress.country}
                        </p>
                    </div>
                    <br />
                    <div className="placeOrder__item">
                        <h2>Payment Method</h2>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </div>
                    <br />
                    <div className="placeOrder__item">
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? <Message>Your cart is empty</Message>
                            : (
                                <div >
                                    {cart.cartItems.map((item, index) => (
                                        <div className="placeOrder__detail" key={index}>
                                            <Box>
                                                <img src={item.image} alt={item.name} style={{ width: "100px" }}></img>
                                            </Box>
                                            <Box>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Box>
                                            <Box>
                                                {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                                            </Box>
                                        </div>
                                    ))}
                                </div>
                            )}
                    </div>
                </div>
                <div className="placeOrder__right">
                    <h2>Order Summary</h2>
                    <div className="placeOrder__summary">
                        <Box>Items</Box>
                        <Box>${cart.itemsPrice}</Box>
                    </div>
                    <div className="placeOrder__summary">
                        <Box>Shipping</Box>
                        <Box>${cart.shippingPrice}</Box>
                    </div>
                    <div className="placeOrder__summary">
                        <Box>Tax</Box>
                        <Box>${cart.taxPrice}</Box>
                    </div>
                    <div className="placeOrder__summary">
                        <Box>Total</Box>
                        <Box>${cart.totalPrice}</Box>
                    </div>
                    <br />
                    {error && <Message severity="error">{error}</Message>}
                    <Button
                        variant="contained"
                        type="submit"
                        color="secondary"
                        style={{ width: "100px" }}
                        disabled={cart.cartItems === 0}
                        onClick={placeOrderHandler}>
                        Order
                </Button>
                </div>
            </div>
        </div>
    )
}

export default PlaceOrderScreen
