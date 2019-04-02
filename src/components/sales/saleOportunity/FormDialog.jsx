import React, {useState, useEffect} from 'react'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import '../styles.css'
import { allClients } from '../../../services/clients'

const FormDialog = ({dialog, closeDialog, handleChange, lead, clearLead, 
    submitLead, updateLead, dialogNew, closeDrawer}) => {

        const [bussinesses, setBussinesses] = useState([])	
        useEffect(() => {	
            const fetchData = async () => {	
                const result = await allClients()	
                    .then(clients => clients.data.sort((a, b) => a.bussinessName.localeCompare(b.bussinessName)))	
                    .catch(err => err)	
                setBussinesses(result)	
            }	
            fetchData()	
        }, [])

  return (
    <Dialog
            open={dialogNew || dialog}
            onClose={closeDialog}
            aria-labelledby="new-form"
        >
            <DialogTitle>{dialogNew ? 'Nuevo Deal' : `Editar deal ${lead.prefix}-${lead.seller}-${lead.number} de ${lead.clientName ? lead.clientName.bussinessName : ''}`}</DialogTitle>
            <DialogContent>
                {/* FORM */}
                <form className="sales-oportunity-fields" autoComplete="off">
                    <div>
                        {dialogNew ?
                        <FormControl className="text-field">	
                            <InputLabel shrink>Cliente</InputLabel>	
                            <Select	
                                required	
                                onChange={handleChange}	
                                value={lead.clientName}	
                                inputProps={{	
                                name: 'clientName',	
                                id: 'clientName',	
                                }}	
                            >	
                            <MenuItem value="" disabled>	
                                <em>Clientes</em>	
                            </MenuItem>	
                            {bussinesses.length ? 	
                                bussinesses.filter(buss => buss.active === true).map((bussiness, k) => 	
                                    <MenuItem 	
                                        key={k} 	
                                        value={bussiness._id}>	
                                        {bussiness.bussinessName}</MenuItem>) :	
                                        <MenuItem>No hay clientes</MenuItem>}	
                            </Select> 	
                        </FormControl>
                            : 	
                           ''}	

                        <TextField
                            required
                            className="text-field"
                            id="contactName"
                            name="contactName"
                            label="Nombre del contacto"
                            defaultValue={lead.contactName}
                            onBlur={handleChange}
                        />
                
                        <TextField
                            required
                            className="text-field"
                            id="contactPosition"
                            name="contactPosition"
                            label="Puesto del contacto"
                            defaultValue={lead.contactPosition}
                            onBlur={handleChange}
                        />
                    
                        <TextField  
                            required
                            className="text-field"
                            id="contactPhone"
                            name="contactPhone"
                            label="Teléfono"
                            defaultValue={lead.contactPhone}
                            onBlur={handleChange}
                        />
                    
                        <TextField
                            required
                            className="text-field"
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            label="Email"
                            defaultValue={lead.contactEmail}
                            onBlur={handleChange}
                        />

                        <TextField
                            className="text-field"
                            type="text"
                            id="commentText"
                            name="commentText"
                            label="Comentarios"
                            defaultValue={lead.commentText}
                            onBlur={handleChange}
                        />

                    </div>
                </form>
            </DialogContent>
           
            {dialogNew ? 
                <DialogActions>
                <Button onClick={closeDialog} >Cancelar</Button>
                <Button onClick={clearLead} variant="outlined" >Limpiar</Button>
                <Button disabled={!lead.clientName ? true : false} onClick={submitLead} color="primary" variant="contained">
                    Agregar
                </Button> 
            </DialogActions>: 
            <DialogActions>
                <Button onClick={() => {closeDialog(); closeDrawer()}} >Cancelar</Button>
                <Button onClick={() => { updateLead(lead._id)}} color="primary" variant="contained">
                    Actualizar
                </Button> 
            </DialogActions>}
                
            
        </Dialog>
  )
}

export default FormDialog
