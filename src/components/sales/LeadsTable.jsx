import React from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, TablePagination, CircularProgress } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons';

const LeadsTable = ({leads, rowsPerPage, page, handleChangePage, 
    handleChangeRowsPerPage, deleteIncomeItem}) => {
  return (
    <Paper id="tablas" style={{width:"100%", margin: "1em auto", padding:"1em"}}>
    <div style={{overflowX: 'auto'}}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Empresa</TableCell>
                <TableCell align="right">Giro</TableCell>
                <TableCell align="right">Empleados</TableCell>
                <TableCell align="right">Dirección</TableCell>
                <TableCell align="right">Contacto</TableCell>
                <TableCell align="right">Posición</TableCell>
                <TableCell align="right">Teléfono</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Industria</TableCell>
                <TableCell align="right">Origen</TableCell>
                <TableCell align="right">Borrar</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {leads ? leads.map((lead, k) => {
                return (
                (k < ((page * 5) + 5) && k >= (page * 5)) ? 
                <TableRow key={k}>
                    <TableCell component="th" scope="row">
                        {lead.bussinessName}
                    </TableCell>
                    <TableCell align="right">{lead.bussinessRole}</TableCell>
                    <TableCell align="right">{lead.bussinessEmployees}</TableCell>
                    <TableCell align="right">{lead.bussinessAddress}</TableCell>
                    <TableCell align="right">{lead.contactName}</TableCell>
                    <TableCell align="right">{lead.contactPosition}</TableCell>
                    <TableCell align="right">{lead.contactPhone}</TableCell>
                    <TableCell align="right">{lead.contactEmail}</TableCell>
                    <TableCell align="right">{lead.industry}</TableCell>
                    <TableCell align="right">{lead.origin}</TableCell>
                    <TableCell align="right">
                        <DeleteOutline style={{fontSize: "17px", cursor:"pointer"}}/>
                    </TableCell>
                </TableRow> : ""
                );
            }) : <TableRow>
                    <TableCell component="th" scope="row">
                        Cargando datos
                    </TableCell>
                    <TableCell component="th" scope="row">
                        <CircularProgress color="secondary" style={{margin:"1em"}}/>
                    </TableCell>
                </TableRow>}
            </TableBody>
        </Table>
    </div>
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
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    </Paper>
  )
}

export default LeadsTable
