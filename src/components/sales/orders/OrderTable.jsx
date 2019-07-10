import React, {useState} from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, 
    TablePagination, CircularProgress, Grid, TextField, Tooltip, Fab, MenuItem, InputAdornment} from '@material-ui/core'
import { Edit, FilterList } from '@material-ui/icons';
import OrderDialog from './OrderDialog';

const OrderTable = ({rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, dialog, 
    closeDialog, handleChange, openDialog, loading, order, orders=[], submitOrder, deleteOrder, handleStatus}) => {
        
        const [ arrayFilter, setArrayFilter ] = useState('')
        let handleArrayFilter = e => setArrayFilter(e.target.value)

  return (<div>
    <Paper id="tablas" style={{width:"100%", margin: "1em auto", padding:"1em"}}>
    <div style={{overflowX: 'auto'}}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h4 style={{textAlign:"left", marginLeft:"1rem"}}>Órdenes de compra</h4>
        <Tooltip title="Filtrar lista" placement="bottom">
            <Grid style={{width:"auto"}} container alignItems="flex-end">
            <Grid item>
                <TextField style={{maxWidth:"50px"}} onChange={handleArrayFilter} value={arrayFilter} id="search-on-table" label="ID" />
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
                <TableCell style={{width:"40px", padding: "8px"}}>Editar</TableCell>
                <TableCell style={{width:"40px", padding: "8px"}}>Orden</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Área/Depart.</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Responsable</TableCell>
                <TableCell>Vendedor</TableCell>
                <TableCell>Estado</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {orders.length ? orders.filter(order => order.id.includes(arrayFilter) ).map((order, k) => {
                return (
                //el 10 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 10) + 10) && k >= (page * 10)) && order.active ? 
                <TableRow key={k}>
                    <TableCell style={{width: "40px", padding: "8px", textAlign: "center"}}>
                        <Fab
                            onClick={() => openDialog(order, 'update')} 
                            variant="extended" 
                            color="primary" 
                            size="small"
                        >
                            <Edit fontSize="small" />
                        </Fab>
                    </TableCell>
                    <TableCell style={{width:"40px", padding: "8px"}}>{order.id}</TableCell>
                    <TableCell component="th" scope="row">
                        {order.client ? order.client.bussinessID : null}
                    </TableCell>
                    <TableCell>{order.area}</TableCell>
                    <TableCell>{order.contact}</TableCell>
                    <TableCell>{order.responsible}</TableCell>
                    <TableCell>{order.seller}</TableCell>
                    <TableCell>
                        <TextField
                            select
                            value={order.status}
                            onChange={handleStatus(order)} //Se utiliza la misma función de fecha
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
                )
            }) : 
            <TableRow>
                <TableCell style={{width:"200px", padding: "5px"}} component="th" scope="row">
                {loading ? 'Cargando...' : 'No hay órdenes de compra'}
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
          count={orders ? orders.filter(order => order.active === true).length : 0}
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

    <OrderDialog
        dialog={dialog} 
        closeDialog={closeDialog} 
        handleChange={handleChange} 
        order={order}
        submitOrder={submitOrder}
        deleteOrder={deleteOrder}
    />
  </div>)
}

export default OrderTable
