import React from 'react'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, 
    Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import '../styles.css'

const ClientDialog = ({dialog, closeDialog, handleChange, client = {}, clearLead, 
    submitLead, updateLead, deleteLead, dialogNew}) => {
  return (
    <Dialog
            open={dialogNew || dialog}
            onClose={closeDialog}
            aria-labelledby="new-form"
        >
            <DialogTitle>{dialogNew ? 'Nuevo Lead' : `Editar ${client.bussinessName}`}</DialogTitle>
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
                            id="bussinessRole"
                            label="Giro de la empresa"
                            value={client.bussinessRole}
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
                    <div>
                        <TextField
                            required
                            className="text-field"
                            id="contactName"
                            label="Nombre del contacto"
                            value={client.contactName}
                            onChange={handleChange}
                        />
                
                        <TextField
                            required
                            className="text-field"
                            id="contactPosition"
                            label="Puesto del contacto"
                            value={client.contactPosition}
                            onChange={handleChange}
                        />
                    
                        <TextField  
                            required
                            className="text-field"
                            id="contactPhone"
                            label="Teléfono"
                            value={client.contactPhone}
                            onChange={handleChange}
                        />
                    
                        <TextField
                            required
                            className="text-field"
                            type="email"
                            id="contactEmail"
                            label="Email"
                            value={client.contactEmail}
                            onChange={handleChange}
                        />

                        <TextField
                            className="text-field"
                            type="text"
                            id="commentText"
                            label="Comentarios"
                            value={client.commentText}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </DialogContent>
           
            {dialogNew ? 
                <DialogActions>
                <Button onClick={closeDialog} >Cancelar</Button>
                <Button onClick={clearLead} variant="outlined" >Limpiar</Button>
                <Button onClick={submitLead} color="primary" variant="contained">
                    Agregar
                </Button> 
            </DialogActions>: 
            <DialogActions>
                <Button onClick={closeDialog} >Cancelar</Button>
                <Button onClick={() => deleteLead(client._id)} color="secondary" variant="contained" >Borrar</Button>
                <Button onClick={() => updateLead(client._id)} color="primary" variant="contained">
                    Actualizar
                </Button> 
            </DialogActions>}
                
            
        </Dialog>
  )
}

export default ClientDialog
