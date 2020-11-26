import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import "./RegisterScreen.css"
import { Button,  Input } from '@material-ui/core'
import './ProductEditScreen.css'
import { listProductDetails, updateProduct } from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id
    
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate  } = productUpdate


    useEffect(() => {
        if(successUpdate){
            dispatch({type: PRODUCT_UPDATE_RESET})
            history.push('/admin/productlist')
        }else{
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            }else{
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
            
        }, [dispatch, history, productId, product, successUpdate])

    const uploadFileHandler = async (e) =>{
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config= {
                headers:{
                'Content-Type': 'multipart/form-data'
            }
        }
        const { data } = await axios.post('/api/upload', formData, config)

        setImage(data)
        setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
            
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        }))
        
    }

    return (
        <div className="userEdit__container">
            <div><Link to="/admin/productlist" className="goback">Go Back</Link></div>
            <div className="userEdit__form">
            <FormContainer>
                <h2>Edit Product</h2>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message severity="error">{errorUpdate}</Message>}
                {loading ? < Loader /> : error ? <Message severity="error">{error}</Message> : (
                <ValidatorForm onSubmit={submitHandler}>
                <TextValidator
                label="Product Name"
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
            ></TextValidator>

            <TextValidator
                label="Price"
                onChange={(e) => setPrice(e.target.value)}
                name="price"
                value={price}
             ></TextValidator>

            <TextValidator
                label="Image"
                onChange={(e) => setImage(e.target.value)}
                name="image"
                value={image}
             > 
             </TextValidator>
             <Input   
                    id="upload-photo"  
                    name="upload-photo"  
                    type="file"
                    onChange={uploadFileHandler}
                    inputProps={{ multiple: true }}
                >
                    {uploading && <Loader />}
                </Input>

             <TextValidator
                label="Brand"
                onChange={(e) => setBrand(e.target.value)}
                name="brand"
                value={brand}
             ></TextValidator>

            <TextValidator
                label="Count In Stock"
                onChange={(e) => setCountInStock(e.target.value)}
                name="countInStock"
                value={countInStock}
             ></TextValidator>

            <TextValidator
                label="Category"
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                value={category}
             ></TextValidator>

            <TextValidator
                label="Description"
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                value={description}
             ></TextValidator>

            <br />
            <Button
                color="secondary"
                variant="contained"
                type="submit"  
                >
                Update
            </Button>
        </ValidatorForm>
                )}
        </FormContainer>
        </div>
        </div>
    )
}

export default ProductEditScreen
