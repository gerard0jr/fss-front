import React from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, 
    TablePagination, CircularProgress, Grid } from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import FormDialog from './FormDialog';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns'

const LeadsTable = ({leads, rowsPerPage, page, handleChangePage, 
    handleChangeRowsPerPage, deleteLead, dialog, closeDialog, handleChange, lead,
    clearLead, submitLead, openDialog, updateLead, handleDateChange}) => {
  return (<div>
    <Paper id="tablas" style={{width:"100%", margin: "1em auto", padding:"1em"}}>
    <div style={{overflowX: 'auto'}}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Empresa</TableCell>
                <TableCell>Giro</TableCell>
                <TableCell>Empleados</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Posición</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Industria</TableCell>
                <TableCell>Origen</TableCell>
                <TableCell>Interesado</TableCell>
                <TableCell>Reunión</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Cotización</TableCell>
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
                    <TableCell>{lead.bussinessRole}</TableCell>
                    <TableCell>{lead.bussinessEmployees}</TableCell>
                    <TableCell>{lead.bussinessAddress}</TableCell>
                    <TableCell>{lead.contactName}</TableCell>
                    <TableCell>{lead.contactPosition}</TableCell>
                    <TableCell>{lead.contactPhone}</TableCell>
                    <TableCell>{lead.contactEmail}</TableCell>
                    <TableCell>{lead.industry}</TableCell>
                    <TableCell>{lead.origin}</TableCell>
                    <TableCell>{lead.interested}</TableCell>
                    <TableCell> 
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                            <DatePicker
                                margin="normal"
                                label="Date picker"
                                value={lead.meetingDate}
                                onChange={handleDateChange(lead._id)}
                            />
                            <TimePicker
                                margin="normal"
                                label="Time picker"
                                value={lead.meetingDate}
                                onChange={handleDateChange(lead._id)}
                            />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell>
                        <Edit onClick={() => openDialog(lead, 'update')} style={{fontSize: "17px", cursor:"pointer"}}/>
                    </TableCell>
                    <TableCell>Cotizar</TableCell>
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
    <FormDialog 
        dialog={dialog} 
        closeDialog={closeDialog} 
        handleChange={handleChange} 
        lead={lead}
        deleteLead={deleteLead}
        clearLead={clearLead}
        submitLead={submitLead}
        updateLead={updateLead}/>
  </div>)
}

export default LeadsTable
