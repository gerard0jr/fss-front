import React from 'react'
import './navbar.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <AppBar position="static">
        <Toolbar className="grow">
            <Link to="/login"><img style={{width:"100px", cursor:"pointer"}} src="/logo.png" alt="fss-logo"/></Link>
            <Button color="inherit"><Link style={{color:"white"}} to="/login">Iniciar sesión</Link></Button>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar