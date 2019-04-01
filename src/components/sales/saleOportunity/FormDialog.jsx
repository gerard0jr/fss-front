import React from 'react'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import '../styles.css'

const FormDialog = ({dialog, closeDialog, handleChange, lead, clearLead, 
    submitLead, updateLead, dialogNew, closeDrawer}) => {

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
                        <TextField
                            required
                            className="text-field"
                            id="contactName"
                            name="contactName"
                            label="Nombre del contacto"
                            value={lead.contactName}
                            onBlur={handleChange}
                        />
                
                        <TextField
                            required
                            className="text-field"
                            id="contactPosition"
                            name="contactPosition"
                            label="Puesto del contacto"
                            value={lead.contactPosition}
                            onBlur={handleChange}
                        />
                    
                        <TextField  
                            required
                            className="text-field"
                            id="contactPhone"
                            name="contactPhone"
                            label="Teléfono"
                            value={lead.contactPhone}
                            onBlur={handleChange}
                        />
                    
                        <TextField
                            required
                            className="text-field"
                            type="email"
                            id="contactEmail"
                            name="contactEmail"
                            label="Email"
                            value={lead.contactEmail}
                            onBlur={handleChange}
                        />

                        <TextField
                            className="text-field"
                            type="text"
                            id="commentText"
                            name="commentText"
                            label="Comentarios"
                            value={lead.commentText}
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
