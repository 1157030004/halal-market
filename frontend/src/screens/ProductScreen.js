import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import "./ProductScreen.css"
import { Button, InputLabel, MenuItem, Select, TableRow } from '@material-ui/core'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from "react-redux"
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listProductDetails, createProductReview } from "../actions/productActions"
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import FormContainer from '../components/FormContainer'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const ProductScreen = ({ history, match }) => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate

    useEffect(() => {
        if(successProductReview){
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match, successProductReview])


    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = e =>{
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <>
            {loading ? < Loader /> : error ? <Message severity="error">{error}</Message>
                : (
                    <>
                    <Meta title={product.name} />
                    <div className="product__item">
                        <div className="product__image">
                            <img src={product.image} alt={product.name}></img>
                        </div>

                        <div className="product__left">
                            <h3>{product.name}</h3>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            <h4>{`Price: $${product.price}`}</h4>
                            <p>{product.description}</p>
                        </div>

                        <div className="product__right" role="table">


                            <div className="flex__table__row" role="rowgroup">
                                <InputLabel id="label">Price:</InputLabel>
                                <div className="flex__rowChild" role="cell">${product.price}</div>
                            </div>

                            <div className="flex__table__row" role="rowgroup">
                                <InputLabel id="label">Status:</InputLabel>
                                <div className="flex__rowChild" role="cell">{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</div>
                            </div>

                            {product.countInStock > 0 && (
                                <div className="flex__table__row" role="rowgroup">
                                    <InputLabel id="label">Qty:</InputLabel>
                                    <div className="flex__rowChild" role="cell">
                                        <Select labelId="label" id="select" value={qty} onChange={(e) =>
                                            setQty(e.target.value)}>

                                            {
                                                [...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                        </Select>
                                    </div>
                                </div>
                            )}



                            <div className="add__cart" role="rowgroup">
                                <Button onClick={addToCartHandler} variant="outlined" disabled={product.countInStock === 0}>Add to cart</Button>
                            </div>

                        </div>
                    </div>
                    <div className="review__container">
                        <h2>Reviews</h2>
                        {product.reviews.length === 0 &&  <Message>No Reviews</Message>}
                        <div className="review__list">
                            {product.reviews.map(review => (
                                <div className="review__item" key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>{review.createdAt.substring(0,10)}</p>
                                    <p>{review.comment}</p>
                                </div>
                            ))}
                            <div className="review__maker">
                            <TableRow>
                                <h2>Write a Customer Review</h2>
                                {errorProductReview &&  <Message severity="error">{errorProductReview}</Message>}
                                {userInfo ? (
                                    <FormContainer>
                                        <ValidatorForm onSubmit={submitHandler} variant="outlined">
                                        <InputLabel shrink htmlFor="age-native-label-placeholder">
                                        Rating
                                        </InputLabel>
                                        <Select
                                            labelId="select-rating"
                                            label="Rating"
                                            id="rating"
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}
                                            style={{
                                                border: '1px solid #ced4da',
                                                borderRadius: 4,
                                                backgroundColor: '#f2f2f2'
                                            }}
                                            >
                                            <MenuItem value=''><em>None</em></MenuItem>
                                            <MenuItem value={1}>1 - Poor</MenuItem>
                                            <MenuItem value={2}>2 - Fair</MenuItem>
                                            <MenuItem value={3}>3 - Good</MenuItem>
                                            <MenuItem value={4}>4 - Very Good</MenuItem>
                                            <MenuItem value={5}>5 - Excellent</MenuItem>
                                            </Select>

                                            <InputLabel shrink htmlFor="age-native-label-placeholder">
                                            Comment
                                            </InputLabel>
                                            <TextValidator
                                                label="Write a comment here..."
                                                onChange={(e) => setComment(e.target.value)}
                                                name="comment"
                                                value={comment}
                                                multiline
                                                style={{
                                                    width: '260%',
                                                    borderRadius: 4,
                                                }}
                                            ></TextValidator>
                                            <br/>
                                            <Button
                                                color="secondary"
                                                variant="contained"
                                                type="submit"  
                                                >
                                                Submit
                                            </Button>
                                        </ValidatorForm>
                                    </FormContainer>
                                ) : <Message>Please <Link to="/login"><b>sign in </b></Link>to write a review</Message>}
                            </TableRow>
                            </div>
                        </div>
                    </div>
                    </>
                )}
        </>
    )
}

export default ProductScreen
