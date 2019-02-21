import React from 'react'
import './styles.css'
import { Paper } from '@material-ui/core';

const Summary = () => {
  return (
    <div className="cards">
      <Paper className="card">
        <h4>Leads</h4>
        <h5>Tabla con ID, nombre y cita</h5>
      </Paper>
      <Paper className="card">
        <h4>Cotizaciones</h4>
        <h5>13</h5>
      </Paper>
      <Paper className="card">
        <h4>Siguiente cita</h4>
        <h5>28 Febrero 2019</h5>
      </Paper>
    </div>
  )
}

export default Summary
