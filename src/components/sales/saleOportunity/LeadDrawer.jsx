import React, { useState } from 'react'
import { Drawer, Divider, Button, Dialog, DialogTitle, DialogActions, FormControl, MenuItem, Select, DialogContent, TextField, InputLabel, Input, InputAdornment, Table, Paper, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from '@material-ui/core';

import '../styles.css'
import FormDialog from './FormDialog';
import FileUpload from './FileUpload';
import { newQuot, delQuot, actQuot } from '../../../services/quotations'
import Snack from '../../snackbar/Snack';
// Librerías para mostrar fecha y cantidades de dinero
import Currency from 'react-currency-formatter';
import moment from 'moment'
import { Delete, Edit } from '@material-ui/icons';
require('moment/locale/es')

const LeadDrawer = ({drawer, closeDrawer, leads,lead, deleteLead, handleChange, quotations, getQuotations,
    handleDateChange, loading, updateLead, dialog, closeDialog, openDialog, updateLeadState}) => {
    // Diálogo para confirmar eliminación de deal
    const [ open, setOpen] = useState(false)
    let toggleDialog = () => setOpen(!open)

    // Diálogo para crear nuevas cotizaciones
    const [ openQuot, setOpenQuot ] = useState(false)
    let toggleQuotation = () => setOpenQuot(!openQuot)
    
    // Diálogo para editar cotizaciones
    const [ editQuot, setEditQuot ] = useState(false)
    let toggleEditQuotation = quot => {
        if(editQuot) return setEditQuot(!editQuot)
        setEditQuot(!editQuot)
        setQuotation(quot);
    }

    // Manejo de cotizaciones
    const [ quotation, setQuotation ] = useState({})
    let handleQuotation = e => {
        quotation[e.target.name] = e.target.value
        setQuotation(quotation)
    }

    let submitQuotation = id => { 
        quotation.quotCounter = quotations.length ? quotations[quotations.length - 1].quotCounter + 1 : 1
        newQuot(id,quotation)
        .then(res => {
            openSnack('Cotización creada')
            getQuotations(id)
        })  
        .catch(err => err)
    }

    let delQuotation = (id, leadID) => 
        delQuot(id)
            .then(res => {
                openSnack('Cotización eliminada')
                getQuotations(leadID)
            })  
            .catch(err => err)

    let updateQuotation = (id, data, leadID) => 
        actQuot(id,data)
            .then(res => {
                openSnack('Cotización actualizada')
                getQuotations(leadID)
            })  
            .catch(err => err)

    // Snackbar con mensaje de confirmación de acciones
    const [snackbar, setSnackbar ] = useState(false)
    const [message, setMessage ] = useState('')
    let openSnack = message => {
        setMessage(message)
        setSnackbar(true)
    }
    let closeSnack = () => setSnackbar(false)

  return (
  <>
    <Drawer anchor="right" open={drawer} onClose={closeDrawer}>
        <div className="drawer-layout">
            <h2>Deal {`${lead.prefix}-${lead.seller}-${lead.number}`}</h2>
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
            <h3 style={{color:"rgb(115, 115, 115)"}}>{lead.clientName ? lead.clientName.bussinessName : ''}</h3>
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
                    {lead.clientName ? <p className="blue-font">{lead.clientName.bussinessAddress ? lead.clientName.bussinessAddress : 'Sin dirección'}</p> : 'Sin dirección'}
                </div>
                <div className="right-column">
                    <p className="small-font">Giro:</p>
                    {lead.clientName ? <p className="blue-font">{lead.clientName.bussinessRole ? lead.clientName.bussinessRole : 'Sin giro'}</p> : 'Sin giro'}
                    <p className="small-font">Industria:</p>
                    {lead.clientName ? <p className="blue-font">{lead.clientName.industry ? lead.clientName.industry : 'Sin industria'}</p> : 'Sin industria'}
                    <p className="small-font">Origen:</p>
                    {lead.clientName ? <p className="blue-font">{lead.clientName.origin ? lead.clientName.origin : 'Sin origen'}</p> : 'Sin origen'}
                    <p className="small-font">Empleados:</p>
                    {lead.clientName ? <p className="blue-font">{lead.clientName.bussinessEmployees ? lead.clientName.bussinessEmployees : 'Sin empleados'}</p> : 'Sin empleados'}
                </div>
            </div>
            <Divider variant="middle" />
            <div className="">
                {/* Comentarios del lead*/}
                <p className="small-font">Comentarios</p>
                <p className="blue-font">{lead.commentText}</p>
                <Divider />
                
                {/* Cotizaciones */}
                <p className="small-font">Cotizaciones</p>
                <Paper style={{maxWidth:"800px"}}>
                    <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell style={{width:"200px", padding: "8px"}} >Fecha</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Monto mensual</TableCell>
                        <TableCell style={{width:"200px", padding: "0px"}}>Acciones</TableCell>
                        {/* <TableCell style={{width:"200px", padding: "0px"}}></TableCell> */}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {quotations.length ? quotations.filter(quot => quot.active === true).map(quot =>
                            <TableRow key={quot._id}>
                                <TableCell component="th" scope="row">
                                    {lead.clientName ? quot.quotPrefix+ "-" +lead.clientName.bussinessID+ "-" + quot.quotCounter : ''}
                                </TableCell>
                                <TableCell style={{width:"200px", padding: "8px"}} >{moment(quot.createdAt).format("d/MMMM/Y")}</TableCell>
                                <TableCell>{quot.quotDescription ? quot.quotDescription : 'Sin descripción'}</TableCell>
                                <TableCell>{quot.quotAmount ? <Currency quantity={quot.quotAmount}/> : '$0'}</TableCell>
                                <TableCell style={{width:"200px", padding: "0px"}}>
                                <Tooltip title="Editar" placement="right">
                                    <IconButton onClick={() => toggleEditQuotation(quot)} aria-label="Delete">
                                        <Edit fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar" placement="right">
                                    <IconButton onClick={() => {delQuotation(quot._id, lead._id); getQuotations()}} aria-label="Delete">
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                </TableCell>
                            </TableRow>
                        ) : 
                        <TableRow>
                            <TableCell component="th" scope="row">
                                Sin cotizaciones
                            </TableCell>
                        </TableRow>}
                    </TableBody>
                    </Table>
                </Paper>
                <Button onClick={toggleQuotation} style={{margin: "1rem"}} variant="contained">Crear cotización</Button>
                <Divider />
                
                {/* Manejo de archivos */}
                <p className="small-font">Archivos</p>
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
                Eliminar {`${lead.prefix}-${lead.seller}-${lead.number}`}
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

        {/* Diálogo para crear cotiaciones */}
        <Dialog
            open={openQuot}
            onClose={toggleQuotation}
        >
            <DialogTitle>
                Nueva cotización para {`${lead.prefix}-${lead.seller}-${lead.number}`} <small style={{color:"rgb(115, 115, 115)"}}>({lead.clientName ? lead.clientName.bussinessName : ''})</small>
            </DialogTitle>
            <DialogContent> 
                <TextField 
                    autoFocus
                    margin="dense"
                    id="quotBill"
                    name="quotBill"
                    label="Factura"
                    type="number"
                    onChange={handleQuotation}
                    fullWidth
                />
                <TextField 
                    autoFocus
                    margin="dense"
                    id="quotDescription"
                    name="quotDescription"
                    label="Descripción"
                    type="text"
                    onChange={handleQuotation}
                    fullWidth
                />
                <FormControl style={{marginTop:"1rem"}}>
                    <InputLabel htmlFor="adornment-amount">Monto mensual</InputLabel>
                    <Input
                    type="number"
                    id="quotAmount"
                    name="quotAmount"
                    onChange={handleQuotation}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleQuotation} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => {toggleQuotation(); submitQuotation(lead._id);}} color="primary" autoFocus>
                    Crear
                </Button>
            </DialogActions>
        </Dialog>

        {/* Diálogo para editar cotiaciones */}
        <Dialog
            open={editQuot}
            onClose={toggleEditQuotation}
        >
            <DialogTitle>
                Editar cotización {quotation.quotPrefix ? quotation.quotPrefix : ''} <small style={{color:"rgb(115, 115, 115)"}}>({lead.clientName ? lead.clientName.bussinessName : ''})</small>
            </DialogTitle>
            <DialogContent> 
                <TextField 
                    autoFocus
                    margin="dense"
                    name="quotPO"
                    label="Orden de compra"
                    type="number"
                    defaultValue={quotation.quotPO}
                    onChange={handleQuotation}
                    fullWidth
                />
                <TextField 
                    autoFocus
                    margin="dense"
                    name="quotBill"
                    label="Factura"
                    type="number"
                    defaultValue={quotation.quotBill}
                    onChange={handleQuotation}
                    fullWidth
                />
                <TextField 
                    autoFocus
                    margin="dense"
                    name="quotDescription"
                    label="Descripción"
                    type="text"
                    defaultValue={quotation.quotDescription}
                    onChange={handleQuotation}
                    fullWidth
                />
                <FormControl style={{marginTop:"1rem"}}>
                    <InputLabel htmlFor="adornment-amount">Monto mensual</InputLabel>
                    <Input
                    type="number"
                    name="quotAmount"
                    defaultValue={quotation.quotAmount}
                    onChange={handleQuotation}
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggleEditQuotation} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => {updateQuotation(quotation._id, quotation, lead._id);toggleEditQuotation();}} color="primary" autoFocus>
                    Actualizar
                </Button>
            </DialogActions>
        </Dialog>
    </Drawer>
    <Snack close={closeSnack} message={message} open={snackbar}/>
    </>)
}

export default LeadDrawer