import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow,
         TablePagination, CircularProgress, Tooltip } from '@material-ui/core'
import './styles.css'
import moment from 'moment'
require('moment/locale/es')

const LeadsTable = ({leads, page, rowsPerPage, handleChangePage, loading, orderById}) => {

    let [leadsMutable, setLeads] = useState([])
    
    useEffect(() => {
        setLeads(leads)
      })

  return (
    <div style={{marginTop: "1em"}}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell> <span className="order-cell" onClick={orderById}>ID</span></TableCell>
                <TableCell>Empresa</TableCell>
                <TableCell>Estatus</TableCell>
                <TableCell>Reunión</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {leadsMutable.length ? leadsMutable.map((lead, k) => {
                return (
                //el 5 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 5) + 5) && k >= (page * 5)) ? 
                <TableRow key={k}>
                    {/* Detalle */}
                    <TableCell>{`${lead.prefix}-${lead.seller}-${lead.number}`}</TableCell>
                    <TableCell>
                        {lead.bussinessName}
                    </TableCell>
                    <TableCell>
                        {lead.status}
                    </TableCell>
                    {/* Fecha y hora de reunión */}
                    <Tooltip disableFocusListener title={moment(lead.meetingDate).format("d/MMMM/Y h:m a")} placement="right">
                        <TableCell> 
                            {moment(lead.meetingDate).fromNow()}
                        </TableCell>
                    </Tooltip>
                </TableRow> : ""
                );
            }) : <TableRow>
                    <TableCell style={{width:"200px", padding: "5px"}} component="th" scope="row">
                       {loading ? 'Cargando...' : 'No hay leads'}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {loading ? <CircularProgress color="secondary" style={{margin:"1em"}}/> : ''}
                    </TableCell>
                </TableRow>}
            </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="Table"
          count={leads ? leads.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
                'aria-label': 'Next Page',
            }}
            onChangePage={handleChangePage}
            />
    </div>
  )
}

export default LeadsTable
