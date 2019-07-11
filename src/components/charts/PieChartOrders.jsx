import React from 'react'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

const PieChartOrders = ({generada, enviada, facturada}) => {
  return (
    <PieChart colors={['#f3f300', '#6E6EFF', '#00CC2C']} data={{"Generada":generada, "Enviada":enviada, "Facturada":facturada}}/> 
  )
}

export default PieChartOrders
