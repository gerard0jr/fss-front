import React from 'react'
import { Button } from '@material-ui/core'
import '../styles.css'
import ClientTable from './ClientTable';
import ClientDialog from './ClientDialog';

const ClientProspect = ({quotations, handleChangePage, handleChangeRowsPerPage,
    rowsPerPage, page, openDialog, closeDialog, dialog, dialogNew, loading, submitQuotation,
    handleQuotation, quotation, handleDateChange, updateQuot}) => {
  return (
    <div
    style={{margin:"1em 0"}}>
        <h4>Cotizaciones</h4>
        <ClientTable
            handleChangePage={handleChangePage} 
            handleChangeRowsPerPage={handleChangeRowsPerPage} 
            page={page} 
            rowsPerPage={rowsPerPage}
            quotations={quotations}
            quotation={quotation}
            dialog={dialog} 
            openDialog={openDialog}
            closeDialog={closeDialog} 
            loading={loading}
            handleDateChange={handleDateChange}
            updateQuot={updateQuot}
            handleQuotation={handleQuotation}
        />
        <div>
            <Button onClick={() => openDialog({},'new')} variant="contained" color="primary">
                Nueva cotización
            </Button>
        </div>
        <ClientDialog
        dialogNew={dialogNew} 
        closeDialog={closeDialog} 
        quotation={quotation}
        handleQuotation={handleQuotation}
        submitQuotation={submitQuotation}
        />
    </div>
  )
}


export default ClientProspect
