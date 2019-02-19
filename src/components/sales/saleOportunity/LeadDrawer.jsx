import React, {useState} from 'react'
import { Drawer, Divider, Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import '../styles.css'
import FormDialog from './FormDialog';

const LeadDrawer = ({drawer, closeDrawer, leads,lead, deleteLead, handleChange, 
    handleDateChange, loading, updateLead, dialog, closeDialog, openDialog}) => {
    
    const [ open, setOpen] = useState(false)
    let toggleDialog = () => setOpen(!open)

  return (
    <Drawer anchor="right" open={drawer} onClose={closeDrawer}>
        <div className="drawer-layout">
            <h2>Detalles de {lead.bussinessName}</h2>
            <p className="drawer-status">{lead.status}</p> 
            <Divider variant="middle" />
            <div className="drawer-two-columns">
                <div className="left-column">
                    <p className="small-font" >Contacto:</p>
                    <p className="blue-font">
                        {lead.contactName ? lead.contactName : 'Ninguno'} 
                        <small style={{color:"gray"}}> ({lead.contactPosition ? lead.contactPosition : '-'})</small>
                    </p>
                    <p className="small-font">Teléfono:</p>
                    <p className="blue-font">{lead.contactPhone ? lead.contactPhone : '-'}</p>
                    <p className="small-font">Email:</p>
                    <p className="blue-font">{lead.contactEmail ? lead.contactEmail : 'Sin email'}</p>
                    <p className="small-font">Dirección:</p>
                    <p className="blue-font">{lead.bussinessAddress ? lead.bussinessAddress : 'Sin dirección'}</p>
                </div>
                <div className="right-column">
                    <p className="small-font">Giro:</p>
                    <p className="blue-font">{lead.bussinessRole ? lead.bussinessRole : 'Sin giro'}</p>
                    <p className="small-font">Industria:</p>
                    <p className="blue-font">{lead.industry ? lead.industry : 'Sin industria'}</p>
                    <p className="small-font">Origen:</p>
                    <p className="blue-font">{lead.origin ? lead.origin : 'Sin origen'}</p>
                    <p className="small-font">Empleados:</p>
                    <p className="blue-font">{lead.bussinessEmployees ? lead.bussinessEmployees : 'Sin empleados'}</p>
                </div>
            </div>
            <Divider variant="middle" />
            <div className="">
                <p className="small-font">Comentarios:</p>
                <p className="blue-font">{lead.commentText}</p>
                <Divider />
                <p className="small-font">Archivos:</p>

            </div>
            <div className="button-container">
                <Button onClick={closeDrawer} >Cerrar</Button>
                <Button onClick={toggleDialog} variant="contained" color="secondary">
                    Borrar
                </Button>
                <Button onClick={() =>{openDialog(lead,'update')}} variant="contained" color="primary">
                    Editar
                </Button>
            </div>
        </div>
        <Dialog
            open={open}
            onClose={toggleDialog}
        >
            <DialogTitle>
                Eliminar {lead.bussinessName}
            </DialogTitle>
            <DialogActions>
                <Button onClick={toggleDialog} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => {deleteLead(lead._id); toggleDialog(); closeDrawer()}} color="primary" autoFocus>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
        <FormDialog 
        closeDrawer={closeDrawer}
        dialog={dialog} 
        closeDialog={closeDialog} 
        handleChange={handleChange} 
        lead={lead}
        updateLead={updateLead}/>
    </Drawer>)
}

export default LeadDrawer


// INFO:
// cotiazción
// http://maps.google.com/?q=your+query