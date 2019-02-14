import React from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, 
    TablePagination, CircularProgress, Grid, FormControl, Select, MenuItem } from '@material-ui/core'
import { Edit } from '@material-ui/icons';
import FormDialog from './FormDialog';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'

const LeadsTable = ({leads, rowsPerPage, page, handleChangePage, 
    handleChangeRowsPerPage, deleteLead, dialog, closeDialog, handleChange, lead,
    clearLead, submitLead, openDialog, updateLead, handleDateChange, loading}) => {
  return (<div>
    <Paper id="tablas" style={{width:"100%", margin: "1em auto", padding:"1em"}}>
    <div style={{overflowX: 'auto'}}>
        <Table>
            <TableHead>
            <TableRow>
                <TableCell>ID</TableCell>
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
                <TableCell>Estatus</TableCell>
                <TableCell>Reunión</TableCell>
                <TableCell></TableCell>
                <TableCell>Comentarios</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Cotización</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {leads.length ? leads.map((lead, k) => {
                return (
                //el 10 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 10) + 10) && k >= (page * 10)) ? 
                <TableRow key={k}>
                    <TableCell style={{width:"200px", padding: "8px"}}>{`${lead.prefix}-${lead.seller}-${lead.number}`}</TableCell>
                    <TableCell component="th" scope="row">
                        {lead.bussinessName}
                    </TableCell>
                    <TableCell>{lead.bussinessRole}</TableCell>
                    <TableCell>{lead.bussinessEmployees}</TableCell>
                    <TableCell style={{width:"200px", padding: "8px"}}>{lead.bussinessAddress}</TableCell>
                    <TableCell>{lead.contactName}</TableCell>
                    <TableCell>{lead.contactPosition}</TableCell>
                    <TableCell><a style={{color:"#1976d2"}} href={`tel:+${lead.contactPhone}`}>{lead.contactPhone}</a></TableCell>
                    <TableCell><a style={{color:"#1976d2"}} href={`mailto:${lead.contactEmail}`}>{lead.contactEmail}</a></TableCell>
                    <TableCell>{lead.industry}</TableCell>
                    <TableCell>{lead.origin}</TableCell>
                    {/* Opciones de interesado */}
                    <TableCell>
                        <FormControl>
                            <Select
                                value={lead.status}
                                onChange={handleDateChange(lead._id, lead, lead.status)}
                                inputProps={{
                                name: 'status',
                                id: 'status',
                                }}
                            >
                            <MenuItem value={'Propuesta'} >Propuesta</MenuItem>
                            <MenuItem value={'Negociación'} >Negociación</MenuItem>
                            <MenuItem value={'Confirmación de pedido'} >Confirmación de pedido (Ganada)</MenuItem>
                            <MenuItem value={'Perdida'} >Perdida</MenuItem>
                            <MenuItem value={'Primer cobro'} >Primer cobro</MenuItem>
                            </Select>
                        </FormControl>
                    </TableCell>
                    {/* Inputs de fecha y hora de reunión */}
                    <TableCell style={{width:"200px", padding: "8px"}}> 
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale} views={['year']}>
                            <Grid container justify="space-around">
                            <DatePicker
                                okLabel="Guardar"
                                cancelLabel="Cancelar"
                                label="Fecha"
                                value={lead.meetingDate}
                                onChange={handleDateChange(lead._id, lead, null)}
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
                                value={lead.meetingDate}
                                onChange={handleDateChange(lead._id, lead, null)}
                            />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </TableCell>
                    {/* Comentarios */}
                    <TableCell>{lead.commentText}</TableCell>
                    {/* Botón de editar */}
                    <TableCell>
                        <Edit onClick={() => openDialog(lead, 'update')} style={{fontSize: "17px", cursor:"pointer"}}/>
                    </TableCell>
                    <TableCell>Cotizar</TableCell>
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
