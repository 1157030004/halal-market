import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { register } from "../actions/userActions"
import "./RegisterScreen.css"
import { Button } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
        } else {
            dispatch(register(name, email, password))
        }

    }

    return (
        <FormContainer>
            <ValidatorForm onSubmit={submitHandler}>
                <h2>Sign Up</h2>
                {message && <Message severity='error'>{message}</Message>}
                {error && <Message severity='error'>{error}</Message>}
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
                    Register
                </Button>
            </ValidatorForm>

            <div>
                <h5>Have an account? <Link to={redirect ? `/login/redirect=${redirect}`
                    : '/login'}>Login</Link></h5>
            </div>
        </FormContainer>
    )
}

export default RegisterScreen
