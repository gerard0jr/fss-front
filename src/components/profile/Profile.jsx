import React, { Component } from 'react'
import { Paper, Snackbar, TextField } from '@material-ui/core';
import './styles.css'
import { CameraAlt } from '@material-ui/icons';
import firebase from '../../services/firebase'

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
        const task = firebase.storage().ref('profilePics').child(user._id + file.name).put(file)

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
            this.setState({user})
        })

    }

    clickInput = () => {
        document.getElementById('photoUpload').click()
    }

    close = () => this.setState({open: false})

    render() {
        const { open, user, message, progress } = this.state
        const { handleChange, close, uploadPhoto, clickInput } = this
        const { classes } = this.props
        return (
            <div>
            <Paper className="paper-profile">
                <h2>Perfil de {user.name}</h2>
                <div style={{backgroundImage:`url(${user.photoURL})`}} className="profile-picture">
                    <span>
                        <CameraAlt/>
                        <p>Editar</p>
                    </span>
                </div>
                <form>
                    <div>
                        <TextField
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
                        id="name"
                        label="Nombre"
                        value={user.name}
                        onChange={handleChange}
                        margin="normal"
                        />
                    </div>
                </form>
            </Paper>
            <Snackbar/>
          </div>
        )
      }
}

export default Profile
