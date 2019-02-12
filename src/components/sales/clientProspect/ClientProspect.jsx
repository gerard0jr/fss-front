import React from 'react'
import { Button } from '@material-ui/core'
import '../styles.css'
import ClientTable from './ClientTable';
import ClientDialog from './ClientDialog';

const ClientProspect = ({handleChange, client, clients, handleChangePage, handleChangeRowsPerPage,
    rowsPerPage, page, submitLead, clearLead, deleteLead, openDialog, closeDialog, dialog, 
    dialogNew, updateLead, handleDateChange}) => {
  return (
    <div
    style={{margin:"1em 0"}}>
        <h4>Cotizaciones</h4>
        <ClientTable
            handleChangePage={handleChangePage} 
            handleChangeRowsPerPage={handleChangeRowsPerPage} 
            page={page} 
            rowsPerPage={rowsPerPage}
            clients={clients}
            deleteLead={deleteLead} 
            dialog={dialog} 
            openDialog={openDialog}
            closeDialog={closeDialog} 
            handleChange={handleChange} 
            client={client}
            clearLead={clearLead}
            submitLead={submitLead}
            updateLead={updateLead}
            handleDateChange={handleDateChange}
        />
        <div>
            <Button onClick={() => openDialog({},'new')} variant="contained" color="primary">
                Nueva cotización
            </Button>
        </div>
        <ClientDialog
        dialogNew={dialogNew} 
        closeDialog={closeDialog} 
        handleChange={handleChange} 
        client={client}
        clearLead={clearLead}
        submitLead={submitLead}/>
    </div>
  )
}


export default ClientProspect
