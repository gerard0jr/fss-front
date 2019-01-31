import React from 'react'
import { Snackbar, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const Snack = ({open, message, close}) => {
    
  return (
    <Snackbar 
        color="secondary"
        anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={close}
        ContentProps={{
        'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={[
        <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={close}
        >
            <Close />
        </IconButton>
        ]}
    />
  )
}

export default Snack