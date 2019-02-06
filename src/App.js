import React, { Component } from 'react'
import './App.css'
import Routes from './Routes'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { theme } from './theme'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Routes/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
