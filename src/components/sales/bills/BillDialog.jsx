import React, {useState, useEffect} from 'react'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import '../styles.css'
import { allClients } from '../../../services/clients'

const BillDialog = ({ dialog, closeDialog, handleChange, dialogNew, bill={}, submitBill, deleteBill }) => {
    
    const [ deleteDialog, setDeleteDialog ] = useState(false)
    let toggleDeleteDialog = () => setDeleteDialog(!deleteDialog)

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
            <DialogTitle>{dialogNew ? 'Nueva Factura' : `Editar factura ${bill.id}`}</DialogTitle>
            <DialogContent>
                {/* FORM */}
                <form className="sales-oportunity-fields" autoComplete="off">
                    <div>
                        <TextField
                            required
                            className="text-field"
                            id="id"
                            label="No. de factura"
                            value={bill.id}
                            onChange={handleChange}
                        />

                        <TextField
                            required
                            className="text-field"
                            id="order"
                            label="Orden de compra"
                            value={bill.order}
                            onChange={handleChange}
                        />

                        <FormControl className="text-field">	
                            <InputLabel shrink>Cliente</InputLabel>	
                            <Select	
                                required	
                                onChange={handleChange}	
                                value={bill.client ? bill.client._id ? bill.client._id : bill.client : ''}	
                                id='client'
                                inputProps={{	
                                name: 'client',	
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
                
                        <TextField
                            required
                            className="text-field"
                            id="contact"
                            label="Contacto del cliente"
                            value={bill.contact}
                            onChange={handleChange}
                        />

                        <TextField
                            required
                            className="text-field"
                            id="responsible"
                            label="Responsable del seguimiento"
                            value={bill.responsible}
                            onChange={handleChange}
                        />

                    </div>
                   
                </form>
            </DialogContent>
            {dialogNew ? 
                <DialogActions>
                <Button onClick={closeDialog} >Cancelar</Button>
                <Button onClick={submitBill} color="primary" variant="contained">
                    Agregar
                </Button> 
            </DialogActions>: 
            <DialogActions>
                <Button onClick={closeDialog} >Cancelar</Button>
                <Button onClick={() => toggleDeleteDialog()} color="secondary" variant="contained" >Borrar</Button>
                <Button onClick={() => submitBill('update')} color="primary" variant="contained">
                    Actualizar
                </Button> 
            </DialogActions>}
                
            <Dialog
            open={deleteDialog}
            onClose={toggleDeleteDialog}
            >
                <DialogTitle>
                    Eliminar factura {`${bill.id}`}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={toggleDeleteDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {deleteBill(bill._id); toggleDeleteDialog();}} color="secondary" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
             </Dialog>
        </Dialog>
  )
}

export default BillDialog
