import React from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, 
    TablePagination, CircularProgress, Grid, FormControlLabel, Checkbox } from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import ClientDialog from './ClientDialog';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'

const ClientTable = ({rowsPerPage, page, handleChangePage, 
    handleChangeRowsPerPage, deleteLead, dialog, closeDialog, handleChange, client,
    clearLead, submitLead, openDialog, updateLead, handleDateChange, clients}) => {
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
                <TableCell>Editar</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {clients ? clients.map((client, k) => {
                return (
                //el 10 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 10) + 10) && k >= (page * 10)) ? 
                <TableRow key={k}>
                    <TableCell component="th" scope="row">
                        {client.bussinessName}
                    </TableCell>
                    <TableCell>{client.bussinessRole}</TableCell>
                    <TableCell>{client.bussinessEmployees}</TableCell>
                    <TableCell style={{width:"200px", padding: "8px"}}>{client.bussinessAddress}</TableCell>
                    <TableCell>{client.contactName}</TableCell>
                    <TableCell>{client.contactPosition}</TableCell>
                    <TableCell><a style={{color:"#1976d2"}} href={`tel:+${client.contactPhone}`}>{client.contactPhone}</a></TableCell>
                    <TableCell><a style={{color:"#1976d2"}} href={`mailto:${client.contactEmail}`}>{client.contactEmail}</a></TableCell>
                    <TableCell>{client.industry}</TableCell>
                    <TableCell>{client.origin}</TableCell>
                    {/* Checkbox de interesado */}
                    <TableCell>
                        <FormControlLabel
                        control={
                            <Checkbox
                            checked={client.interested}
                            onChange={handleDateChange(client._id, client, client.interested)}
                            value={client.interested}
                            id='interested'
                            />
                        }
                        />
                    </TableCell>
                    {/* Inputs de fecha y hora de reunión */}
                    <TableCell style={{width:"200px", padding: "8px"}}> 
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale} views={['year']}>
                            <Grid container justify="space-around">
                            <DatePicker
                                okLabel="Guardar"
                                cancelLabel="Cancelar"
                                label="Fecha"
                                value={client.meetingDate}
                                onChange={handleDateChange(client._id, client, null)}
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
                                onChange={handleDateChange(client._id, client, null)}
                            />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </TableCell>
                    {/* Comentarios */}
                    <TableCell>{client.commentText}</TableCell>
                    {/* Botón de editar */}
                    <TableCell>
                        <Edit onClick={() => openDialog(client, 'update')} style={{fontSize: "17px", cursor:"pointer"}}/>
                    </TableCell>
                    <TableCell>Cotizar</TableCell>
                </TableRow> : ""
                );
            }) : <TableRow>
                    <TableCell component="th" scope="row">
                        Cargando cotizaciones
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
