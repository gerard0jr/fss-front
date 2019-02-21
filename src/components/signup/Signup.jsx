import React, { Component } from 'react'
import { Paper, TextField, Button, InputAdornment, IconButton } from '@material-ui/core';
import './signup.css'
import { signup } from '../../services/auth'
import Snack from '../snackbar/Snack';
import Navbar from '../navbar/Navbar';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom'

export default class Signup extends Component {
  state = {
    user: {},
    message: String,
    open: false,
    error: false,
    errorPass: false,
    disabledMail: true,
    disabledPass: true,
    showPassword : false
  }

  componentDidMount = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return this.setState({ user: {}, isAuth: false });
    this.props.history.push('/app')
  }
  
  handleChange = e => {
    const { user } = this.state
    user[e.target.id] = e.target.value
    this.setState({user})
  }

  handleSubmit = () => {
    const pass = document.getElementById('password')
    if(pass.value.length < 6) 
      return this.setState({disabledPass: true, open: true, message: 'La contraseña debe tener al menos 6 caracteres'})

    const { user } = this.state
    signup(user)
    .then(res => {
      if(res.status === 500) return this.setState({open: true, message: 'Ya existe un usuario con este correo'})
      localStorage.setItem('user', JSON.stringify(res))
      this.setState({open: true, message: "Registro correcto, ¡Bienvenido(a)!"})
      this.props.history.push('/home')
    })
    .catch(err => this.setState({open: true, message: err}))
  }

  close = () => this.setState({open: false})

  checkPassword = input => event => {
    const { user } = this.state
    if(user.password === event.target.value) return this.setState({disabledPass: false, errorPass: false})
    this.setState({ disabledPass: true, errorPass: true})
    return false
  }

  checkEmail = input => event => {
      const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if(emailRegEx.test(String(event.target.value).toLowerCase())) return this.setState({disabledMail: false, error: false})
      this.setState({disabledMail: true, error: true})
  }

  togglePassword = () => this.setState({showPassword: !this.state.showPassword})

  render() {
    const { user, message, open, error, disabledMail, disabledPass, errorPass, showPassword } = this.state
    const { handleChange, handleSubmit, close, checkEmail, checkPassword, togglePassword } = this
    return (
      <div>
        <Navbar/>
        <div className="landing-image"/>
        <Paper className="paper-signup">
          <h2>Registro de usuario</h2>
          <form>
            <div>
              <TextField
              id="name"
              label="Nombre"
              value={user.name}
              onChange={handleChange}
              margin="normal"
              />
            </div>
            <div>
              <TextField
              id="email"
              label="Email"
              value={user.email}
              onChange={handleChange}
              onBlur={checkEmail()}
              margin="normal"
              />
            </div>
            <div>
              {error ? <small style={{color:"red"}}>Ingresa un correo válido</small> : ''}
            </div>
            <div>
              <TextField
              id="password"
              type={showPassword ? 'text' : 'password'}
              label="Contraseña"
              value={user.password}
              onChange={handleChange}
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="Toggle password visibility" onClick={togglePassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment> 
                )
              }}
              />
            </div>
            <div>
              <TextField
              id="repeat-password"
              label="Repite tu contraseña"
              type={showPassword ? 'text' : 'password'}
              onChange={checkPassword()}
              onBlur={checkPassword()}
              margin="normal"
              />
            </div>
            <div>
              {errorPass ? <small style={{color:"red"}}>La contraseña no coincide</small> : ''}
            </div>
            <Button disabled={disabledMail || disabledPass} onClick={handleSubmit} style={{margin:"1rem 0"}} variant="contained" color="primary">
              Registrarme
            </Button>
          </form>
          <small>¿Ya tienes una cuenta? <Link to="login">Inicia sesión</Link></small>
        </Paper>
        <Snack close={close} message={message} open={open}/>
      </div>
    )
  }
}
