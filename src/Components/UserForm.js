import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Input } from '@mui/material';

const UserForm = React.forwardRef((props, ref) => {
  return (
    <>
      <Box sx={props?.style} ref={ref}>
      <h4>{props.title}</h4>
        <FormControl fullWidth>
          <InputLabel >First Name</InputLabel>
          <Input id='first-name' type='text' value={props.firstValue} onChange={props.onChangeFirst} required/>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Last Name</InputLabel>
          <Input id='last-name' type='text' value={props.secondValue} onChange={props.onChangeSecond} required/>
        </FormControl>
        <Button onClick={props.onSubmit}>{props.buttonValue}</Button>
      </Box>
    </>
  )
})

export default UserForm
