import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import '../styles.css'
import Snack from '../../snackbar/Snack';
import { allOrders, newOrder, updateOrder, delOrder } from '../../../services/orders'
import OrderTable from './OrderTable';
import OrderDialog from './OrderDialog';

export default class Orders extends Component {
    state={
        user: {},
        order: {},
        orders: [],
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
        this.setState({user}, () => this.getOrders())
    }
    
    componentWillUnmount = () => this.setState({loading: true})
    
    handleChange = e => {
        const { order } = this.state
        if(e.target.name === 'client') {
            order['client'] = e.target.value
            return this.setState({order})
        }
        order[e.target.id] = e.target.value
        this.setState({order})
    }

    getOrders = () => {
        const {user} = this.state
        allOrders(user._id)
            .then(user => this.setState({orders: user.data.orders.reverse(), loading: false}))
            .catch(err => console.log(err))
    }

    submitOrder = action =>  {
        const { order, user } = this.state
        if(action === 'update'){
            return updateOrder(order, order._id)
                .then(upOrder => this.setState({dialog: false, open: true, message:'Orden actualizada'}, this.getOrders))
                .catch(err => console.log(err))
        }
        newOrder(order, user._id)
            .then(order => this.setState({dialogNew: false, open: true, message:'Orden agregada'}, this.getOrders))
            .catch(err => console.log(err))
    }

    deleteOrder = id => {
        delOrder(id)
            .then(status => this.setState({dialog: false, open: true, message:'Orden eliminada'}, this.getOrders))
            .catch(err => err)
        
    }

    handleStatus = order => e => {
        order[e.target.name] = e.target.value
        updateOrder(order, order._id)
            .then(upOrder => this.setState({dialog: false, open: true, message:'Orden actualizada'}, this.getOrders))
            .catch(err => console.log(err))
    }

    close = () => this.setState({ open: false })

    openDialog = (item, action) => {
        if(action === 'update'){
            this.setState({dialog: true, order: item})
            }
        else this.setState({dialogNew: true, order:{}})
    }

    closeDialog = () => this.setState({ dialog: false, dialogNew: false }, this.getOrders)

    handleChangePage = (event, page) => this.setState({ page })

    handleChangeRowsPerPage = event => this.setState({ rowsPerPage: event.target.value })

  render() {
      const { loading, page, rowsPerPage, message, dialog, dialogNew, open, orders, order } = this.state
      const { close, openDialog, closeDialog, handleChangePage, handleChangeRowsPerPage, submitOrder, handleChange, deleteOrder, handleStatus } = this
    return (
        <div
        style={{margin:"1em 0"}}>
            <OrderTable
                handleChangePage={handleChangePage} 
                handleChangeRowsPerPage={handleChangeRowsPerPage} 
                page={page} 
                rowsPerPage={rowsPerPage}
                dialog={dialog} 
                loading={loading}
                orders={orders}
                order={order}
                handleChange={handleChange}
                submitOrder={submitOrder}
                openDialog={openDialog}
                closeDialog={closeDialog}            
                deleteOrder={deleteOrder}
                handleStatus={handleStatus}
            />
            <div>
                <Button onClick={() => openDialog({},'new')} variant="contained" color="primary">
                    Nueva Orden de compra
                </Button>
            </div>
            <OrderDialog
            order={order}
            dialogNew={dialogNew} 
            closeDialog={closeDialog} 
            handleChange={handleChange}
            submitOrder={submitOrder}
            />
            <Snack close={close} message={message} open={open}/>
        </div>
    )
  }
}
