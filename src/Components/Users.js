import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Input } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function createData(
  id,
  first_name,
  last_name,
  totalExpenses,
) {
  return { id, first_name, last_name, totalExpenses};
}


export default function Users({setData, userData}) {
  const [userInfo, setUserInfo] = React.useState(userData);
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState();
  const handleOpen = (e, row) => {
    setOpen(true);
    setEditRow(row);
  };
  const handleClose = () => setOpen(false);
  const {register,handleSubmit} = useForm();

  //change component to re-render each time a new person is added
  React.useEffect(() => {
    setUserInfo(userData)
  }, [userData])

  //add new user to userData on app.js then user info will get updated
  const onSubmit = () => {
    if(firstName.length > 0 && lastName.length > 0){
      setData(prevState => ([...prevState, {
        id: prevState.length,
        first_name: firstName,
        last_name: lastName,
        expenses: []
      }]))
      resetInputs();
    } else {
      alert('first name & last name are required')
    }
  }

  const onSubmitEdit = () => {
    //find the row that is being edited
    const editedRow = userInfo.find(user => user.id === editRow?.id);
    editedRow.first_name = firstName;
    editedRow.last_name = lastName;
    //change the row to have the new information
    const updatedUsers = (arr, obj) => arr && arr.map(user => user.id === editRow?.id ? editedRow : user);
    setData(updatedUsers);
    resetInputs();
    handleClose();
  }

  const resetInputs = () => {
    setFirstName('');
    setLastName('');
  }

  //used for finding users total expenses needed for the total expenses column
  const getTotalExpenses = (expenses) => {
    const result = expenses.reduce((sum, {cost}) =>  sum + cost, 0)
    return result;
  }

  //setting up the rows for the table
  const rows = userInfo.map(user => createData(user.id, user.first_name, user.last_name, getTotalExpenses(user.expenses)));
  
  //deleting the row based on the user id
  const handleDelete = (id) => {
    const filteredData = userInfo.filter(user => user.id !== id);
    setData(filteredData);
  }
  return (
    <>
    <h3>Users</h3>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>User Id</TableCell>
          <TableCell align="right">First Name</TableCell>
          <TableCell align="right">Last Name</TableCell>
          <TableCell align="right">Total Expenses</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="right">{row.first_name}</TableCell>
            <TableCell align="right">{row.last_name}</TableCell>
            <TableCell align="right">${row.totalExpenses}</TableCell>
            <Button onClick={e => handleOpen(e, row)}>Edit</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-user-title"
                aria-describedby="edit-user-description"
                componentsProps={row}
              >
                <Box sx={style}>
                <h4>Edit User</h4>
                  <FormControl fullWidth>
                    <InputLabel >First Name</InputLabel>
                    <Input id='first-name' type='text' placeholder={editRow?.first_name} onChange={e => setFirstName(e.target.value)} required/>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Last Name</InputLabel>
                    <Input id='last-name' type='text' placeholder={editRow?.last_name} onChange={e => setLastName(e.target.value)} required/>
                  </FormControl>
                  <Button onClick={onSubmitEdit}>Submit</Button>
                </Box>
              </Modal>
            <Button onClick={e => handleDelete(e, row.id)}>Delete</Button>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <h4>Add User</h4>
      <Box>
        <FormControl fullWidth>
          <InputLabel >First Name</InputLabel>
          <Input id='first-name' type='text' value={firstName} onChange={e => setFirstName(e.target.value)} required/>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Last Name</InputLabel>
          <Input id='last-name' type='text' value={lastName} onChange={e => setLastName(e.target.value)} required/>
        </FormControl>
        <Button onClick={onSubmit}>Add User</Button>
      </Box>
  </>
  )
}


