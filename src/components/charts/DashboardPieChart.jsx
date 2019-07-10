import React from 'react'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

const DashboardPieChart = ({propuesta, negociacion, confirmacion, perdida, ganada}) => {
  return (
    <PieChart data={{"Propuesta":propuesta, "Negociación":negociacion, "Confirmación de pedido (Ganada)":confirmacion, "Perdida":perdida, "Primer cobro":ganada}}/> 
  )
}

export default DashboardPieChart
