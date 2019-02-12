import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { styles } from '../home/styles'
import { AppBar, Tabs, Tab } from '@material-ui/core';
import TabContent from './TabContent';
import { getAll, newLead, removeLead, removeUserLead, actLead } from '../../services/leadsDB'
import Snack from '../snackbar/Snack';

class Sales extends Component {
    state = {
        value: 0,
        lead: {},
        leads: [],
        client: {},
        clients: [],
        user: {},
        page: 0,
        rowsPerPage: 10,
        message: String,
        open: false,
        dialog: false,
        dialogNew: false
    }

    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.props.history.push('/login')
        this.setState({user}, this.getLeads)
        
    }
    
    handleChange = e => {
        const { lead } = this.state
        if(e.target.name === 'Origen') {
            lead['origin'] = e.target.value
            return this.setState({lead})
        }
        lead[e.target.id] = e.target.value
        this.setState({lead})
    }

    handleDateChange = (id, newLead, interested = null) => date => {
        const lead = newLead
        if(interested !== null){
            lead['interested'] = !interested
            return this.setState({lead}, () => this.updateLead(id))    
        }
        lead['meetingDate'] = date
        this.setState({lead}, () => this.updateLead(id))
    }

    getLeads = () => {
        const { user } = this.state
        getAll(user._id)
            .then(userLeads => this.setState({leads: userLeads.data.leads}))
            .catch(err => console.log(err))
    }

    submitLead = () => {
        const { user, lead } = this.state
        lead['commentPostedBy'] = user.name
        newLead(user._id, lead)
            .then(userUpdated => {
                localStorage.setItem('user', JSON.stringify(userUpdated.data))
                this.getLeads(user._id)
                this.setState({dialogNew: false, open: true, message:'Lead creado'}, this.clearLead)
            })
            .catch(err => console.log(err))
    }

    updateLead = id => {
        const { user, lead } = this.state
        actLead(id, lead)
        .then(newLead => {
            this.getLeads(user._id)
            this.setState({dialog: false, open: true, message:'Actualizado correctamente'})
        })
        .catch(err => console.log(err))
    }
    
    clearLead = () => {
        const { lead } = this.state
        Object.keys(lead).map(key => lead[key] = '')
        this.setState({lead})
    }

    deleteLead = (leadID) => {
        const { user } = this.state
        const id = {'id': leadID}
        removeLead(id)
            .then(newLead => newLead)
            .catch(err => console.log(err))
        removeUserLead(user._id, id)
            .then(userUpdated => {
                localStorage.setItem('user', JSON.stringify(userUpdated.data))
                this.getLeads()
                this.setState({dialog: false, open: true, message:'Lead eliminado'})
            })
            .catch(err => console.log(err))
    }

    handleTabs = (event,value) => this.setState({value})
    
    close = () => this.setState({ open: false })

    openDialog = (lead, action) => {
        if(action === 'update'){
            this.setState({dialog: true, lead})
            }
        else this.setState({dialogNew: true, lead:{}})
    }

    closeDialog = () => {
        this.setState({ dialog: false, dialogNew: false }, this.getLeads)
    }

    handleChangePage = (event, page) => this.setState({ page })

    handleChangeRowsPerPage = event => this.setState({ rowsPerPage: event.target.value })

  render() {
      const { classes } = this.props
      const { value, message, page, rowsPerPage, lead, user, open, leads, dialog,
            dialogNew, client, clients } = this.state
      const { handleTabs, handleChange, handleChangePage, handleChangeRowsPerPage, close,
            submitLead, getLeads, clearLead, deleteLead, closeDialog, openDialog,
            updateLead, handleDateChange } = this
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
                <Tab label="Prospectar clientes" />
                <Tab label="Formalizar cuentas" />
                <Tab label="Supervisar implementación del servicio" />
                <Tab label="Quejas/Sugerencias" />
                <Tab label="Satisfacción del cliente" />
            </Tabs>
        </AppBar>
        <TabContent 
            value={value} 
            handleChange={ handleChange } 
            handleChangePage={handleChangePage} 
            handleChangeRowsPerPage={handleChangeRowsPerPage} 
            page={page} 
            rowsPerPage={rowsPerPage}
            lead={lead}
            leads={leads}
            user={user}
            submitLead={submitLead}
            getLeads={getLeads}
            clearLead={clearLead}
            deleteLead={deleteLead}
            dialog={dialog}
            openDialog={openDialog}
            closeDialog={closeDialog}
            dialogNew={dialogNew}
            updateLead={updateLead}
            handleDateChange={handleDateChange}
            client={client}
            clients={clients}
        />
        <Snack close={close} message={message} open={open}/>
      </div>
    )
  }
}

Sales.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Sales)