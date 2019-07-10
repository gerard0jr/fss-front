import React from 'react'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

const PieChartBills = ({generada, enviada, pagada}) => {
  return (
    <PieChart data={{"Generada":generada, "Enviada":enviada, "Pagada":pagada}}/>
  )
}

export default PieChartBills