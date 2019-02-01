import React from 'react'
import { AppBar, Toolbar, IconButton, Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'
import classNames from 'classnames';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './styles'
import './styles.css'

const HomeNav = ({classes,open, handleDrawerOpen, photoURL, role, toHome}) => {
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
                <img onClick={toHome} style={{width:"100px"}} src="/logo.png" alt="fss-logo"/>
            </div>
            <div className="profile-circled">
                <Avatar alt="profile-mini-pic" src={photoURL}/><span>{role}</span>
            </div>
        </Toolbar>
    </AppBar>
  )
}
HomeNav.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  }

export default withStyles(styles, {withTheme: true})(HomeNav)