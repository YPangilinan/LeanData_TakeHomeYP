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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormGroup, Input } from '@mui/material';

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
  expense_id,
  full_name,
  category,
  description,
  cost
) {
  return { expense_id, full_name, category, description, cost};
}


export default function Expenses({setData, expenseData}) {
  const [expenseInfo, setExpenseInfo] = React.useState(expenseData);
  const userExpenses = {};
  const rows = [];
  const names = {};
  const categories = ['Food', 'Travel', 'Equipment'];
  let [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [cost, setCost] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState();
  console.log(editRow);
  const handleOpen = (e, row) => {
    setOpen(true)
    setEditRow(row);
  };
  const handleClose = () => setOpen(false);


  const onSubmitEdit = () => {
    console.log(editRow);
    console.log(name);
    let nameSeparate = editRow?.full_name.split(' ');
    console.log(nameSeparate);
    if(name !== editRow?.name){
      let oldExpense = expenseInfo.find(user => user.first_name === nameSeparate[0] && user.last_name === nameSeparate[1])
      // let filteredExpenses = expenseInfo?.expenses.filter(expense => expense.category !== category && expense.description !== description && expense.cost !== cost);
      // console.log(filteredExpenses, "filtered") 
    }
    
    // console.log(nameSeparate);
    // let newExpense = expenseInfo.find(user => user.first_name === nameSeparate[0] && user.last_name === nameSeparate[1])
    // console.log(newExpense)
    // newExpense.expenses.category = category;
    // const updatedExpenses = (arr, obj) => arr && arr.map(user => user.first_name === nameSeparate[0] && user.last_name === nameSeparate[1] ? newExpense : user);
    // setData(updatedExpenses);
    handleClose();
  }

  const handleDeleteRow = (e, row, id) => {;
    let nameSeparate = row.full_name.split(' ');
    let userToFilter = expenseInfo.find(user => user.first_name === nameSeparate[0] && user.last_name === nameSeparate[1])
    userToFilter.expenses = userToFilter.expenses.filter(expense => expense.expense_id !== id);
    console.log(userToFilter);

    const updatedExpenses = (arr, obj) => arr && arr.map(user => user.first_name === nameSeparate[0] && user.last_name === nameSeparate[1] ? userToFilter : user);

    setData(updatedExpenses);
  
  }


  const handleNameChange = (e, idx) => {
    setName(e.target.value);
  }

  //need to refactor for using a unique id vs finding name since users can have same name
  const handleAdd = () => {
    let nameSeparate = name.split(' ');
    let newExpense = expenseInfo.find(user => user.first_name === nameSeparate[0] && user.last_name === nameSeparate[1])
    newExpense.expenses.push({expense_id: newExpense.expenses.length, category: category, description: description, cost: parseInt(cost)});
    const updatedExpenses = (arr, obj) => arr && arr.map(user => user.first_name === nameSeparate[0] && user.last_name === nameSeparate[1] ? newExpense : user);
    console.log(updatedExpenses, "updated from here");
    setData(updatedExpenses);

  }


  expenseInfo.forEach(user => {
    const key = `${user.first_name} ${user.last_name}`.toString();
    names[key] = user.id;
    userExpenses[key] = [...user.expenses]
  })
  console.log(userExpenses)
  console.log(names);

  for(const [user, expenses] of Object.entries(userExpenses)){
    for(const expense of expenses){
      rows.push(createData(expense.expense_id, user, expense.category, expense.description, expense.cost))
    }
  }

  React.useEffect(() => {
    setExpenseInfo(expenseData)
  }, [expenseData])

  return (
    <>
    <div>Expenses</div>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Full Name</TableCell>
          <TableCell align="right">Category</TableCell>
          <TableCell align="right">Description</TableCell>
          <TableCell align="right">Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.full_name}
            </TableCell>
            <TableCell align="right">{row.category}</TableCell>
            <TableCell align="right">{row.description}</TableCell>
            <TableCell align="right">${row.cost}</TableCell>
            <Button onClick={e => handleOpen(e, row)}>Edit</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                componentsProps={row}
              >
                <Box sx={style}>
                <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Name</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={editRow?.name}
                        label="Name"
                        onChange={e => handleNameChange(e)}
                        required
                      >
                        {Object.keys(names).map((name, idx) => {return <MenuItem value={name}>{name}</MenuItem> })}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Category</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={editRow?.category}
                        label="Name"
                        onChange={e => setCategory(e.target.value)}
                        required
                      >
                        {categories.map(category => {return <MenuItem value={category}>{category}</MenuItem> })}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Description</InputLabel>
                      <Input id='desciption' type='text' value={editRow?.description} onChange={e => setDescription(e.target.value)} required/>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Cost</InputLabel>
                      <Input id='cost' type='number' value={editRow?.cost} onChange={e => setCost(e.target.value)} required/>
                    </FormControl>
                  <Button type='submit' onClick={onSubmitEdit}>Submit</Button>
                </Box>
              </Modal>
            <button onClick={e => handleDeleteRow(e, row, row.expense_id)}>Delete</button>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  Add Expense for User
  <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={name}
          label="Name"
          onChange={e => handleNameChange(e)}
          required
        >
          {Object.keys(names).map((name, idx) => {return <MenuItem value={name}>{name}</MenuItem> })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Name"
          onChange={e => setCategory(e.target.value)}
          required
        >
          {categories.map(category => {return <MenuItem value={category}>{category}</MenuItem> })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Description</InputLabel>
        <Input id='desciption' type='text' onChange={e => setDescription(e.target.value)} required/>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Cost</InputLabel>
        <Input id='cost' type='number' onChange={e => setCost(e.target.value)} required/>
      </FormControl>
      <Button onClick={handleAdd}>Add Expense</Button>
    </Box>
  </>
  )
}
