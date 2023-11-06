import React, { useEffect, useState } from 'react'
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

  const [minWork, setMinWork] = useState(1);
  const [maxWork, setMaxWork] = useState(1);

  const [minRest, setMinRest] = useState(1);
  const [maxRest, setMaxRest] = useState(1);

  useEffect(() => {
    let auxMinWork = localStorage.getItem('minWork');
    let auxMaxWork = localStorage.getItem('maxWork');
    let auxMinRest = localStorage.getItem('minRest');
    let auxMaxRest = localStorage.getItem('maxRest');
    if (!auxMinWork) auxMinWork = 300;
    if (!auxMaxWork) auxMaxWork = 7200;
    if (!auxMinRest) auxMinRest = 300;
    if (!auxMaxRest) auxMaxRest = 1800;

    setMinWork(auxMinWork);
    setMaxWork(auxMaxWork);
    setMinRest(auxMinRest);
    setMaxRest(auxMaxRest);

  }, []);


  function xd() {
    localStorage.setItem('minWork', minWork);
    localStorage.setItem('maxWork', maxWork);
    localStorage.setItem('minRest', minRest);
    localStorage.setItem('maxRest', maxRest);
    onSave();
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <div className='settings-background'>
          <h1>Settings</h1>
          <div className='input-group'>
            <h2>Work options</h2>
            <TextField className='input' value={minWork} onChange={event => { setMinWork(event.target.value) }} id="outlined-basic" label="Min time" variant="filled" type='number' title='The minimum time that the Togudoro can be adjusted' helperText="Time in seconds. Default: 300" />
            <TextField className='input' value={maxWork} onChange={event => { setMaxWork(event.target.value) }} id="outlined-basic" label="Max time" variant="filled" type='number' title='The max time that the Togudoro can be adjusted' helperText="Time in seconds. Default: 7200" />
          </div>
          <div className='input-group'>
            <h2>Rest options</h2>
            <TextField className='input' value={minRest} onChange={event => { setMinRest(event.target.value) }} id="outlined-basic" label="Min time" variant="filled" type='number' title='The minimum time that the Togudoro can be adjusted' helperText="Time in seconds. Default: 300" />
            <TextField className='input' value={maxRest} onChange={event => { setMaxRest(event.target.value) }} id="outlined-basic" label="Max time" variant="filled" type='number' title='The max time that the Togudoro can be adjusted' helperText="Time in seconds. Default: 1800" />
          </div>
          <div className='btnSave'>
            <Button onClick={xd} variant="outlined">Save</Button>
          </div>

        </div>
      </ThemeProvider>

    </>
  )
}

export default PomodoroSettings