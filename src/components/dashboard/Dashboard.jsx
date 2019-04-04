import React, { Component } from 'react'
import Summary from './Summary';
import './styles.css'
import { getAll } from '../../services/leadsDB'
import { getSellers } from '../../services/generalConsults'
import Employees from './Employees';
import { Divider } from '@material-ui/core';

export default class Dashboard extends Component {
    
    state = {
        user: {},
        loading: true,
        leads: [],
        page: 0,
        rowsPerPage: 5,
        summaryData: {},
        sellers: []
    }
    
    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.props.history.push('/login')
        this.setState({user}, () => {this.getLeads(); this.getEmployees()})
    }

    componentWillUnmount = () => this.setState({loading: true})

    getSummaryData = () => {
        const { leads } = this.state
        let summaryData = {
            propuesta: leads.reduce((acc,lead) => {if(lead.status === 'Propuesta') acc ++; return acc},0),
            negociacion: leads.reduce((acc,lead) => {if(lead.status === 'Negociación') acc ++; return acc},0),
            confirmacion: leads.reduce((acc,lead) => {if(lead.status === 'Confirmación de pedido') acc ++; return acc},0),
            perdida: leads.reduce((acc,lead) => {if(lead.status === 'Perdida') acc ++; return acc},0),
            ganada: leads.reduce((acc,lead) => {if(lead.status === 'Primer Cobro') acc ++; return acc},0),
        }
        this.setState({summaryData})
    }

    getLeads = () => {
        const { user } = this.state
        getAll(user._id)
            .then(userLeads => this.setState({leads: userLeads.data.leads.reverse(), loading: false}, this.getSummaryData))
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

  render() {
      const { loading, leads, page, rowsPerPage, summaryData, sellers } = this.state
      const { handleChangePage, orderById} = this
    return (
        <div className="dashboard-layout">
            <Summary 
                leads={leads}
                loading={loading}
                page={page}
                rowsPerPage={rowsPerPage}
                handleChangePage={handleChangePage}
                orderById={orderById}
                summaryData={summaryData}
            />
            <Divider style={{marginTop:"1rem"}}/>
            <small>Administración</small>
            <Employees 
                sellers={sellers}
            />
        </div>
    )
  }
}
