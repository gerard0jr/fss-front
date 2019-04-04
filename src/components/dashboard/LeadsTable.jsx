import React, { useState } from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow,
         TablePagination, CircularProgress, Tooltip, Grid, TextField } from '@material-ui/core'
import './styles.css'
import moment from 'moment'
import { FilterList } from '@material-ui/icons';
require('moment/locale/es')

const LeadsTable = ({leads, page, rowsPerPage, handleChangePage, loading, orderById}) => {

    const [ arrayFilter, setArrayFilter ] = useState('')
    let handleArrayFilter = e => setArrayFilter(e.target.value)
    

  return (
    <div style={{marginTop: "1em"}}>
        <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
            <Tooltip title="Filtrar lista" placement="bottom">
                <Grid style={{width:"auto"}} container alignItems="flex-end">
                <Grid item>
                    <TextField onChange={handleArrayFilter}  id="search-on-table" label="ID/Empresa" />
                </Grid>
                    <Grid item>
                        <FilterList/>
                    </Grid>
                </Grid>
            </Tooltip>
        </div>
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
            {leads.length ? leads.filter(lead => lead.clientName ?
                lead.prefix.concat('-',lead.seller,'-',lead.number).includes(arrayFilter.toUpperCase()) || 
                lead.clientName.bussinessName.toLowerCase().includes(arrayFilter.toLowerCase()) : [] ).map((lead, k) => {
                return (
                //el 5 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 5) + 5) && k >= (page * 5)) ? 
                <TableRow key={k}>
                    {/* Detalle */}
                    <TableCell>{`${lead.prefix}-${lead.seller}-${lead.number}`}</TableCell>
                    <TableCell>
                        {lead.clientName ? lead.clientName.bussinessName : null}
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
                </TableRow> : ''
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
