import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import '../styles.css'
import Snack from '../../snackbar/Snack';
import { allBills, newBill, updateBill, delBill } from '../../../services/bills'
import BillTable from './BillTable';
import BillDialog from './BillDialog';

export default class Bills extends Component {
    state={
        user: {},
        bill: {},
        bills: [],
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
        this.setState({user}, () => this.getBills())
    }
    
    componentWillUnmount = () => this.setState({loading: true})
    
    handleChange = e => {
        const { bill } = this.state
        if(e.target.name === 'client') {
            bill['client'] = e.target.value
            return this.setState({bill})
        }
        bill[e.target.id] = e.target.value
        this.setState({bill})
    }

    getBills = () => {
        const {user} = this.state
        allBills(user._id)
            .then(user => this.setState({bills: user.data.bills.reverse(), loading: false}))
            .catch(err => console.log(err))
    }

    submitBill = action =>  {
        const { bill, user } = this.state
        if(action === 'update'){
            return updateBill(bill, bill._id)
                .then(upBill => this.setState({dialog: false, open: true, message:'Factura actualizada'}, this.getBills))
                .catch(err => console.log(err))
        }
        newBill(bill, user._id)
            .then(bill => this.setState({dialogNew: false, open: true, message:'Factura agregada'}, this.getBills))
            .catch(err => console.log(err))
    }

    deleteBill = id => {
        delBill(id)
            .then(status => this.setState({dialog: false, open: true, message:'Factura eliminada'}, this.getBills))
            .catch(err => err)
        
    }

    handleStatus = bill => e => {
        bill[e.target.name] = e.target.value
        updateBill(bill, bill._id)
            .then(upBill => this.setState({dialog: false, open: true, message:'Factura actualizada'}, this.getBills))
            .catch(err => console.log(err))
    }

    close = () => this.setState({ open: false })

    openDialog = (item, action) => {
        if(action === 'update'){
            this.setState({dialog: true, bill: item})
            }
        else this.setState({dialogNew: true, bill:{}})
    }

    closeDialog = () => this.setState({ dialog: false, dialogNew: false }, this.getBills)

    handleChangePage = (event, page) => this.setState({ page })

    handleChangeRowsPerPage = event => this.setState({ rowsPerPage: event.target.value })

  render() {
      const { loading, page, rowsPerPage, message, dialog, dialogNew, open, bills, bill } = this.state
      const { close, openDialog, closeDialog, handleChangePage, handleChangeRowsPerPage, submitBill, handleChange, deleteBill, handleStatus } = this
    return (
        <div
        style={{margin:"1em 0"}}>
            <BillTable
                handleChangePage={handleChangePage} 
                handleChangeRowsPerPage={handleChangeRowsPerPage} 
                page={page} 
                rowsPerPage={rowsPerPage}
                dialog={dialog} 
                loading={loading}
                bills={bills}
                bill={bill}
                handleChange={handleChange}
                submitBill={submitBill}
                openDialog={openDialog}
                closeDialog={closeDialog}            
                deleteBill={deleteBill}
                handleStatus={handleStatus}
            />
            <div>
                <Button onClick={() => openDialog({},'new')} variant="contained" color="primary">
                    Nueva Factura
                </Button>
            </div>
            <BillDialog
            bill={bill}
            dialogNew={dialogNew} 
            closeDialog={closeDialog} 
            handleChange={handleChange}
            submitBill={submitBill}
            />
            <Snack close={close} message={message} open={open}/>
        </div>
    )
  }
}
