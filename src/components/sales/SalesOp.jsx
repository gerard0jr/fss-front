import React from 'react'
import { TextField, ExpansionPanel, ExpansionPanelSummary, 
    ExpansionPanelDetails, ExpansionPanelActions, Divider, 
    Button, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import './styles.css'
import LeadsTable from './LeadsTable';

const SalesOp = ({handleChange, lead, leads, handleChangePage, handleChangeRowsPerPage,
    rowsPerPage, page, open, message, submitLead, getLeads, handleClose, clearLead}) => {
  return (
    <div>
        <h4>Leads</h4>
        <LeadsTable 
            handleChangePage={handleChangePage} 
            handleChangeRowsPerPage={handleChangeRowsPerPage} 
            page={page} 
            rowsPerPage={rowsPerPage}
            leads={leads} />
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMore />}>
                <div className="column">
                    <Typography >Nuevo Lead</Typography>
                </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails >
                <form className="sales-oportunity-fields" autoComplete="off">
                    <div>
                        <TextField
                            className="text-field"
                            id="bussinessName"
                            label="Nombre de la empresa"
                            value={lead.bussinessName}
                            onChange={handleChange}
                        />
                    
                        <TextField
                            className="text-field"
                            id="bussinessRole"
                            label="Giro de la empresa"
                            value={lead.bussinessRole}
                            onChange={handleChange}
                        />
                
                        <TextField
                            className="text-field"
                            id="bussinessAddress"
                            label="Dirección"
                            value={lead.bussinessAddress}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <TextField
                            className="text-field"
                            id="industry"
                            label="Industria"
                            value={lead.industry}
                            onChange={handleChange}
                        />
                
                        <TextField
                            className="text-field"
                            id="origin"
                            label="Origen"
                            value={lead.origin}
                            onChange={handleChange}
                        />
                
                        <TextField
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
                            className="text-field"
                            id="contactName"
                            label="Nombre del contacto"
                            value={lead.contactName}
                            onChange={handleChange}
                        />
                
                        <TextField
                            className="text-field"
                            id="contactPosition"
                            label="Puesto del contacto"
                            value={lead.contactPosition}
                            onChange={handleChange}
                        />
                    
                        <TextField
                            className="text-field"
                            id="contactPhone"
                            label="Teléfono"
                            value={lead.contactPhone}
                            onChange={handleChange}
                        />
                    
                        <TextField
                            className="text-field"
                            id="contactEmail"
                            label="Email"
                            value={lead.contactEmail}
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </ExpansionPanelDetails>
            <Divider />
            <ExpansionPanelActions>
            <Button onClick={clearLead} size="small">Limpiar</Button>
            <Button onClick={submitLead} size="small" color="primary">
                Agregar
            </Button>
            </ExpansionPanelActions>
        </ExpansionPanel>
    </div>
  )
}


export default SalesOp