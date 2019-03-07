import React from 'react'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import '../styles.css'

const ClientDialog = ({dialog, closeDialog, handleQuotation, dialogNew, submitQuotation,
     updateQuot, quotation}) => {
  return (
    <Dialog
            open={dialogNew || dialog}
            onClose={closeDialog}
            aria-labelledby="new-form"
        >
            <DialogTitle>{dialogNew ? 'Nueva cotización' : `Editar ${quotation.quotBussinessName}`}</DialogTitle>
            <DialogContent>
                {/* FORM */}
                <form className="sales-oportunity-fields" autoComplete="off">
                    <div>
                        <TextField
                            required
                            className="text-field"
                            id="quotBussinessName"
                            label="Nombre de la empresa"
                            value={quotation.quotBussinessName}
                            onChange={handleQuotation}
                        />
                
                        <TextField
                            required
                            className="text-field"
                            id="quotBussinessAddr"
                            label="Dirección"
                            value={quotation.quotBussinessAddress}
                            onChange={handleQuotation}
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            className="text-field"
                            id="quotContactName"
                            label="Nombre del contacto"
                            value={quotation.quotContactName}
                            onChange={handleQuotation}
                        />

                        <TextField
                            className="text-field"
                            type="text"
                            id="quotCommentText"
                            label="Comentarios"
                            value={quotation.quotCommentText}
                            onChange={handleQuotation}
                        />
                    </div>
                </form>
            </DialogContent>
            {dialogNew ? 
                <DialogActions>
                <Button onClick={closeDialog} >Cancelar</Button>
                <Button variant="outlined" >Limpiar</Button>
                <Button onClick={submitQuotation} color="primary" variant="contained">
                    Agregar
                </Button> 
            </DialogActions>: 
            <DialogActions>
                <Button onClick={closeDialog} >Cancelar</Button>
                <Button  color="secondary" variant="contained" >Borrar</Button>
                <Button  onClick={() => updateQuot(quotation._id)} color="primary" variant="contained">
                    Actualizar
                </Button> 
            </DialogActions>}
                
            
        </Dialog>
  )
}

export default ClientDialog
