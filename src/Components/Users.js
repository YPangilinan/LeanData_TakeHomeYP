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
  const [open, setOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState();
  console.log(editRow);
  const handleOpen = (e, row) => {
    setOpen(true)
    setEditRow(row);
  };
  const handleClose = () => setOpen(false);
  console.log(userInfo)
  const {
    register,
    handleSubmit
  } = useForm();

  const onSubmit = (data) => {
    setData(prevState => ([...prevState, {
      id: prevState.length,
      first_name: data.first_name,
      last_name: data.last_name,
      expenses: []
    }]))
  }

  const onSubmitEdit = (data) => {
    const editedRow = userInfo.find(user => user.id === editRow?.id);
    editedRow.first_name = data.first_name;
    editedRow.last_name = data.last_name;
    console.log(editedRow)
    const updatedUsers = (arr, obj) => arr && arr.map(user => user.id === editRow?.id ? editedRow : user);
    setData(updatedUsers);
    handleClose();
  }

  console.log(userInfo)
  const getTotalExpenses = (expenses) => {
    const result = expenses.reduce((sum, {cost}) =>  sum + cost, 0)
    return result;
  }
  let rows = userInfo.map(user => createData(user.id, user.first_name, user.last_name, getTotalExpenses(user.expenses)));
  
  React.useEffect(() => {
    setUserInfo(userData)
  }, [userData])

  const handleDelete = (e, id) => {
    const filteredData = userInfo.filter(user => user.id !== id);
    console.log(filteredData)
    setData(filteredData);
  }
  return (
    <>
    <div>Users</div>
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
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                componentsProps={row}
              >
                <Box sx={style}>
                <form onSubmit={handleSubmit(onSubmitEdit)}>
                  First Name: <input type='text' placeholder={editRow?.first_name} {...register('first_name')} required/>
                  Last Name: <input type='text' placeholder={editRow?.last_name}{...register('last_name')} required/>
                  <input type="submit"/>
              </form>
                </Box>
              </Modal>
            <button onClick={e => handleDelete(e, row.id)}>Delete</button>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  Add User
  <form onSubmit={handleSubmit(onSubmit)}>
    First Name: <input type='text' id="first-name" name="first-name"  {...register('first_name')} placeholder='John' required/>
    Last Name: <input type='text' id="last-name" name="last=name" {...register('last_name')} placeholder='Smith' required/>
    <input type="submit"/>
  </form>
  </>
  )
}


