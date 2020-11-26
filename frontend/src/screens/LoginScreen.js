import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { login } from "../actions/userActions"
import "./LoginScreen.css"
import { Button } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <ValidatorForm onSubmit={submitHandler}>
                <h2>Sign In</h2>
                {error && <Message severity='error'>{error}</Message>}
                {loading && <Loader />}
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
                    value={password}
                // validators={['required']}
                // errorMessages={['this field is required']}
                ></TextValidator>
                <br />
                <Button
                    color="secondary"
                    variant="contained"
                    type="submit">
                    Sign In
                </Button>
            </ValidatorForm>

            <div>
                <h5>New Customer? <Link to={redirect ? `/register/redirect=${redirect}`
                    : '/register'}>Register</Link></h5>
            </div>
        </FormContainer>
    )
}

export default LoginScreen
