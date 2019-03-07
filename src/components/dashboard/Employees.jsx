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
                <ListItem key={k}>
                    <Avatar alt="profile-mini-pic" src={seller.photoURL}/>
                    <ListItemText 
                        primary={seller.name}
                        secondary={`Leads:${seller.leads.length} , Cotizaciones: 0`} 
                    />
                </ListItem>) : <div className="employees-detail">No hay vendedores</div>}
        </List>
        </Paper>
    </div>
  )
}

export default Employees
