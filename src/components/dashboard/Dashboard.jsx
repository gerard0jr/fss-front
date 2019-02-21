import React, { Component } from 'react'
import Summary from './Summary';
import './styles.css'
import { getAll } from '../../services/leadsDB'

export default class Dashboard extends Component {
    
    state = {
        user: {},
        loading: true,
        leads: [],
        page: 0,
        rowsPerPage: 5,
    }
    
    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.props.history.push('/login')
        this.setState({user}, this.getLeads)
    }

    componentWillUnmount = () => this.setState({loading: true})

    getLeads = () => {
        const { user } = this.state
        getAll(user._id)
            .then(userLeads => this.setState({leads: userLeads.data.leads, loading: false}))
            .catch(err => console.log(err))
    }

    handleChangePage = (event, page) => this.setState({ page })

    orderById = () => {
        let { leads } = this.state
        leads = leads.reverse()
        this.setState({leads})
    }

  render() {
      const { loading, leads, page, rowsPerPage } = this.state
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
            />
        </div>
    )
  }
}
