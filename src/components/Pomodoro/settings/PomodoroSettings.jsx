import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './styles.css'

const PomodoroSettings = ({ onSave }) => {

  return (
    <>
      <div className='settings-background'>
        <h1>Settings</h1>
        <Box >
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </Box>

        <Button variant="contained">Hello world</Button>;
        <button onClick={onSave}>Hola</button>
      </div>

    </>
  )
}

export default PomodoroSettings