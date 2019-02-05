import React from 'react'
import { Drawer, IconButton, List, Divider, 
    ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import { Help, Assignment, ChevronLeft, ChevronRight, Face, TrendingUp } from '@material-ui/icons';
import classNames from 'classnames';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { styles } from './styles'


const HomeDrawer = ({open, direction, handleDrawerClose, classes, location, handleLocation}) => {
  return (
    <Drawer
        variant="permanent"
        className={classNames(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
        open={open}
    >
        <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
                {direction === 'right' ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem onClick={() => handleLocation('root')} button>
                {open ? <ListItemIcon><TrendingUp /></ListItemIcon> : 
                <Tooltip title="Resumen" placement="right-start">
                    <ListItemIcon><TrendingUp /></ListItemIcon>
                </Tooltip>}
                <ListItemText primary="Resumen" />
            </ListItem>
            <ListItem onClick={() => handleLocation('ventas')} button>
                {open ? <ListItemIcon><Assignment /></ListItemIcon> : 
                <Tooltip title="Ventas" placement="right-start">
                    <ListItemIcon><Assignment /></ListItemIcon>
                </Tooltip>}
                <ListItemText primary="Ventas" />
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem onClick={() => handleLocation('profile')} button>
            {open ? <ListItemIcon><Face /></ListItemIcon> : 
                <Tooltip title="Perfil" placement="right-start">
                    <ListItemIcon><Face /></ListItemIcon>
                </Tooltip>}
                <ListItemText primary="Perfil" />
            </ListItem>
        </List>
    </Drawer>
  )
}

HomeDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  }

export default withStyles(styles, {withTheme: true})(HomeDrawer)
