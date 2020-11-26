import React from 'react'
import { Link } from 'react-router-dom'
import "./Product.css"
import Rating from "./Rating"

const Product = ({ product }) => {
    return (
        <div className="product">
            <Link to={`/product/${product._id}`}>
                <img className="product__img" src={product.image} alt="" />
            </Link>

            <div className="product__info">
                <Link to={`/product/${product._id}`}>
                    <h2><strong>{product.name}</strong></h2>
                </Link>
                <h4>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                </h4>
                <h3>${product.price}</h3>
            </div>
        </div>
    )
}

export default Product
