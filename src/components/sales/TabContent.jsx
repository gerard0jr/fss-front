import React from 'react'
import SalesOp from './saleOportunity/SalesOp';
import ClientProspect from './clientProspect/ClientProspect';

const TabContent = ({value, handleChange, lead, leads, handleChangePage, handleChangeRowsPerPage,
    handleClose, rowsPerPage, page, submitLead, getLeads, clearLead, deleteLead, openDialog, 
    closeDialog, dialog, updateLead, dialogNew, handleDateChange, quotations, quotation, loading,
    openDrawer, closeDrawer, drawer, updateLeadState, submitQuotation, handleQuotation, updateQuot}) => {
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
                        loading={loading}
                        openDrawer={openDrawer}
                        closeDrawer={closeDrawer}
                        drawer={drawer}
                        updateLeadState={updateLeadState}
                      /> :
        value === 1 ? <ClientProspect
                        handleChange={handleChange}
                        handleChangePage={handleChangePage} 
                        handleChangeRowsPerPage={handleChangeRowsPerPage} 
                        page={page} 
                        rowsPerPage={rowsPerPage}
                        quotation={quotation}
                        quotations={quotations}
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
                        loading={loading}
                        submitQuotation={submitQuotation}
                        handleQuotation={handleQuotation}
                        updateQuot={updateQuot}
                      /> : 
        'otro'
      }
    </div>
  )
}

export default TabContent
