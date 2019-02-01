import React, { Component } from 'react'
import { CssBaseline, Typography} from '@material-ui/core';
import { styles } from './styles'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import HomeNav from './HomeNav';
import HomeDrawer from './HomeDrawer';
import Profile from '../profile/Profile';

class Home extends Component {
    state = {
        open: false,
        direction: 'left',
        location: 'root',
        user: {},
        message: String,
    }

    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.props.history.push('/login')
        this.setState({user})
    }

    handleDrawerOpen = () => this.setState({ open: true, direction: 'left' })

    handleDrawerClose = () => this.setState({ open: false, direction: 'right' })

    handleLocation = e => this.setState({location : e})

    toHome = () => this.setState({location: 'root'})

    updateUser = user => this.setState({user})

    close = () => this.setState({open: false})

  render() {
    const { open, direction, location, user, message } = this.state
    const { handleDrawerClose, handleDrawerOpen, handleLocation, 
        handleChange, close, updateUser, toHome } = this
    const { classes } = this.props
    return (
      <div>
        <div className="root">
        <CssBaseline />
        <HomeNav 
            handleDrawerOpen={handleDrawerOpen} 
            toHome={toHome}
            open={open} 
            classes={classes}
            {...user}/>
        <HomeDrawer 
            handleDrawerClose={handleDrawerClose} 
            open={open} 
            direction={direction} 
            classes={classes}
            handleLocation={handleLocation} />

        <main className={classes.content}>
          <div className={classes.toolbar}/>
          {
              location === 'root' ? <Typography paragraph>Contenido de dashboard</Typography> :
              location === 'profile' ? <Profile updateUser={updateUser} /> :
              'Not root'
          }
        </main>
      </div>
      </div>
    )
  }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  }

export default withStyles(styles, {withTheme: true})(Home)