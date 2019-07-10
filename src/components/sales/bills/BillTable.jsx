import React, {useState} from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, 
    TablePagination, CircularProgress, Grid, TextField, Tooltip, Fab, MenuItem, InputAdornment} from '@material-ui/core'
import { Edit, FilterList } from '@material-ui/icons';
import BillDialog from './BillDialog';

const BillTable = ({rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, dialog, 
    closeDialog, handleChange, openDialog, loading, bill, bills=[], submitBill, deleteBill, handleStatus}) => {
        
        const [ arrayFilter, setArrayFilter ] = useState('')
        let handleArrayFilter = e => setArrayFilter(e.target.value)

  return (<div>
    <Paper id="tablas" style={{width:"100%", margin: "1em auto", padding:"1em"}}>
    <div style={{overflowX: 'auto'}}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h4 style={{textAlign:"left", marginLeft:"1rem"}}>Facturas</h4>
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
                <TableCell style={{width:"40px", padding: "8px"}}>Factura</TableCell>
                <TableCell>OC</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Contacto</TableCell>
                <TableCell>Responsable</TableCell>
                <TableCell>Estado</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {bills.length ? bills.filter(bill => bill.id.includes(arrayFilter) ).map((bill, k) => {
                return (
                //el 10 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 10) + 10) && k >= (page * 10)) && bill.active ? 
                <TableRow key={k}>
                    <TableCell style={{width: "40px", padding: "8px", textAlign: "center"}}>
                        <Fab
                            onClick={() => openDialog(bill, 'update')} 
                            variant="extended" 
                            color="primary" 
                            size="small"
                        >
                            <Edit fontSize="small" />
                        </Fab>
                    </TableCell>
                    <TableCell style={{width:"40px", padding: "8px"}}>{bill.id}</TableCell>
                    <TableCell>{bill.order}</TableCell>
                    <TableCell component="th" scope="row">
                        {bill.client ? bill.client.bussinessID : null}
                    </TableCell>
                    <TableCell>{bill.contact}</TableCell>
                    <TableCell>{bill.responsible}</TableCell>
                    <TableCell>
                        <TextField
                            select
                            value={bill.status}
                            onChange={handleStatus(bill)}
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
                )
            }) : 
            <TableRow>
                <TableCell style={{width:"200px", padding: "5px"}} component="th" scope="row">
                {loading ? 'Cargando...' : 'No hay facturas'}
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
          count={bills ? bills.filter(bill => bill.active === true).length : 0}
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

    <BillDialog
        dialog={dialog} 
        closeDialog={closeDialog} 
        handleChange={handleChange} 
        bill={bill}
        submitBill={submitBill}
        deleteBill={deleteBill}
    />
  </div>)
}

export default BillTable
