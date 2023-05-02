import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Input } from '@mui/material';
import style from './Style';

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
  const categories = ['Food', 'Travel', 'Equipment'];
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [cost, setCost] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const [editRow, setEditRow] = React.useState();
  const handleClose = () => setOpen(false);
  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => setAddOpen(false);
  const handleOpen = (e, row) => {
    setOpen(true)
    setEditRow(row);
  };
  const userExpenses = {};
  const rows = [];
  const names = {};

  //update component each time the general user data (from App.js) gets updated
  React.useEffect(() => {
    setExpenseInfo(expenseData)
  }, [expenseData])

  //creating a local component copy of the expense data
  expenseInfo.forEach(user => {
    const key = `${user.first_name} ${user.last_name}`.toString();
    names[key] = user.id;
    userExpenses[key] = [...user.expenses]
  })

  //populating the row data using the data from the local component copy
  for(const [user, expenses] of Object.entries(userExpenses)){
    for(const expense of expenses){
      rows.push(createData(expense.expense_id, user, expense.category, expense.description, expense.cost))
    }
  }

  //general function to update expenses state
  const updateExpensesData = (name, newExpenses) => {
    const updatedExpenses = (arr, obj) => arr && arr.map(user => user.first_name === name[0] && user.last_name === name[1] ? newExpenses : user);
    setData(updatedExpenses)
  }

  const filterExpenses = (name) => {
    return expenseInfo.find(user => user.first_name === name[0] && user.last_name === name[1])
  }

  const resetInputs = () => {
    setCategory('');
    setDescription('');
    setCost('');
    setName('');
  }

  //FUTURE TO-DO: need to refactor for using a unique id vs finding name since users can have same name
  const handleAdd = () => {
    //check if any inputs are empty
    if(category.length > 0 && description.length > 0 && cost.length > 0){
      let newExpense = filterExpenses(name.split(' '))
      newExpense.expenses.push({expense_id: newExpense.expenses.length, category: category, description: description, cost: parseInt(cost)});
  
      updateExpensesData(name.split(' '), newExpense);
      resetInputs();
    } else {
      alert('all field are required');
    }
    handleAddClose();
  }

  //Currently, the functionality only allows to edit category, description, & cost.
  //TODO: add the ability to edit the name
  const onSubmitEdit = () => {
    let nameSeparate = editRow?.full_name.split(' ');
    let expensesToChange = filterExpenses(nameSeparate);
    const expense = expensesToChange.expenses.find(expense => expense.category === editRow.category && expense.description === editRow.description && expense.cost === editRow.cost);
    const index = (expensesToChange.expenses.indexOf(expense))
      if(index !== -1){
        expensesToChange.expenses[index].category = category;
        expensesToChange.expenses[index].description = description;
        expensesToChange.expenses[index].cost = parseInt(cost);
      }
      if(category.length > 0 && description.length > 0 && cost.length > 0){
        updateExpensesData(nameSeparate, expensesToChange);
        resetInputs();
      } else {
        alert('all field are required');
      }
    handleClose();
  }

  const handleDeleteRow = (e, row, id) => {;
    let nameSeparate = row.full_name.split(' ');
    let userToFilter = filterExpenses(nameSeparate)
    userToFilter.expenses = userToFilter.expenses.filter(expense => expense.expense_id !== id);
  
    updateExpensesData(nameSeparate, userToFilter)
  }

  //add new expense modal
  const addExpenseModal = () => {
    return (
      <Modal
      open={addOpen}
      onClose={handleAddClose}
      aria-labelledby="add-expense-modal-title"
      aria-describedby="add-expense- modal-description"
    >
      <Box sx={style}>
        <FormControl fullWidth>
          <InputLabel>Name</InputLabel>
          <Select
            value={name}
            label="Name"
            onChange={e => setName(e.target.value)}
            required
          >
            {Object.keys(names).map((name) => {return <MenuItem value={name}>{name}</MenuItem> })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            label="Name"
            onChange={e => setCategory(e.target.value)}
            required
          >
            {categories.map(category => {return <MenuItem value={category}>{category}</MenuItem> })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Description</InputLabel>
          <Input id='desciption' type='text' onChange={e => setDescription(e.target.value)} required/>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Cost</InputLabel>
          <Input id='cost' type='number' onChange={e => setCost(e.target.value)} required/>
        </FormControl>
        <Button onClick={handleAdd}>Add Expense</Button>
      </Box>
    </Modal>
    )
  }

  //edit expense modal
  const editExpenseModal = () => {
    return (
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  placeholder={editRow?.category}
                  label="Name"
                  onChange={e => setCategory(e.target.value)}
                  required
                >
                  {categories.map(category => {return <MenuItem value={category}>{category}</MenuItem> })}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Description</InputLabel>
                <Input id='desciption' type='text' placeholder={editRow?.description} onChange={e => setDescription(e.target.value)} required/>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Cost</InputLabel>
                <Input id='cost' type='number' placeholder={editRow?.cost} onChange={e => setCost(e.target.value)} required/>
              </FormControl>
            <Button type='submit' onClick={onSubmitEdit}>Submit</Button>
          </Box>
        </Modal>  
    )
  }

  return (
    <>
    <h3>Expenses</h3>
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
            {open ? editExpenseModal() : ''}
            <Button onClick={e => handleDeleteRow(e, row, row.expense_id)}>Delete</Button>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <br/>
    <Button onClick={handleAddOpen}>Add New Expense</Button>
    {addOpen ? addExpenseModal() : ''}
    </>
  )
}
