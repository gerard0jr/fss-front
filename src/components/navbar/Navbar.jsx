import React from 'react'
import './navbar.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <AppBar position="static">
        <Toolbar className="grow">
            <Typography variant="h6" color="inherit" >
            FSS
            </Typography>
            <Button color="inherit"><Link style={{color:"white"}} to="/login">Login</Link></Button>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar