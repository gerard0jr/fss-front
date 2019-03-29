import React from 'react'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import '../styles.css'

const ClientDialog = ({ dialog, closeDialog, handleChange, dialogNew, client={}, submitClient, deleteClient }) => {
  return (
    <Dialog
            open={dialogNew || dialog}
            onClose={closeDialog}
            aria-labelledby="new-form"
        >
            <DialogTitle>{dialogNew ? 'Agregar cliente' : `Editar ${client.bussinessName}`}</DialogTitle>
            <DialogContent>
                {/* FORM */}
                <form className="sales-oportunity-fields" autoComplete="off">
                    <div>
                        <TextField
                            required
                            className="text-field"
                            id="bussinessName"
                            label="Nombre de la empresa"
                            value={client.bussinessName}
                            onChange={handleChange}
                        />
                
                        <TextField
                            required
                            className="text-field"
                            id="bussinessAddress"
                            label="Dirección"
                            value={client.bussinessAddress}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            className="text-field"
                            id="bussinessRole"
                            label="Giro"
                            value={client.bussinessRole}
                            onChange={handleChange}
                        />

                        <TextField
                            className="text-field"
                            type="text"
                            id="industry"
                            label="Industria"
                            value={client.industry}
                            onChange={handleChange}
                        />

                        <FormControl className="text-field">
                            <InputLabel shrink htmlFor="origin">Origen</InputLabel>
                            <Select
                                required
                                value={client.origin}
                                onChange={handleChange}
                                inputProps={{
                                name: 'Origen',
                                id: 'origin',
                                }}
                            >
                            <MenuItem value="" disabled>
                                <em>Selecciona  </em>
                            </MenuItem>
                            <MenuItem value={'Nacional'} >Nacional</MenuItem>
                            <MenuItem value={'Extranjero'} >Extranjero</MenuItem>
                            </Select>
                        </FormControl>
                
                        <TextField
                            required
                            type="number"
                            className="text-field"
                            id="bussinessEmployees"
                            label="No. de empleados"
                            value={client.bussinessEmployees}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </DialogContent>
            {dialogNew ? 
                <DialogActions>
                <Button onClick={closeDialog} >Cancelar</Button>
                <Button onClick={submitClient} color="primary" variant="contained">
                    Agregar
                </Button> 
            </DialogActions>: 
            <DialogActions>
                <Button onClick={closeDialog} >Cancelar</Button>
                <Button onClick={() => deleteClient(client._id)} color="secondary" variant="contained" >Borrar</Button>
                <Button onClick={() => submitClient('update')} color="primary" variant="contained">
                    Actualizar
                </Button> 
            </DialogActions>}
                
            
        </Dialog>
  )
}

export default ClientDialog
