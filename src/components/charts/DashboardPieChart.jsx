import React from 'react'
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)

const DashboardPieChart = ({propuesta, negociacion, confirmacion, perdida, ganada}) => {
  return (
    <div>
      <PieChart 
        data={[["Propuesta", propuesta], ["Negociación", negociacion], ["Confirmación de pedido (Ganada)", confirmacion], ["Perdida", perdida], ["Primer cobro", ganada]]} 
        messages={{empty: "No hay datos"}}
      />
    </div>
  )
}

export default DashboardPieChart
