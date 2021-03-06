import React from 'react'
import { Button } from '@material-ui/core'
import '../styles.css'
import LeadsTable from './LeadsTable';
import FormDialog from './FormDialog';

const SalesOp = ({handleChange, lead, leads, handleChangePage, handleChangeRowsPerPage,
    rowsPerPage, page, submitLead, clearLead, deleteLead, openDialog, closeDialog, dialog, 
    dialogNew, updateLead, handleDateChange, loading, openDrawer, closeDrawer, drawer,
    updateLeadState}) => {
  return (
    <div
    style={{margin:"1em 0"}}>
        <LeadsTable
            handleChangePage={handleChangePage} 
            handleChangeRowsPerPage={handleChangeRowsPerPage} 
            page={page} 
            rowsPerPage={rowsPerPage}
            leads={leads}
            deleteLead={deleteLead} 
            dialog={dialog} 
            openDialog={openDialog}
            closeDialog={closeDialog} 
            handleChange={handleChange} 
            lead={lead}
            clearLead={clearLead}
            submitLead={submitLead}
            updateLead={updateLead}
            handleDateChange={handleDateChange}
            loading={loading}
            openDrawer={openDrawer}
            closeDrawer={closeDrawer}
            drawer={drawer}
            updateLeadState={updateLeadState}
        />
        
        <div>
            <Button onClick={() => openDialog({},'new')} variant="contained" color="primary">
                Nuevo Deal
            </Button>
        </div>

        <FormDialog 
        dialogNew={dialogNew} 
        closeDialog={closeDialog} 
        handleChange={handleChange} 
        lead={lead}
        clearLead={clearLead}
        submitLead={submitLead}/>
    </div>
  )
}


export default SalesOp