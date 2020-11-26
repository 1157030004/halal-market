import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import { listOrders } from '../actions/orderActions'


const OrderListScreen = ({history}) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    useEffect(() =>{
      if(userInfo && userInfo.isAdmin){
        dispatch(listOrders())
      }else{
        history.push('/login')
      }
        
    }, [dispatch, userInfo ,history])

    return (
        <div className="userList__container">
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message severity="error">{error}</Message>
            : (
                <TableContainer component={Paper}>
                    <Table className="userList__table" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="right">User</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell align="right">Paid</TableCell>
                            <TableCell align="right">Delivered</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {orders.map((order) => (
                            <TableRow key={order._id}>
                                <TableCell component="th" scope="row">
                                    {order._id}
                                </TableCell>
                                <TableCell align="right">{order.user && order.user.name}</TableCell>
                                <TableCell align="right">{order.createdAt.substring(0,10)}</TableCell>
                                <TableCell align="right">${order.totalPrice}</TableCell>
                                <TableCell align="right">{order.isPaid ? order.paidAt.substring(0,10) : (
                                    <CancelRoundedIcon />
                                ) }</TableCell>
                                <TableCell align="right">{order.isDelivered ? order.deliveredAt : (
                                    <CancelRoundedIcon />
                                ) }</TableCell>
                                <TableCell align="right">
                                    <Link to={`/order/${order._id}`}>
                                        <IconButton aria-label="order" color="primary"><BorderColorRoundedIcon /></IconButton>
                                    </Link>
                                    
                                </TableCell> 
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
    </TableContainer>
            )}
        </div>
    )
}

export default OrderListScreen
