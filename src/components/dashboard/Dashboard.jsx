import React, { Component } from 'react'
import Summary from './Summary';
import './styles.css'
import { getAll } from '../../services/leadsDB'
import { allOrders } from '../../services/orders'
import { allBills } from '../../services/bills'
import { getSellers } from '../../services/generalConsults'
import Employees from './Employees';
import { Redirect } from 'react-router-dom' 

export default class Dashboard extends Component {
    
    state = {
        user: {},
        
        loading: true,
        loadingOrders: true,
        loadingBills: true,

        leads: [],
        orders: [],
        bills: [],

        summaryData: {},
        summaryDataOrders: {},
        summaryDataBills: {},

        page: 0,
        pageOrd: 0,
        pageBill: 0,
        
        rowsPerPage: 5,
        rowsPerPageOrd: 5,
        rowsPerPageBill: 5,

        sellers: []
    }
    
    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return <Redirect to='/login' />
        this.setState({user}, () => {this.getLeads(); this.getOrders(); this.getBills(); this.getEmployees()})
    }

    componentWillUnmount = () => this.setState({loading: true})

    getSummaryData = () => {
        const { leads, orders, bills } = this.state
        let summaryData = {
            propuesta: leads.reduce((acc,lead) => {if(lead.status === 'Propuesta') acc ++; return acc},0),
            negociacion: leads.reduce((acc,lead) => {if(lead.status === 'Negociación') acc ++; return acc},0),
            confirmacion: leads.reduce((acc,lead) => {if(lead.status === 'Confirmación de pedido') acc ++; return acc},0),
            perdida: leads.reduce((acc,lead) => {if(lead.status === 'Perdida') acc ++; return acc},0),
            ganada: leads.reduce((acc,lead) => {if(lead.status === 'Primer Cobro') acc ++; return acc},0),
        }
        let summaryDataOrders = {
            generada: orders.reduce((acc,order) => {if(order.status === 'Generada' && order.active) acc ++; return acc},0),
            enviada: orders.reduce((acc,order) => {if(order.status === 'Enviada' && order.active) acc ++; return acc},0),
            facturada: orders.reduce((acc,order) => {if(order.status === 'Facturada' && order.active) acc ++; return acc},0),
        }
        let summaryDataBills = {
            generada: bills.reduce((acc,bill) => {if(bill.status === 'Generada' && bill.active) acc ++; return acc},0),
            enviada: bills.reduce((acc,bill) => {if(bill.status === 'Enviada' && bill.active) acc ++; return acc},0),
            pagada: bills.reduce((acc,bill) => {if(bill.status === 'Pagada' && bill.active) acc ++; return acc},0),
        }
        this.setState({summaryData, summaryDataOrders, summaryDataBills})
    }

    getLeads = () => {
        const { user } = this.state
        getAll(user._id)
            .then(userLeads => this.setState({leads: userLeads.data.leads.reverse(), loading: false}, this.getSummaryData))
            .catch(err => console.log(err))
    }

    getOrders = () => {
        const { user } = this.state
        allOrders(user._id)
            .then(userOrders => this.setState({orders: userOrders.data.orders.reverse(), loading: false}, this.getSummaryData))
            .catch(err => console.log(err))
    }

    getBills = () => {
        const { user } = this.state
        allBills(user._id)
            .then(userBills => this.setState({bills: userBills.data.bills.reverse(), loading: false}, this.getSummaryData))
            .catch(err => console.log(err))
    }

    getEmployees = () => {
        getSellers()
            .then(sellers => this.setState({sellers: sellers.data}))
            .catch(err => console.log(err))
    }

    handleChangePage = (event, page) => this.setState({ page })

    orderById = () => {
        let { leads } = this.state
        leads = leads.reverse()
        this.setState({leads})
    }
    orderByIdOrders = () => {
        let { orders } = this.state
        orders = orders.reverse()
        this.setState({orders})
    }
    orderByIdBills = () => {
        let { bills } = this.state
        bills = bills.reverse()
        this.setState({bills})
    }

  render() {
      const { loading, loadingOrders, loadingBills, leads, page, rowsPerPage, pageOrd, rowsPerPageOrd, pageBill, rowsPerPageBill , summaryData, summaryDataOrders, summaryDataBills, sellers, orders, bills } = this.state
      const { handleChangePage, handleChangePageOrd, handleChangePageBill, orderById, orderByIdOrders, orderByIdBills, getOrders, getBills} = this
    return (
        <div className="dashboard-layout">
            <Summary 
                leads={leads}
                orders={orders}
                bills={bills}
                
                loading={loading}
                loadingOrders={loadingOrders}
                loadingBills={loadingBills}

                orderById={orderById}
                orderByIdOrders={orderByIdOrders}
                orderByIdBills={orderByIdBills}

                summaryData={summaryData}
                summaryDataOrders={summaryDataOrders}
                summaryDataBills={summaryDataBills}

                handleChangePage={handleChangePage}
                page={page}
                rowsPerPage={rowsPerPage}

                handleChangePageOrd={handleChangePageOrd}
                pageOrd={pageOrd}
                rowsPerPageOrd={rowsPerPageOrd}

                handleChangePageBill={handleChangePageBill}
                pageBill={pageBill}
                rowsPerPageBill={rowsPerPageBill}

                getOrders={getOrders}
                getBills={getBills}
            />
            <Employees 
                sellers={sellers}
            />
        </div>
    )
  }
}
