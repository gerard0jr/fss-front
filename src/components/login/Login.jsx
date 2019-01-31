import React, { Component } from 'react'
import { Paper, TextField, Button } from '@material-ui/core';
import '../signup/signup.css'
import { login } from '../../services/auth'
import Snack from '../snackbar/Snack';
import Navbar from '../navbar/Navbar'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  state = {
    user: {},
    message: String,
    open: false
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
    const { user } = this.state
    login(user)
    .then(res => {
      if(res.status === 500) return this.setState({open: true, message: res.data.message})
      localStorage.setItem('user', JSON.stringify(res))
      this.setState({open: true, message: "Inicio de sesión correcto, ¡Bienvenido(a)!"})
      this.props.history.push('/home')
    })
    .catch(err => this.setState({open: true, message: err}))
  }

  close = () => this.setState({open: false})

  render() {
    const { user, message, open } = this.state
    const { handleChange, handleSubmit, close } = this
    return (
      <div>
        <Navbar/>
        <Paper className="paper-signup">
          <h2>Inicio de sesión</h2>
          <form>
            <div>
              <TextField
              id="email"
              label="Email"
              value={user.email}
              onChange={handleChange}
              margin="normal"
              />
            </div>
            <div>
              <TextField
              id="password"
              label="Contraseña"
              value={user.password}
              onChange={handleChange}
              margin="normal"
              />
            </div>
            <Button onClick={handleSubmit} style={{margin:"1rem 0"}} variant="contained" color="primary">
              Iniciar sesión
            </Button>
          </form>
          <small>¿No tienes una cuenta? <Link to="/signup">Crea una aquí</Link></small>
        </Paper>
        <Snack close={close} message={message} open={open}/>
      </div>
    )
  }
}
