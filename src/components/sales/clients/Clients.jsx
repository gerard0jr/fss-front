import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import '../styles.css'
import ClientTable from './ClientTable';
import ClientDialog from './ClientDialog';
import Snack from '../../snackbar/Snack';
import { allClients, newClient, updateClient, delClient } from '../../../services/clients'

export default class Clients extends Component {
    state={
        user: {},
        client: {},
        clients: [],
        loading: true,
        page: 0,
        rowsPerPage: 10,
        message: String,
        dialog: false,
        dialogNew: false,
        open: false
    }
    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.props.history.push('/login')
        this.setState({user}, () => this.getClients())
    }
    
    componentWillUnmount = () => this.setState({loading: true})
    
    handleChange = e => {
        const { client } = this.state
        if(e.target.name === 'Origen') {
            client['origin'] = e.target.value
            return this.setState({client})
        }
        client[e.target.id] = e.target.value
        this.setState({client})
    }

    getClients = () => allClients()
                        .then(clients => this.setState({clients: clients.data.reverse(), loading: false}))
                        .catch(err => console.log(err))

    submitClient = action =>  {
        const { client } = this.state
        if(action === 'update'){
            return updateClient(client)
                .then(upClient => this.setState({dialog: false, open: true, message:'Cliente actualizado'}, this.getClients))
                .catch(err => console.log(err))
        }
        newClient(client)
            .then(client => this.setState({dialogNew: false, open: true, message:'Cliente agregado'}, this.getClients))
            .catch(err => console.log(err))
    }

    deleteClient = id => {
        delClient(id)
            .then(status => this.setState({dialog: false, open: true, message:'Cliente eliminado'}, this.getClients))
            .catch(err => err)
    }

    close = () => this.setState({ open: false })

    openDialog = (item, action) => {
        if(action === 'update'){
            this.setState({dialog: true, client: item})
            }
        else this.setState({dialogNew: true, client:{}})
    }

    closeDialog = () => this.setState({ dialog: false, dialogNew: false }, this.getClients)

    handleChangePage = (event, page) => this.setState({ page })

    handleChangeRowsPerPage = event => this.setState({ rowsPerPage: event.target.value })

  render() {
      const { loading, page, rowsPerPage, message, dialog, dialogNew, open, clients, client } = this.state
      const { close, openDialog, closeDialog, handleChangePage, handleChangeRowsPerPage, submitClient, handleChange, deleteClient } = this
    return (
        <div
        style={{margin:"1em 0"}}>
            <ClientTable
                handleChangePage={handleChangePage} 
                handleChangeRowsPerPage={handleChangeRowsPerPage} 
                page={page} 
                rowsPerPage={rowsPerPage}
                dialog={dialog} 
                loading={loading}
                clients={clients}
                client={client}
                handleChange={handleChange}
                submitClient={submitClient}
                openDialog={openDialog}
                closeDialog={closeDialog}            
                deleteClient={deleteClient}
            />
            <div>
                <Button onClick={() => openDialog({},'new')} variant="contained" color="primary">
                    Nuevo cliente
                </Button>
            </div>
            <ClientDialog
            client={client}
            dialogNew={dialogNew} 
            closeDialog={closeDialog} 
            handleChange={handleChange}
            submitClient={submitClient}
            />
            <Snack close={close} message={message} open={open}/>
        </div>
    )
  }
}
