import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './styles.css'
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { lime, purple } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      main: '#686de0',
    },
    secondary: {
      main: '#686de0',
      light: '#686de0',
      dark: '#686de0',
      contrastText: '#686de0',
    },
  },
});

const PomodoroSettings = ({ onSave }) => {

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='settings-background'>
          <h1>Settings</h1>
          <div>
            <h2>Work options</h2>
            <TextField className='input' id="outlined-basic" label="Min time" variant="filled" type='number' title='The minimum time that the Togudoro can be adjusted' helperText="Time in seconds. Default: 300" />
            <TextField className='input' id="outlined-basic" label="Max time" variant="filled" type='number' title='The max time that the Togudoro can be adjusted' helperText="Time in seconds. Default: 7200" />
          </div>
          <div>
            <h2>Rest options</h2>
            <TextField className='input' id="outlined-basic" label="Min time" variant="filled" type='number' title='The minimum time that the Togudoro can be adjusted' helperText="Time in seconds. Default: 300" />
            <TextField className='input' id="outlined-basic" label="Max time" variant="filled" type='number' title='The max time that the Togudoro can be adjusted' helperText="Time in seconds. Default: 1800" />
          </div>
          <div className='btnSave'>
            <Button onClick={onSave} variant="outlined">Save</Button>
          </div>
          
        </div>
      </ThemeProvider>

    </>
  )
}

export default PomodoroSettings