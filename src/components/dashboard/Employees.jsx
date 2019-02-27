import React from 'react'
import './styles.css'
import { Paper, List, ListItem, Avatar, ListItemText } from '@material-ui/core';

const Employees = ({sellers}) => {
    console.log(sellers)
  return (
    <div className="cards employees-resume">
       <Paper className="card">
            <h4>Vendedores</h4>
            {sellers ? sellers.map(seller => 
            <List className="employees-detail">
                <ListItem>
                    <Avatar alt="profile-mini-pic" src={seller.photoURL}/>
                    <ListItemText 
                        primary={seller.name}
                        secondary={`Leads:${seller.leads.length} , Cotizaciones: 0`} 
                    />
                </ListItem>
            </List>) : <div className="employees-detail">No hay vendedores</div>}
        </Paper>
    </div>
  )
}

export default Employees
