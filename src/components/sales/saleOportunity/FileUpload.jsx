import React, {useState} from 'react'
import '../styles.css'
import firebase from '../../../services/firebase'
import { CircularProgress, IconButton } from '@material-ui/core';
import { file0Upload, file1Upload, deleteFile0, deleteFile1 } from '../../../services/leadsDB'
import { Delete } from '@material-ui/icons';  

const FileUpload = ({lead, updateLeadState}) => {
    
    const [file0,setFile0] = useState(null)
    const [file1,setFile1] = useState(null)
    const [loading,setloading] = useState(false)
    
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
                file0Upload(link0, lead._id)
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
                file1Upload(link1, lead._id)
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
                {lead.fileURL0 !== null ? 
                <div>
                    <a rel="noopener noreferrer" target="_blank" href={lead.fileURL0} 
                        className="success-upload"
                    >
                        Archivo en el sistema
                    </a>
                    <IconButton onClick={() => deleteFirstFile(lead._id)} aria-label="Delete">
                        <Delete />
                    </IconButton>
                </div>: 
                <div>
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
                        Archivo en el sistema
                    </a>
                    <IconButton onClick={() => deleteSecondFile(lead._id)} aria-label="Delete">
                        <Delete />
                    </IconButton>
                </div>: 
                <div>
                    <input onChange={handleFile} type="file" name="file1" id="first"/>
                    <button id="file1" onClick={file1Submit}>Subir</button>
                </div>}
            </div>
        </div>
        <div className="progress">
            {loading ? <CircularProgress/> : ''}
        </div>
    </div>
  )
}

export default FileUpload
