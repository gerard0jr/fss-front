import React from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, TablePagination, CircularProgress } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons';

const LeadsTable = ({leads, rowsPerPage, page, handleChangePage, 
    handleChangeRowsPerPage, deleteIncomeItem}) => {
        console.log(leads)
  return (
    <div>{leads !== undefined ? leads.map((lead,i)=><div key={i}>
        {lead.bussinessName}
    </div>) : 'no leads'}</div>
  )
}

export default LeadsTable
