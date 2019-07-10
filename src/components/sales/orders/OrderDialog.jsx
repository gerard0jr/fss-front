import React, {useState, useEffect} from 'react'
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import '../styles.css'
import { allClients } from '../../../services/clients'

const OrderDialog = ({ dialog, closeDialog, handleChange, dialogNew, order={}, submitOrder, deleteOrder }) => {
    
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
            <DialogTitle>{dialogNew ? 'Nueva orden de compra' : `Editar orden ${order.id}`}</DialogTitle>
            <DialogContent>
                {/* FORM */}
                <form className="sales-oportunity-fields" autoComplete="off">
                    <div>
                        <TextField
                            required
                            className="text-field"
                            id="id"
                            label="No. de orden"
                            value={order.id}
                            onChange={handleChange}
                        />

                        <FormControl className="text-field">	
                            <InputLabel shrink>Cliente</InputLabel>	
                            <Select	
                                required	
                                onChange={handleChange}	
                                value={order.client ? order.client._id ? order.client._id : order.client : ''}	
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
                            id="area"
                            label="Area/Departamento"
                            value={order.area}
                            onChange={handleChange}
                        />
                
                        <TextField
                            required
                            className="text-field"
                            id="contact"
                            label="Contacto del cliente"
                            value={order.contact}
                            onChange={handleChange}
                        />

                        <TextField
                            required
                            className="text-field"
                            id="responsible"
                            label="Responsable del seguimiento"
                            value={order.responsible}
                            onChange={handleChange}
                        />

                        <TextField
                            required
                            className="text-field"
                            id="seller"
                            label="Vendedor"
                            value={order.seller}
                            onChange={handleChange}
                        />

                    </div>
                   
                </form>
            </DialogContent>
            {dialogNew ? 
                <DialogActions>
                <Button onClick={closeDialog} >Cancelar</Button>
                <Button onClick={submitOrder} color="primary" variant="contained">
                    Agregar
                </Button> 
            </DialogActions>: 
            <DialogActions>
                <Button onClick={closeDialog} >Cancelar</Button>
                <Button onClick={() => toggleDeleteDialog()} color="secondary" variant="contained" >Borrar</Button>
                <Button onClick={() => submitOrder('update')} color="primary" variant="contained">
                    Actualizar
                </Button> 
            </DialogActions>}
                
            <Dialog
            open={deleteDialog}
            onClose={toggleDeleteDialog}
            >
                <DialogTitle>
                    Eliminar orden {`${order.id}`}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={toggleDeleteDialog} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={() => {deleteOrder(order._id); toggleDeleteDialog();}} color="secondary" autoFocus>
                        Eliminar
                    </Button>
                </DialogActions>
             </Dialog>
        </Dialog>
  )
}

export default OrderDialog
