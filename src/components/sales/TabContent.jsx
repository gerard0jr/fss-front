import React from 'react'
import SalesOp from './SalesOp';

const TabContent = ({value, handleChange, lead, leads, handleChangePage, handleChangeRowsPerPage,
    handleClose, rowsPerPage, page, submitLead, getLeads, clearLead, deleteLead, openDialog, 
    closeDialog, dialog, updateLead, dialogNew, handleDateChange}) => {
  return (
    <div className="tab-content">
      {
        value === 0 ? <SalesOp 
                            handleChange={handleChange}
                            handleChangePage={handleChangePage} 
                            handleChangeRowsPerPage={handleChangeRowsPerPage} 
                            page={page} 
                            rowsPerPage={rowsPerPage}
                            lead={lead}
                            leads={leads}
                            handleClose={handleClose}
                            submitLead={submitLead}
                            getLeads={getLeads}
                            clearLead={clearLead}
                            deleteLead={deleteLead}
                            openDialog={openDialog}
                            closeDialog={closeDialog}
                            dialog={dialog}
                            dialogNew={dialogNew}
                            updateLead={updateLead}
                            handleDateChange={handleDateChange}
                         /> : 
        'otro'
      }
    </div>
  )
}

export default TabContent
