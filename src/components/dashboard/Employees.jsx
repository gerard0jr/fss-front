import React from 'react'
import './styles.css'
import { Paper, List, ListItem, Avatar, ListItemText } from '@material-ui/core';

const Employees = ({sellers}) => {
  return (
    <div className="cards employees-resume">
      <Paper className="card">
        <h4>Vendedores</h4>
        <List className="employees-detail">
        {sellers ? sellers.map((seller,k) => 
          <ListItem className="list" key={k}>
              <Avatar alt="profile-mini-pic" src={seller.photoURL}/>
              <ListItemText 
                  primary={seller.name}
                  secondary={<>Deals: <b>{seller.leads.length} </b><br/>
                              Cotizaciones: <b>{seller.leads.length ? seller.leads.reduce((acc,lead)=> acc + lead.quotations.length, 0) : 0} </b><br/>
                              Órdenes de compra: <b>{seller.orders ? seller.orders.length : 0} </b><br/>
                              Facturas: <b>{seller.bills ? seller.bills.length : 0} </b></>} 
              />
          </ListItem>) : <div className="employees-detail">No hay vendedores</div>}
        </List>
      </Paper>
    </div>
  )
}

export default Employees
