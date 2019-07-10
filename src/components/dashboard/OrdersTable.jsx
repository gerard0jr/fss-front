import React, { useState } from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow,
         TablePagination, CircularProgress, Tooltip, Grid, TextField, MenuItem, InputAdornment } from '@material-ui/core'
import { updateOrder } from '../../services/orders'
import './styles.css'
import { FilterList } from '@material-ui/icons';
require('moment/locale/es')

const OrdersTable = ({orders, page, rowsPerPage, handleChangePage, loading, orderById, handleStatus, getOrders}) => {

    const [ arrayFilter, setArrayFilter ] = useState('')
    let handleArrayFilter = e => setArrayFilter(e.target.value)

    let handleOrder = order => e => {
        order[e.target.name] = e.target.value
        updateOrder(order, order._id)
            .then(upOrder => this.setState({dialog: false, open: true, message:'Orden actualizada'}, getOrders))
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
                <TableCell>Cliente</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Estatus</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {orders.length ? orders.filter(order => order.client ?
                order.id.includes(arrayFilter.toUpperCase()) || 
                order.client.bussinessName.toLowerCase().includes(arrayFilter.toLowerCase()) : [] ).map((order, k) => {
                return (
                //el 5 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 5) + 5) && k >= (page * 5))  && order.active ? 
                <TableRow key={k}>
                    {/* Detalle */}
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                        {order.client ? order.client.bussinessName : null}
                    </TableCell>
                    <TableCell>
                        {order.contact}
                    </TableCell>
                    <TableCell>
                        <TextField
                            select
                            value={order.status}
                            onChange={handleOrder(order)} 
                            name='status'
                            id='status'
                            InputProps={{
                            startAdornment: 
                                <InputAdornment position="start">
                                    <div 
                                        style={order.status === 'Generada' ? {backgroundColor:"#f3f300"} : order.status === 'Enviada' ? {backgroundColor:"#6E6EFF"} : {backgroundColor:"#00CC2C"}}
                                        className="circle">    
                                    </div>
                                </InputAdornment>
                            }}
                        >
                            <MenuItem value={'Generada'} >Generada</MenuItem>
                            <MenuItem value={'Enviada'} >Enviada</MenuItem>
                            <MenuItem value={'Facturada'} >Facturada</MenuItem>
                        </TextField>
                    </TableCell>
                </TableRow> : ''
                );
            }) : <TableRow>
                    <TableCell style={{width:"200px", padding: "5px"}} component="th" scope="row">
                       {loading ? 'Cargando...' : 'No hay órdenes'}
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
          count={orders ? orders.length : 0}
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

export default OrdersTable
