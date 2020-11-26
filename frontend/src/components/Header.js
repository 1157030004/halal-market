import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import "./Header.css"
import { Link, Route } from "react-router-dom"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Avatar, Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import { logout } from '../actions/userActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchBox from "./SearchBox"

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorAd, setAnchorAd] = useState(null);

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorAd(null);
    };

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header className="header">
            <Link to="/">
                <img className="header__icon" src="https://upload.wikimedia.org/wikipedia/commons/f/f7/Simple_Shop_logo.png" alt="" />
            </Link>
            <div className="header__center">
                <Route render={({ history }) => <SearchBox history={history} />} />
            </div>

            <div className="header__right">
                <div className="header__option">
                    <Link to="/cart">
                    <IconButton aria-label="cart" color="primary"><ShoppingCartIcon fontSize="large" /></IconButton>
                        
                    </Link>

                </div>
                {userInfo ? (
                    <div className="user__dropdown">
                        <Button
                            aria-controls="user-menu"
                            aria-haspopup="true"
                            variant="outlined"
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                        >
                            <Avatar fontSize="large" />
                            <h5 id="username">{userInfo.name}</h5>
                            <ExpandMoreIcon />
                        </Button>
                        <Menu
                            id="user-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}><Link to="/profile">Profile</Link></MenuItem>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </Menu>
                    </div>

                ) :
                    <div className="header__option" style={{
                        backgroundColor: 'white'
                    }}>
                        <Link to="/login">
                            <Button variant="outlined">Login</Button>
                        </Link>
                    </div>
                }
                {userInfo && userInfo.isAdmin &&(
                    <div className="user__dropdown">
                    <Button
                        aria-controls="admin-menu"
                        aria-haspopup="true"
                        variant="outlined"
                        onClick={(e) => setAnchorAd(e.currentTarget)}
                    >
                        <h5 id="adminmenu">Admin Panel</h5>
                        <ExpandMoreIcon />
                    </Button>
                    <Menu
                        id="admin-menu"
                        anchorEl={anchorAd}
                        keepMounted
                        open={Boolean(anchorAd)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}><Link to="/admin/userlist">Users</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to="/admin/productlist">Products</Link></MenuItem>
                        <MenuItem onClick={handleClose}><Link to="/admin/orderlist">Orders</Link></MenuItem>
                    </Menu>
                </div>
                )}



            </div>
        </header>
    )
}

export default Header
