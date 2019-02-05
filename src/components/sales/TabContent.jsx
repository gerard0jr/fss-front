import React from 'react'
import SalesOp from './SalesOp';

const TabContent = ({value, handleChange, lead, leads, handleChangePage, handleChangeRowsPerPage,
    handleClose, rowsPerPage, page, open, message, submitLead, getLeads, clearLead}) => {
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
                            open={open}
                            message={message}
                            handleClose={handleClose}
                            submitLead={submitLead}
                            getLeads={getLeads}
                            clearLead={clearLead}
                         /> : 
        'otro'
      }
    </div>
  )
}

export default TabContent
