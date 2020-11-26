import './ProfileScreen.css'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import "./RegisterScreen.css"
import { Box, Button, Grid } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { listMyOrders } from "../actions/orderActions"
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }

    }

    return (
        <Grid container className="profile__container">
            <Box>
                <FormContainer>
                    <ValidatorForm onSubmit={submitHandler}>
                        <h2>User Profile</h2>
                        {message && <Message severity='error'>{message}</Message>}
                        {error && <Message severity='error'>{error}</Message>}
                        {success && <Message severity='success'>Profile Updated</Message>}
                        {loading && <Loader />}
                        <TextValidator
                            label="Full Name"
                            onChange={(e) => setName(e.target.value)}
                            name="name"
                            value={name}
                        // validators={['required']}
                        // errorMessages={['this field is required']}
                        ></TextValidator>

                        <TextValidator
                            label="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            value={email}
                        // validators={['required', 'isEmail']}
                        // errorMessages={['this field is required', 'email is not valid']}
                        ></TextValidator>

                        <TextValidator
                            label="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            type="password"
                            value={password}
                        // validators={['required']}
                        // errorMessages={['this field is required']}
                        ></TextValidator>

                        <TextValidator
                            label="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            name="confirmPassword"
                            type="password"
                            value={confirmPassword}
                        // validators={['isPasswordMatch', 'required']}
                        // errorMessages={['password mismatch', 'this field is required']}
                        ></TextValidator>
                        <br />
                        <Button
                            color="secondary"
                            variant="contained"
                            type="submit">
                            Update
                </Button>
                    </ValidatorForm>
                </FormContainer>
            </Box>
            <Box>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message severity="error">
                    {errorOrders}
                </Message> : (
                        <TableContainer component={Paper}>
                        <Table className="myOrder__table" aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Id</TableCell>
                              <TableCell align="right">Date</TableCell>
                              <TableCell align="right">Total</TableCell>
                              <TableCell align="right">Paid</TableCell>
                              <TableCell align="right">Delivered</TableCell>
                              <TableCell align="right"></TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {orders.map((order) => (
                              <TableRow key={order._id}>

                                <TableCell align="right">{order._id}</TableCell>
                                <TableCell align="right">{order.createdAt.substring(0,10)}</TableCell>
                                <TableCell align="right">{order.totalPrice}</TableCell>
                                <TableCell align="right">{order.isPaid ?  order.paidAt.substring(0,10) : (
                                    <CancelRoundedIcon />
                                )}</TableCell>
                                <TableCell align="right">{order.isDelivered ?  order.deliveredAt : (
                                    <CancelRoundedIcon />
                                )}</TableCell>
                                <TableCell align="right"><Link to={ `/order/${order._id}` }>
                                <Button variant="contained" size="small">Details</Button>
                                    </Link></TableCell>                   
                                </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                )}
            </Box>
        </Grid>
    )
}

export default ProfileScreen

