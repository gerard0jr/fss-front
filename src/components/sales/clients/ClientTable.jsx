import React, {useState} from 'react'
import { Table, TableBody, TableHead, TableCell, TableRow, Paper, 
    TablePagination, CircularProgress, Grid, TextField, Tooltip, Fab} from '@material-ui/core'
import { Edit, FilterList } from '@material-ui/icons';
import ClientDialog from './ClientDialog';

const ClientTable = ({rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, dialog, 
    closeDialog, handleChange, openDialog, loading, client, clients=[], submitClient, deleteClient}) => {
        
        const [ arrayFilter, setArrayFilter ] = useState('')
        let handleArrayFilter = e => setArrayFilter(e.target.value)

  return (<div>
    <Paper id="tablas" style={{width:"100%", margin: "1em auto", padding:"1em"}}>
    <div style={{overflowX: 'auto'}}>
    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h4 style={{textAlign:"left", marginLeft:"1rem"}}>Clientes</h4>
        <Tooltip title="Filtrar lista" placement="bottom">
            <Grid style={{width:"auto"}} container alignItems="flex-end">
            <Grid item>
                <TextField onChange={handleArrayFilter} value={arrayFilter} id="search-on-table" label="Folio/Empresa" />
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
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Giro</TableCell>
                <TableCell>Industria</TableCell>
                <TableCell>Origen</TableCell>
                <TableCell>Empleados</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {clients.length ? clients.map((client, k) => {
                return (
                //el 10 se reemplaza por el número de filas en la tabla para la paginación
                (k < ((page * 10) + 10) && k >= (page * 10)) && client.active ? 
                <TableRow key={k}>
                    <TableCell style={{width: "40px", padding: "8px", textAlign: "center"}}>
                        <Fab
                            onClick={() => openDialog(client, 'update')} 
                            variant="extended" 
                            color="primary" 
                            size="small"
                        >
                            <Edit fontSize="small" />
                        </Fab>
                    </TableCell>
                    <TableCell>ID</TableCell>
                    <TableCell component="th" scope="row">
                        {client.bussinessName}
                    </TableCell>
                    <TableCell style={{width:"200px", padding: "8px"}}>{client.bussinessAddress}</TableCell>
                    <TableCell>{client.bussinessRole}</TableCell>
                    <TableCell>{client.industry}</TableCell>
                    <TableCell>{client.origin}</TableCell>
                    <TableCell>{client.bussinessEmployees}</TableCell>
                </TableRow> : ''
                )
            }) : 
            <TableRow>
                <TableCell style={{width:"200px", padding: "5px"}} component="th" scope="row">
                {loading ? 'Cargando...' : 'No hay clientes'}
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
          count={clients ? clients.filter(client => client.active === true).length : 0}
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
        submitClient={submitClient}
        deleteClient={deleteClient}
    />
  </div>)
}

export default ClientTable
