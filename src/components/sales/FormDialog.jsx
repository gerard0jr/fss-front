import React from 'react'
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, 
    Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import './styles.css'

const FormDialog = ({dialog, closeDialog, handleChange, lead, clearLead, 
    submitLead, updateLead, deleteLead, dialogNew}) => {
  return (
    <Dialog
            open={dialogNew || dialog}
            onClose={closeDialog}
            aria-labelledby="new-form"
        >
            <DialogTitle>{dialogNew ? 'Nuevo Lead' : `Editar ${lead.bussinessName}`}</DialogTitle>
            <DialogContent>
                {/* FORM */}
                <form className="sales-oportunity-fields" autoComplete="off">
                    <div>
                        <TextField
                            required
                            className="text-field"
                            id="bussinessName"
                            label="Nombre de la empresa"
                            value={lead.bussinessName}
                            onChange={handleChange}
                        />
                    
                        <TextField
                            required
                            className="text-field"
                            id="bussinessRole"
                            label="Giro de la empresa"
                            value={lead.bussinessRole}
                            onChange={handleChange}
                        />
                
                        <TextField
                            required
                            className="text-field"
                            id="bussinessAddress"
                            label="Dirección"
                            value={lead.bussinessAddress}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            className="text-field"
                            id="industry"
                            label="Industria"
                            value={lead.industry}
                            onChange={handleChange}
                        />
                        
                        <FormControl className="text-field">
                            <InputLabel shrink htmlFor="origin">Origen</InputLabel>
                            <Select
                                required
                                value={lead.origin}
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
                            value={lead.bussinessEmployees}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            className="text-field"
                            id="contactName"
                            label="Nombre del contacto"
                            value={lead.contactName}
                            onChange={handleChange}
                        />
                
                        <TextField
                            required
                            className="text-field"
                            id="contactPosition"
                            label="Puesto del contacto"
                            value={lead.contactPosition}
                            onChange={handleChange}
                        />
                    
                        <TextField  
                            required
                            className="text-field"
                            id="contactPhone"
                            label="Teléfono"
                            value={lead.contactPhone}
                            onChange={handleChange}
                        />
                    
                        <TextField
                            required
                            className="text-field"
                            type="email"
                            id="contactEmail"
                            label="Email"
                            value={lead.contactEmail}
                            onChange={handleChange}
                        />

                        <TextField
                            className="text-field"
                            type="text"
                            id="commentText"
                            label="Comentarios"
                            value={lead.commentText}
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
                <Button onClick={() => deleteLead(lead._id)} color="secondary" variant="contained" >Borrar</Button>
                <Button onClick={() => updateLead(lead._id)} color="primary" variant="contained">
                    Actualizar
                </Button> 
            </DialogActions>}
                
            
        </Dialog>
  )
}

export default FormDialog
