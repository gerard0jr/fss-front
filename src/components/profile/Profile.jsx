import React, { Component } from 'react'
import { Paper, Snackbar, TextField, CircularProgress, Button } from '@material-ui/core';
import './styles.css'
import { CameraAlt, ExitToApp } from '@material-ui/icons';
import firebase from '../../services/firebase'
import { logout } from '../../services/auth'
import { withRouter } from 'react-router-dom'

class Profile extends Component{
    state = {
        open: false,
        direction: 'left',
        location: 'root',
        user: {},
        message: String,
        progress:0
    }

    componentDidMount = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return this.props.history.push('/login')
        this.setState({user})
    }

    handleChange = e => {
        const { user } = this.state
        switch(e.target.id){
            case 'name':
                user.name = e.target.value
                break
            case 'email':
                user.email = e.target.value
                break
            default:
                return
        }
        this.setState({user})
    }

    uploadPhoto = (e) => {
        const { user } = this.state
        const file = e.target.files[0]
        const task = firebase.storage().ref(`profilePics/${user.name}-${user._id}`).child(file.name).put(file)

        task.on("state_changed", snap => {
            let progress = (snap.bytesTransferred / snap.totalBytes) * 100
            progress = Math.floor(progress)
            this.setState({ progress })
        })

        task
        .then(snap=>snap.ref.getDownloadURL())
        .then(link=>{
            user['photoURL'] = link
            localStorage.setItem('user', JSON.stringify(user))
            this.props.updateUser(user)
            this.setState({user, progress: 0, open: true, message: 'Foto de perfil actualizada'})
        })

    }

    clickInput = () => {
        document.getElementById('photoUpload').click()
    }

    closeSession = () => 
        logout()
        .then(res => {
            const { history } = this.props
            localStorage.removeItem('user')
            return history.push('/login')
        })
        .catch(err => err)

    close = () => this.setState({open: false})

    render() {
        const { open, user, message, progress } = this.state
        const { handleChange, close, uploadPhoto, clickInput, closeSession } = this
        return (
            <div>
            <Paper className="paper-profile">
                <h2>Perfil de {user.name}</h2>
                {!user.photoURL ? <CircularProgress/> : progress > 0 ? <CircularProgress variant="determinate" value={progress} /> :
                 <div onClick={clickInput} style={{backgroundImage:`url(${user.photoURL})`}} 
                 className="profile-picture">
                    <span>
                        <CameraAlt/>
                        <p>Editar</p>
                    </span>
                </div>}
                <form>
                    <div>
                        <TextField
                        InputLabelProps={{ shrink: true }}
                        disabled
                        id="email"
                        label="Email"
                        value={user.email}
                        onChange={handleChange}
                        margin="normal"
                        />
                    </div>
                    <div>
                        <TextField
                        InputLabelProps={{ shrink: true }}
                        id="name"
                        label="Nombre"
                        value={user.name}
                        onChange={handleChange}
                        margin="normal"
                        />
                    </div>
                    <input onChange={uploadPhoto} type="file" name="photoURL" id="photoUpload" style={{display:"none"}} accept="image/png, image/jpeg"/>
                </form>
                <Button style={{margin:"2rem 0"}} onClick={closeSession} variant="contained" color="secondary">
                    Cerrar sesión
                    <ExitToApp style={{marginLeft:"0.5rem"}}/>
                </Button> 
            </Paper>
            <Snackbar open={open} message={message} close={close}/>
          </div>
        )
      }
}

export default withRouter(Profile)
