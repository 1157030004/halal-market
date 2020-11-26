import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import { addToCart, removeFromCart } from "../actions/cartActions"
import "./CartScreen.css"
import { Button, Box, Select } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split("=")[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart
    console.log(cartItems)

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push("/login?redirect=shipping")
    }

    return (
        <div className="cartScreen">
            <div className="cartScreen__left">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? <Message>Your cart is empty <Link to="/">Go Back</Link></Message> : (
                    <div className="cartScreen__leftList">
                        {cartItems.map(item => (
                            <div className="cartScreen__items">

                                <Box className="cartScreen__item">
                                    <div >
                                        <img src={item.image} alt={item.name} style={{ width: "150px" }}></img>
                                    </div>
                                </Box>
                                <Box className="cartScreen__item">
                                    <div >
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                </Box>
                                <Box className="cartScreen__item">
                                    <div >${item.price}</div>
                                </Box>

                                <Box className="cartScreen__item">
                                    <div >
                                        <Select labelId="label" id="select" value={item.qty} onChange={(e) =>
                                            dispatch(addToCart(item.product, Number(e.target.value)))}>

                                            {
                                                [...Array(item.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                        </Select>
                                    </div>
                                </Box>
                                <Box className="cartScreen__item">
                                    <div >
                                        <Button variant="contained" color="default" component="span" onClick={() => removeFromCartHandler(item.product)}>
                                            <DeleteIcon></DeleteIcon>
                                        </Button>
                                    </div>
                                </Box>

                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="cartScreen__right">
                <Box className="cartScreen__item">
                    <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                    <h3> ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)} </h3>
                </Box>
                <Box className="cartScreen__item">
                    <Button variant="contained" color="secondary" component="span" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                        Checkout
                    </Button>
                </Box>

            </div>
        </div>
    )
}

export default CartScreen
