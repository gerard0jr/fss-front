import React from 'react'
import './styles.css'
import { Paper } from '@material-ui/core';
import LeadsTable from './LeadsTable';

const Summary = ({leads, page, rowsPerPage, handleChangePage, loading, orderById}) => {
  return (
    <div className="cards">
      <Paper className="card">
        <h4>Leads</h4>
        <LeadsTable 
            leads={leads}
            loading={loading}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            orderById={orderById}
        />
      </Paper>
      <Paper className="card">
        <h4>Cotizaciones</h4>
        <h5>13</h5>
      </Paper>
    </div>
  )
}

export default Summary
