import React from 'react'
import './styles.css'
import { Paper } from '@material-ui/core';
import LeadsTable from './LeadsTable';
import DashboardPieChart from '../charts/DashboardPieChart';

const Summary = ({leads, page, rowsPerPage, handleChangePage, loading, orderById, summaryData}) => {

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
        <h4>General</h4>
        <div className="general-info">
        <DashboardPieChart {...summaryData} />
        </div>
      </Paper>
    </div>
  )
}
export default Summary
