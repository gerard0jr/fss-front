import React, { useState, useEffect } from 'react'
import './styles.css'
import { Paper } from '@material-ui/core';
import LeadsTable from './LeadsTable';
import DashboardPieChart from '../charts/DashboardPieChart';


const Summary = ({leads, page, rowsPerPage, handleChangePage, loading, orderById, summaryData}) => {
  const [chart, setChart] = useState(false)
  useEffect(()=>{
    let allZero = Object.values(summaryData).every(item => item === 0)
    if(allZero) setChart(false)
    else setChart(true)
  },[summaryData])

  return (
    <div className="cards">
      <Paper className="card">
        <h4>Deals</h4>
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
        <h4>Estatus general</h4>
        <div className="general-info">
          {chart ? 
            <DashboardPieChart {...summaryData} /> 
              :  
            <small>No hay datos</small>
          }
        </div>
      </Paper>
    </div>
  )
}
export default Summary