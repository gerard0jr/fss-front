import React, { useState } from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow,
         TablePagination, CircularProgress, Tooltip, Grid, TextField, MenuItem, InputAdornment } from '@material-ui/core'
import { updateBill } from '../../services/bills'
import './styles.css'
import { FilterList } from '@material-ui/icons';
require('moment/locale/es')

const BillsTable = ({bills, page, rowsPerPage, handleChangePage, loading, orderById, handleStatus, getBills}) => {

    const [ arrayFilter, setArrayFilter ] = useState('')
    let handleArrayFilter = e => setArrayFilter(e.target.value)

    let handleBill = bill => e => {
        bill[e.target.name] = e.target.value
        updateBill(bill, bill._id)
            .then(upBill => this.setState({dialog: false, open: true, message:'Factura actualizada'}, getBills))
            .catch(err => console.log(err))
    }
    
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
                <TableCell>OC</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Estatus</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {bills.length ? bills.filter(bill => bill.client ?
                bill.id.includes(arrayFilter.toUpperCase()) || 
                bill.client.bussinessName.toLowerCase().includes(arrayFilter.toLowerCase()) : [] ).map((bill, k) => {
                return (
                //el 5 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 5) + 5) && k >= (page * 5))  && bill.active ? 
                <TableRow key={k}>
                    {/* Detalle */}
                    <TableCell>{bill.id}</TableCell>
                    <TableCell>{bill.order}</TableCell>
                    <TableCell>
                        {bill.client ? bill.client.bussinessName : null}
                    </TableCell>
                    <TableCell>
                        {bill.contact}
                    </TableCell>
                    <TableCell>
                        <TextField
                            select
                            value={bill.status}
                            onChange={handleBill(bill)} 
                            name='status'
                            id='status'
                            InputProps={{
                            startAdornment: 
                                <InputAdornment position="start">
                                    <div 
                                        style={bill.status === 'Generada' ? {backgroundColor:"#f3f300"} : bill.status === 'Enviada' ? {backgroundColor:"#6E6EFF"} : {backgroundColor:"#00CC2C"}}
                                        className="circle">    
                                    </div>
                                </InputAdornment>
                            }}
                        >
                            <MenuItem value={'Generada'} >Generada</MenuItem>
                            <MenuItem value={'Enviada'} >Enviada</MenuItem>
                            <MenuItem value={'Pagada'} >Pagada</MenuItem>
                        </TextField>
                    </TableCell>
                </TableRow> : ''
                );
            }) : <TableRow>
                    <TableCell style={{width:"200px", padding: "5px"}} component="th" scope="row">
                       {loading ? 'Cargando...' : 'No hay facturas'}
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
          count={bills ? bills.length : 0}
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

export default BillsTable
