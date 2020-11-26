import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({history, match}) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, pages, page } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete  } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct  } = productCreate    

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() =>{
        dispatch({ type: PRODUCT_CREATE_RESET})

      if(!userInfo.isAdmin){
        history.push('/login')
      }

      if(successCreate){
          history.push(`/admin/product/${createdProduct._id}/edit`)
      }else{
          dispatch(listProducts('', pageNumber))
      }
        
    }, [dispatch, userInfo ,history, successDelete, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) =>{
      if(window.confirm('Are you sure?')){
        dispatch(deleteProduct(id))
      }
    }

    const createProductHandler = () =>{
        dispatch(createProduct())
    }

    return (
        <div className="userList__container">
            <TableRow>
                <TableCell><h1>Products</h1></TableCell>
                <TableCell><IconButton color="primary" onClick={createProductHandler}>
                    <AddIcon/> Create Product
                    </IconButton></TableCell>
            </TableRow>
            {loadingDelete && <Loader />}
            {errorDelete && <Message severity="error">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message severity="error">{errorCreate}</Message>}
            {loading ? <Loader /> : error ? <Message severity="error">{error}</Message>
            : (
                <>
            <TableContainer component={Paper}>
                <Table className="userList__table" aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Category</TableCell>
                        <TableCell align="right">Brand</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell component="th" scope="row">
                            {product._id}
                            </TableCell>
                            <TableCell align="right">{product.name}</TableCell>
                            <TableCell align="right">${product.price}</TableCell>
                            <TableCell align="right">{product.category}</TableCell>
                            <TableCell align="right">{product.brand}</TableCell>
                            <TableCell align="right">
                            <Link to={`/admin/product/${product._id}/edit`}>
                                <IconButton aria-label="delete" color="primary"><BorderColorRoundedIcon /></IconButton>
                            </Link>
                            <IconButton aria-label="delete" color="primary" onClick={() => deleteHandler(product._id)}><DeleteIcon /></IconButton>
                            </TableCell>
                            
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            <Paginate pages={pages} page={page} isAdmin={true}/>
            </>
            )}
        </div>
    )
}

export default ProductListScreen
