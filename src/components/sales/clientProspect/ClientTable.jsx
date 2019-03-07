import React, {useState} from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, 
    TablePagination, CircularProgress, Grid, TextField, Tooltip} from '@material-ui/core'
import { Edit, FilterList } from '@material-ui/icons';
import ClientDialog from './ClientDialog';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns'
import esLocale from 'date-fns/locale/es'

const ClientTable = ({rowsPerPage, page, handleChangePage, 
    handleChangeRowsPerPage, dialog, closeDialog, handleChange, quotation,
    openDialog, quotations=[], loading, handleQuotation, handleDateChange, updateQuot}) => {
        const [ arrayFilter, setArrayFilter ] = useState('')
        let handleArrayFilter = e => setArrayFilter(e.target.value)
  return (<div>
    <Paper id="tablas" style={{width:"100%", margin: "1em auto", padding:"1em"}}>
    <div style={{overflowX: 'auto'}}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h4 style={{textAlign:"left", marginLeft:"1rem"}}>Cotizaciones</h4>
        <Tooltip title="Filtrar lista" placement="bottom">
            <Grid style={{width:"auto"}} container alignItems="flex-end">
            <Grid item>
                <TextField onChange={handleArrayFilter}  id="search-on-table" label="Folio/Empresa" />
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
            {quotations.length ? quotations.map((quotation, k) => {
                return (
                //el 10 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 10) + 10) && k >= (page * 10)) ? 
                <TableRow key={k}>
                    <TableCell>Folio</TableCell>
                    <TableCell component="th" scope="row">
                        {quotation.quotBussinessName}
                    </TableCell>
                    <TableCell style={{width:"200px", padding: "8px"}}>{quotation.quotBussinessAddr}</TableCell>
                    <TableCell>{quotation.quotContactName}</TableCell>
                    {/* Inputs de fecha y hora de reunión */}
                    <TableCell style={{width:"200px", padding: "8px"}}> 
                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale} views={['year']}>
                            <Grid container justify="space-around">
                            <DatePicker
                                okLabel="Guardar"
                                cancelLabel="Cancelar"
                                label="Fecha"
                                value={quotation.quotDate}
                                onChange={handleDateChange(quotation._id, quotation, null, 'quotation')}
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
                                value={quotation.quotDate}
                                onChange={handleDateChange(quotation._id, quotation, null, 'quotation')}
                            />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell>{quotation.reqType}</TableCell>
                    {/* Botón de editar */}
                    <TableCell>
                        <Edit onClick={() => openDialog(quotation, 'updateQuot')} style={{fontSize: "17px", cursor:"pointer"}}/>
                    </TableCell>
                </TableRow> : ''
                )
            }) : 
            <TableRow>
                <TableCell style={{width:"200px", padding: "5px"}} component="th" scope="row">
                {loading ? 'Cargando...' : 'No hay cotizaciones'}
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
          count={quotations ? quotations.length : 0}
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
        quotation={quotation}
        handleQuotation={handleQuotation}
        updateQuot={updateQuot}
    />
  </div>)
}

export default ClientTable
