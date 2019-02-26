import React, {useState} from 'react'
import '../styles.css'
import firebase from '../../../services/firebase'
import { IconButton, Dialog, DialogTitle, DialogActions, Button, LinearProgress } from '@material-ui/core'
import { file0Upload, file1Upload, deleteFile0, deleteFile1 } from '../../../services/leadsDB'
import { Delete } from '@material-ui/icons';  

const FileUpload = ({lead, updateLeadState}) => {
    
    const [file0,setFile0] = useState(null)
    const [file1,setFile1] = useState(null)
    const [loading,setloading] = useState(false)
    const [ open0, setOpen0] = useState(false)
    const [ open1, setOpen1] = useState(false)

    let toggleDialog0 = () => setOpen0(!open0)
    let toggleDialog1 = () => setOpen1(!open1)
    
    let handleFile = e => 
        e.target.name === 'file0' ? setFile0(e.target.files[0]) : setFile1(e.target.files[0])
    
    let deleteFirstFile = id => {
        deleteFile0(id)
        .then(res => updateLeadState(res.data))
        .catch(err => err)
    }

    let deleteSecondFile = id => {
        deleteFile1(id)
        .then(res => updateLeadState(res.data))
        .catch(err => err)
    }

    let file0Submit = () => {
        if(file0 === null) return
        let task
            task = firebase.storage()
            .ref(`documents/${lead.prefix}-${lead.seller}-${lead.number}/firstFile`)
            .child(file0.name)
            .put(file0)

        task.on("state_changed", snap => {
            setloading(true)
        })

        task
        .then(snap=>snap.ref.getDownloadURL())
        .then(link=>{
                let link0 = {link}
                file0Upload(link0, lead._id, file0.name)
                .then(res =>{
                    updateLeadState(res.data)
                    setloading(false)
                })
                .catch(err => err)
            })
    }

    let file1Submit = () => {
        if(file1 === null) return
        let task
            task = firebase.storage()
            .ref(`documents/${lead.prefix}-${lead.seller}-${lead.number}/secondFile`)
            .child(file1.name)
            .put(file1)

        task.on("state_changed", snap => {
            setloading(true)
        })

        task
        .then(snap=>snap.ref.getDownloadURL())
        .then(link=>{
                let link1 = {link}
                file1Upload(link1, lead._id, file1.name)
                .then(res => {
                    updateLeadState(res.data)
                    setloading(false)
                })
                .catch(err => err)
            })
    }
  return (
    <div className="general-container">
        <div className="file-layout">
            <div className="file-input">
                <p className="small-font">Primer archivo</p>
                {lead.fileURL0 ? 
                <div>
                    <a rel="noopener noreferrer" target="_blank" href={lead.fileURL0} 
                        className="success-upload"
                    >
                        {lead.file0Name}
                    </a>
                    <IconButton onClick={toggleDialog0} aria-label="Delete">
                        <Delete />
                    </IconButton>
                </div>: 
                <div className="input">
                    <input onChange={handleFile} type="file" name="file0" id="first"/>
                    <button id="file0" onClick={file0Submit}>Subir</button>
                </div>}
            </div>
            <div className="file-input">
                <p className="small-font">Segundo archivo</p>
                {lead.fileURL1 ? 
                <div>
                    <a rel="noopener noreferrer" target="_blank" href={lead.fileURL1} 
                        className="success-upload"
                    >
                        {lead.file1Name}
                    </a>
                    <IconButton onClick={toggleDialog1} aria-label="Delete">
                        <Delete />
                    </IconButton>
                </div>: 
                <div className="input">
                    <input onChange={handleFile} type="file" name="file1" id="first"/>
                    <button id="file1" onClick={file1Submit}>Subir</button>
                </div>}
            </div>
        </div>
        <div className="progress">
            {loading ? <LinearProgress/> : ''}
        </div>
        <Dialog
            open={open0}
            onClose={toggleDialog0}
        >
            <DialogTitle>
                ¿Deseas eliminar "Primer archivo"?
            </DialogTitle>
            <DialogActions>
                <Button onClick={toggleDialog0} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => {deleteFirstFile(lead._id); toggleDialog0();}} color="secondary" autoFocus>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
        <Dialog
            open={open1}
            onClose={toggleDialog1}
        >
            <DialogTitle>
                ¿Deseas eliminar "Segundo archivo"?
            </DialogTitle>
            <DialogActions>
                <Button onClick={toggleDialog1} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => {deleteSecondFile(lead._id); toggleDialog1();}} color="secondary" autoFocus>
                    Eliminar
                </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}

export default FileUpload
