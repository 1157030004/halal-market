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
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import { listUsers, deleteUser } from '../actions/userActions'


const UserListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success:successDelete } = userDelete


    useEffect(() =>{
      if(userInfo && userInfo.isAdmin){
        dispatch(listUsers())
      }else{
        history.push('/login')
      }
        
    }, [dispatch, userInfo ,history, successDelete])

    const deleteHandler = (id) =>{
      if(window.confirm('Are you sure?')){
        dispatch(deleteUser(id))
      }
    }

    return (
        <div className="userList__container">
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message severity="error">{error}</Message>
            : (
                <TableContainer component={Paper}>
      <Table className="userList__table" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Admin</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell component="th" scope="row">
                {user._id}
              </TableCell>
              <TableCell align="right">{user.name}</TableCell>
              <TableCell align="right"><a href={`mailto:${user.email}`} >{user.email}</a></TableCell>
              <TableCell align="right">{user.isAdmin ? (<CheckCircleRoundedIcon />) : (
                  <CancelRoundedIcon />
              ) }</TableCell>
              <TableCell align="right">
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <IconButton aria-label="delete" color="primary"><BorderColorRoundedIcon /></IconButton>
                  </Link>
                  <IconButton aria-label="delete" color="primary" onClick={() => deleteHandler(user._id)}><DeleteIcon /></IconButton>
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

export default UserListScreen
