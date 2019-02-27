import React, {useState} from 'react'
import { Drawer, Divider, Button, Dialog, DialogTitle, DialogActions, FormControl, MenuItem, Select } from '@material-ui/core';
import '../styles.css'
import FormDialog from './FormDialog';
import FileUpload from './FileUpload';

const LeadDrawer = ({drawer, closeDrawer, leads,lead, deleteLead, handleChange, 
    handleDateChange, loading, updateLead, dialog, closeDialog, openDialog, updateLeadState}) => {
    
    const [ open, setOpen] = useState(false)
    let toggleDialog = () => setOpen(!open)

  return (
    <Drawer anchor="right" open={drawer} onClose={closeDrawer}>
        <div className="drawer-layout">
            <h2>Detalles de {lead.bussinessName}</h2>
            <FormControl>
                <Select
                    className="drawer-status"
                    value={lead.status}
                    onChange={handleDateChange(lead._id, lead, lead.status)} //Se utiliza la misma función de fecha
                    inputProps={{
                    name: 'status',
                    id: 'status',
                    }}
                >
                <MenuItem value={'Propuesta'} >Propuesta</MenuItem>
                <MenuItem value={'Negociación'} >Negociación</MenuItem>
                <MenuItem value={'Confirmación de pedido'} >Confirmación de pedido (Ganada)</MenuItem>
                <MenuItem value={'Perdida'} >Perdida</MenuItem>
                <MenuItem value={'Primer Cobro'} >Primer cobro</MenuItem>
                </Select>
            </FormControl>
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
                {/* Comentarios del lead*/}
                <p className="small-font">Comentarios:</p>
                <p className="blue-font">{lead.commentText}</p>
                {lead.status === 'Propuesta' ? <Button style={{margin:"0.5rem"}} variant="contained">Cotizar</Button> : ''}
                <Divider />
                <p className="small-font">Archivos:</p>
                {/* Manejo de archivos */}
                <FileUpload updateLeadState={updateLeadState} lead={lead}/>

            </div>
            {/* Botones de acción para Drawer */}
            <div className="button-container">
                <Button variant="contained" onClick={closeDrawer} >Cerrar</Button>
                <Button onClick={toggleDialog} variant="contained" color="secondary">
                    Borrar
                </Button>
                <Button onClick={() =>{openDialog(lead,'update')}} variant="contained" color="primary">
                    Editar
                </Button>
            </div>
        </div>
        {/* Diálogo de confirmación para eliminar lead */}
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
                <Button onClick={() => {deleteLead(lead._id); toggleDialog(); closeDrawer()}} color="secondary" autoFocus>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
        {/* Diálogo para edición de lead */}
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