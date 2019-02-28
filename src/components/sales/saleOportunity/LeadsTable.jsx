import React, { useState } from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, 
    TablePagination, CircularProgress, Grid, FormControl, Select, MenuItem, Fab, TextField, Tooltip } from '@material-ui/core'
import { Edit, FilterList } from '@material-ui/icons';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'
import LeadDrawer from './LeadDrawer';

const LeadsTable = ({leads, rowsPerPage, page, handleChangePage, 
    handleChangeRowsPerPage, deleteLead, dialog, closeDialog, handleChange, lead, 
    openDialog, updateLead, handleDateChange, loading, openDrawer, closeDrawer, 
    drawer, updateLeadState}) => {
        const [ arrayFilter, setArrayFilter ] = useState('')
        let handleArrayFilter = e => setArrayFilter(e.target.value)
  return (<div>
    <Paper id="tablas" style={{width:"100%", margin: "1em auto", padding:"1em"}}>
    <div style={{overflowX: 'auto'}}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h4 style={{textAlign:"left", marginLeft:"1rem"}}>Leads</h4>
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
                    <TableCell style={{width:"40px", padding: "8px"}}>Ver/Editar</TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell>Empresa</TableCell>
                    <TableCell>Contacto</TableCell>
                    <TableCell>Teléfono</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Estatus</TableCell>
                    <TableCell>Reunión</TableCell>
                    <TableCell style={{width:'200px', padding:"0 45px"}}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {leads.length ? 
            leads.filter(lead =>
                lead.prefix.concat('-',lead.seller,'-',lead.number).includes(arrayFilter.toUpperCase()) || 
                lead.bussinessName.toLowerCase().includes(arrayFilter.toLowerCase()) ).map((lead, k) => {
                return (
                //el 10 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 10) + 10) && k >= (page * 10)) ? 
                <TableRow key={k}>
                    {/* Detalle */}
                    <TableCell style={{width: "40px", padding: "8px", textAlign: "center"}}>
                        <Fab 
                            onClick={() => openDrawer(lead)} 
                            variant="extended" 
                            color="primary" 
                            size="small"
                        >
                            <Edit fontSize="small" />
                        </Fab>
                    </TableCell>
                    <TableCell style={{width:"200px", padding: "8px"}}>{`${lead.prefix}-${lead.seller}-${lead.number}`}</TableCell>
                    <TableCell component="th" scope="row">
                        {lead.bussinessName}
                    </TableCell>
                    <TableCell>{lead.contactName}</TableCell>
                    <TableCell><a style={{color:"#1976d2"}} href={`tel:+${lead.contactPhone}`}>{lead.contactPhone}</a></TableCell>
                    <TableCell><a style={{color:"#1976d2"}} href={`mailto:${lead.contactEmail}`}>{lead.contactEmail}</a></TableCell>
                    {/* Opciones de interesado */}
                    <TableCell>
                        <FormControl>
                            <Select
                                value={lead.status}
                                onChange={handleDateChange(lead._id, lead, lead.status)} //Se utiliza la misma función de fecha
                                inputProps={{
                                name: 'status',
                                id: 'status',
                                }}
                            >
                            <MenuItem value={'Propuesta'} >Propuesta</MenuItem>
                            <MenuItem value={'Negociación'} >Negociación</MenuItem>
                            <MenuItem value={'Confirmación de pedido'} >Confirmación de pedido (Ganada)</MenuItem>
                            <MenuItem value={'Perdida'} >Perdida</MenuItem>
                            <MenuItem value={'Primer Cobro'} >Primer cobro</MenuItem>
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

    <LeadDrawer 
            drawer={drawer}
            closeDrawer={closeDrawer}
            leads={leads}
            deleteLead={deleteLead} 
            handleChange={handleChange} 
            lead={lead}
            updateLead={updateLead}
            handleDateChange={handleDateChange}
            loading={loading}
            dialog={dialog}
            closeDialog={closeDialog}
            openDialog={openDialog}
            updateLeadState={updateLeadState}
        />
  </div>)
}

export default LeadsTable
