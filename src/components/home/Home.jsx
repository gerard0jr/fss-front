import React, { Component } from 'react'
import { CssBaseline} from '@material-ui/core';
import { styles } from './styles'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import HomeNav from './HomeNav';
import HomeDrawer from './HomeDrawer';
import Profile from '../profile/Profile';
import Sales from '../sales/Sales';
import { actUser } from '../../services/auth'
import Dashboard from '../dashboard/Dashboard';

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

    updateUser = user => { 
        actUser(user._id, user)
        this.setState({user})
    }

    close = () => this.setState({open: false})

  render() {
    const { open, direction, location, user } = this.state
    const { handleDrawerClose, handleDrawerOpen, handleLocation, 
            updateUser, toHome } = this
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
            location={location}
            open={open} 
            direction={direction} 
            classes={classes}
            handleLocation={handleLocation} />

        <main onClick={handleDrawerClose} className={classes.content}>
          <div className={classes.toolbar}/>
          {
              location === 'root' ? <Dashboard /> :
              location === 'ventas' ? <Sales /> :
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