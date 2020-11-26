import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { getUserDetails, updateUser } from "../actions/userActions"
import "./RegisterScreen.css"
import { Button, FormControlLabel } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox';
import './UserEditScreen.css'
import { USER_UPDATE_RESET } from "../constants/userConstants"

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success:successUpdate } = userUpdate


    useEffect(() => {
        if(successUpdate){
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        }else{
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
        
    }, [dispatch, userId, user, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
        
    }

    return (
        <div className="userEdit__container">
            <div><Link to="/admin/userlist" className="goback">Go Back</Link></div>
            <div className="userEdit__form">
            <FormContainer>
                <h2>Edit User</h2>
                {loadingUpdate && <Loader />}
                {errorUpdate &&  <Message severity='error'>{errorUpdate}</Message>}
                {loading ? < Loader /> : error ? <Message severity="error">{error}</Message> : (
                <ValidatorForm onSubmit={submitHandler}>
                <TextValidator
                label="Full Name"
                onChange={(e) => setName(e.target.value)}
                name="name"
                value={name}
            ></TextValidator>

            <TextValidator
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                value={email}
             ></TextValidator>

            <FormControlLabel
                label="Is Admin"
                name="isAdmin"
                control={<Checkbox />}
                onChange={(e) => setIsAdmin(e.target.checked)}
                checked={isAdmin}
                value={isAdmin}            
            ></FormControlLabel>

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

export default UserEditScreen
