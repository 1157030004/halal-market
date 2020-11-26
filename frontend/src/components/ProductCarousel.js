import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import Loader from "./Loader"
import Message from "./Message"
import { listTopProducts } from "../actions/productActions"
import Carousel from 'react-material-ui-carousel'
import {Paper} from '@material-ui/core'
import "./ProductCarousel.css"

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const {loading, error, products} = productTopRated

    useEffect(() =>{
        dispatch(listTopProducts())
    },[dispatch])

    return loading ? <Loader /> : error ? <Message severity='error'>{error}</Message>
    : (
        <Carousel className="carousel__container" autoPlay={true} fullHeightHover={true} interval={3000}>
            {products.map(product =>(
                <div className="carousel__item" key={product._id} item={product} >
                    <Link to={`/product/${product._id}`}>
                        <Paper>
                        <img src={product.image} alt={product.name} ></img>
                        <h2>{product.name}</h2>
                        <p>${product.price}</p>
                        </Paper>
                    </Link>
                </div>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
