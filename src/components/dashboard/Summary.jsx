import React, { useState, useEffect } from 'react'
import './styles.css'
import { Paper } from '@material-ui/core';
import LeadsTable from './LeadsTable';
import OrdersTable from './OrdersTable';
import BillsTable from './BillsTable';
import DashboardPieChart from '../charts/DashboardPieChart';
import PieChartOrders from '../charts/PieChartOrders';
import PieChartBills from '../charts/PieChartBills';


const Summary = ({leads, orders, bills, page, pageOrd, pageBill, rowsPerPage, handleChangePage,  rowsPerPageOrd, handleChangePageOrd, rowsPerPageBill, handleChangePageBill, 
  loading, loadingOrders, loadingBills, orderById, orderByIdOrders, orderByIdBills, summaryData, summaryDataOrders, summaryDataBills, getOrders, getBills}) => {
  const [chart, setChart] = useState(false)
  useEffect(()=>{
    let allZero = Object.values(summaryData).every(item => item === 0)
    if(allZero) setChart(false)
    else setChart(true)
  },[summaryData])

  return (
    <>
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
        <h4>Resumen de Deals</h4>
        <div className="general-info">
          {chart ? 
            <DashboardPieChart {...summaryData} /> 
              :  
            <small>No hay datos</small>
          }
        </div>
      </Paper>
    </div>
    <div className="cards">
      <Paper className="card">
        <h4>Órdenes de compra</h4>
        <OrdersTable 
            orders={orders}
            loading={loadingOrders}
            page={pageOrd}
            rowsPerPage={rowsPerPageOrd}
            handleChangePage={handleChangePageOrd}
            orderById={orderByIdOrders}
            getOrders={getOrders}
        />
      </Paper>
      <Paper className="card">
        <h4>Resumen Órdenes de Compra</h4>
        <div className="general-info">
          {chart ? 
            <PieChartOrders {...summaryDataOrders} /> 
              :  
            <small>No hay datos</small>
          }
        </div>
      </Paper>
    </div>
    <div className="cards">
      <Paper className="card">
        <h4>Facturas</h4>
        <BillsTable 
            bills={bills}
            loading={loadingBills}
            page={pageBill}
            rowsPerPage={rowsPerPageBill}
            handleChangePage={handleChangePageBill}
            orderById={orderByIdBills}
            getBills={getBills}
        />
      </Paper>
      <Paper className="card">
        <h4>Resumen de Facturas</h4>
        <div className="general-info">
          {chart ? 
            <PieChartBills {...summaryDataBills} /> 
              :  
            <small>No hay datos</small>
          }
        </div>
      </Paper>
    </div>
    </>
  )
}
export default Summary