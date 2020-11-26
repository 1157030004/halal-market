import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import "./HomeScreen.css"
import Product from "../components/Product"
import { useDispatch, useSelector } from "react-redux"
import { listProducts } from "../actions/productActions"
import Message from "../components/Message"
import Loader from "../components/Loader"
import Paginate from "../components/Paginate"
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { Button } from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products , pages, page} = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))

    }, [dispatch, keyword, pageNumber])

    return (
        <>
        <Meta />
        <div className="homeScreen">
            {!keyword ? <ProductCarousel/> : <Link to="/">
                <Button
                        variant="contained"
                        color="primary"
                        startIcon={<KeyboardBackspaceIcon />}
                >
                    Go back
                </Button>
                </Link> }
            <h1>Latest Products</h1>
            { loading ? <Loader /> : error ? <Message severity="error">{error}</Message> : 
            
            <div className="storeFront__row">
                {products.map(product => (
                    <div key={product._id} className="storeFront__col">
                        <Product product={product} />
                    </div>

                ))}
            </div>}

            <div className="home__paginate">
                   <Paginate 
                   pages={pages} 
                   page={page} 
                   keyword={keyword ? keyword: ''}/> 
            </div>
        </div>
        </>
    )
}

export default HomeScreen
