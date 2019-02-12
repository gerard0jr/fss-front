import React from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, 
    TablePagination, CircularProgress, Grid} from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import ClientDialog from './ClientDialog';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'

const ClientTable = ({rowsPerPage, page, handleChangePage, 
    handleChangeRowsPerPage, deleteLead, dialog, closeDialog, handleChange, client = {},
    clearLead, submitLead, openDialog, updateLead, handleDateChange, clients}) => {
        console.log(clients)
  return (<div>
    <Paper id="tablas" style={{width:"100%", margin: "1em auto", padding:"1em"}}>
    <div style={{overflowX: 'auto'}}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Folio</TableCell>
                <TableCell>Empresa</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Reunión</TableCell>
                <TableCell></TableCell>
                <TableCell>Tipo de requerimiento</TableCell>
                <TableCell>Editar</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {clients ? clients.map((client, k) => {
                return (
                //el 10 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 10) + 10) && k >= (page * 10)) ? 
                <TableRow key={k}>
                    <TableCell>{client.folio}</TableCell>
                    <TableCell component="th" scope="row">
                        {client.clientName}
                    </TableCell>
                    <TableCell style={{width:"200px", padding: "8px"}}>{client.clientAddress}</TableCell>
                    <TableCell>{client.clientContact}</TableCell>
                    {/* Inputs de fecha y hora de reunión */}
                    <TableCell style={{width:"200px", padding: "8px"}}> 
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale} views={['year']}>
                            <Grid container justify="space-around">
                            <DatePicker
                                okLabel="Guardar"
                                cancelLabel="Cancelar"
                                label="Fecha"
                                value={client.meetingDate}
                                onChange={handleDateChange(client._id, client, null, 'client')}
                                format={'dd/MM/yyyy'}
                            />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell style={{width:"200px", padding: "5px"}}> 
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                            <Grid container justify="space-around">
                            <TimePicker
                                okLabel="Guardar"
                                cancelLabel="Cancelar"
                                label="Hora"
                                value={client.meetingDate}
                                onChange={handleDateChange(client._id, client, null, 'client')}
                            />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell>{client.reqType}</TableCell>
                    {/* Botón de editar */}
                    <TableCell>
                        <Edit onClick={() => openDialog(client, 'clientUpdate')} style={{fontSize: "17px", cursor:"pointer"}}/>
                    </TableCell>
                </TableRow> : ''
                )
            }) : 
                <TableRow>
                    <TableCell component="th" scope="row">
                        No hay cotizaciones
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
          count={clients ? clients.length : 0}
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

    <ClientDialog
        dialog={dialog} 
        closeDialog={closeDialog} 
        handleChange={handleChange} 
        client={client}
        deleteLead={deleteLead}
        clearLead={clearLead}
        submitLead={submitLead}
        updateLead={updateLead}/>
  </div>)
}

export default ClientTable
