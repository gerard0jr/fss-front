import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { styles } from '../home/styles'
import { AppBar, Tabs, Tab } from '@material-ui/core';
import TabContent from './TabContent';
import { getAll, newLead } from '../../services/leadsDB'

class Sales extends Component {
    state = {
        value: 0,
        lead: {},
        leads: [],
        user: {},
        page: 0,
        rowsPerPage: 5,
        message: String,
        open: false
    }

    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.props.history.push('/login')
        this.setState({user}, this.getLeads)
        
    }
    
    handleChange = e => {
        const { lead } = this.state
        lead[e.target.id] = e.target.value
        this.setState({lead})
    }

    getLeads = () => {
        const { user } = this.state
        getAll(user._id)
            .then(userLeads => this.setState({leads: userLeads.data.leads}))
            .catch(err => console.log(err))
    }

    submitLead = () => {
        const { user, lead } = this.state
        newLead(user._id, lead)
            .then(userUpdated => {
                 this.getLeads(user._id)}
            )
            .catch(err => console.log(err))
    }
    
    clearLead = () => {
        const { lead } = this.state
        Object.keys(lead).map(key => lead[key] = '')
        this.setState({lead})
    }

    handleTabs = (event,value) => this.setState({value})
    
    handleClose = () => this.setState({ open: false })

    handleChangePage = (event, page) => this.setState({ page })

    handleChangeRowsPerPage = event => this.setState({ rowsPerPage: event.target.value })

  render() {
      const { classes } = this.props
      const { value, message, page, rowsPerPage, lead, user, open, leads } = this.state
      const { handleTabs, handleChange, handleChangePage, handleChangeRowsPerPage, handleClose,
            submitLead, getLeads, clearLead } = this
    return (
      <div className={classes.salesMenuRoot}>
        <h2 className="section-title">Ventas</h2>
        <AppBar position="static" color="default">
            <Tabs
                value={value}
                onChange={handleTabs}   
                indicatorColor="primary"
                textColor="primary"
            >
                <Tab onClick={getLeads} label="Oportunidad de venta" />
                <Tab label="Item2" />
                <Tab label="Item3" />
            </Tabs>
        </AppBar>
        <TabContent 
            value={value} 
            handleChange={ handleChange } 
            handleChangePage={handleChangePage} 
            handleChangeRowsPerPage={handleChangeRowsPerPage} 
            handleClose={handleClose}
            page={page} 
            rowsPerPage={rowsPerPage}
            message={message}
            lead={lead}
            leads={leads}
            open={open}
            user={user}
            submitLead={submitLead}
            getLeads={getLeads}
            clearLead={clearLead}
        />
      </div>
    )
  }
}

Sales.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Sales)