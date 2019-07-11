import React from 'react'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

const PieChartBills = ({generada, enviada, pagada}) => {
  return (
    <PieChart colors={['#f3f300', '#6E6EFF', '#00CC2C']} data={{"Generada":generada, "Enviada":enviada, "Pagada":pagada}}/>
  )
}

export default PieChartBills