import React, {useState} from 'react'
import '../styles.css'
import firebase from '../../../services/firebase'
import { CircularProgress, IconButton } from '@material-ui/core';
import { file0Upload, file1Upload } from '../../../services/leadsDB'
import { Delete } from '@material-ui/icons';

const FileUpload = ({lead}) => {
    
    const [file0,setFile0] = useState(null)
    const [file1,setFile1] = useState(null)
    const [loading,setloading] = useState(false)
    const [upload0Status, setUpload0Status] = useState(false)
    const [upload1Status, setUpload1Status] = useState(false)
    
    let handleFile = e => 
        e.target.name === 'file0' ? setFile0(e.target.files[0]) : setFile1(e.target.files[0])
    
    let file0Submit = () => {
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
                    setloading(false)
                    setUpload0Status(true)
                })
                .catch(err => err)
            })
    }

    let file1Submit = () => {
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
                    setloading(false)
                    setUpload1Status(true)
                })
                .catch(err => err)
            })
    }

  return (
    <div className="general-container">
        <div className="file-layout">
            <div className="file-input">
                <p className="small-font">Primer archivo</p>
                {upload0Status || lead.fileURL0 ? 
                <div>
                    <a href={lead.fileURL0} 
                        className="success-upload"
                    >
                        Archivo en el sistema
                    </a>
                    <IconButton aria-label="Delete">
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
                {upload1Status || lead.fileURL1 ? 
                <div>
                    <a href={lead.fileURL1} 
                        className="success-upload"
                    >
                        Archivo en el sistema
                    </a>
                    <IconButton aria-label="Delete">
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
