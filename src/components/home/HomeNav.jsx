import React, {useState} from 'react'
import { AppBar, Toolbar, IconButton, Avatar, Chip, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './styles'
import './styles.css'
import { AccountCircle, ExitToApp } from '@material-ui/icons';

const HomeNav = ({classes,open, handleDrawerOpen, photoURL, role, toHome, handleLocation, closeSession}) => {
    const [ openMenu, setOpenMenu ] = useState(null)

    const toggleMenu = e => setOpenMenu(e.currentTarget)

    const closeMenu = () => setOpenMenu(null)
    
  return (
    <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
        [classes.appBarShift]: open,
        })}
    >
        <Toolbar className="navbar-distribution" disableGutters={!open}>
            <div className="left-items">
                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleDrawerOpen}
                    className={classNames(classes.menuButton, {
                    [classes.hide]: open,
                    })}
                >
                    <MenuIcon />
                </IconButton>
                <img onClick={toHome} style={{width:"100px", cursor:"pointer"}} src="/logo.png" alt="fss-logo"/>
            </div>
            <div onClick={toggleMenu} className="profile-circled">
                <Chip className="chip-color"
                    clickable
                    avatar={<Avatar alt="profile-mini-pic" 
                    src={photoURL}/>} 
                    label={role}/>
            </div>
        </Toolbar>
        <Menu
            anchorEl={openMenu}
            open={Boolean(openMenu)}
            onClose={closeMenu}
        >
            <MenuItem onClick={() => {closeMenu(); handleLocation('profile')}}>
                <IconButton>
                    <AccountCircle/>
                </IconButton>
                Perfil
            </MenuItem>
            <MenuItem onClick={() => {closeMenu(); closeSession()}}>
                <IconButton>
                    <ExitToApp/>
                </IconButton>
                Cerrar sesión
            </MenuItem>
        </Menu>
    </AppBar>
  )
}
HomeNav.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  }

export default withStyles(styles, {withTheme: true})(HomeNav)