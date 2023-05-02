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
  const handleOpen = (e, row) => {
    setOpen(true)
    setEditRow(row);
  };
  const handleClose = () => setOpen(false);

  //general function to update expenses state
  const updateExpensesData = (name, newExpenses) => {
    const updatedExpenses = (arr, obj) => arr && arr.map(user => user.first_name === name[0] && user.last_name === name[1] ? newExpenses : user);
    setData(updatedExpenses)
  }

  const filterExpenses = (name) => {
    return expenseInfo.find(user => user.first_name === name[0] && user.last_name === name[1])
  }

  //Currently, the functionality only allows to edit category, description, & cost.
  //Future addition is to add the ability to change the name
  const onSubmitEdit = () => {
    let nameSeparate = editRow?.full_name.split(' ');
    let expensesToChange = filterExpenses(nameSeparate);
      let expense = expensesToChange.expenses.filter(expense => expense.category === editRow.category && expense.description === editRow.description && expense.cost === editRow.cost);
      console.log(expense);
      expense.category = category;
      expense.description = description;
      expense.cost = cost;
      console.log("changed expense", expense);

      let newExpense =  expensesToChange.expenses.map(exp => expense.expense_id === expense.expense_id ? expense: exp)

      console.log(newExpense);
      console.log(expensesToChange)
      updateExpensesData(nameSeparate, expensesToChange);

    handleClose();
  }


  const handleDeleteRow = (e, row, id) => {;
    let nameSeparate = row.full_name.split(' ');
    let userToFilter = filterExpenses(nameSeparate)
    userToFilter.expenses = userToFilter.expenses.filter(expense => expense.expense_id !== id);
  
    updateExpensesData(nameSeparate, userToFilter)
  
  }


  const handleNameChange = (e, idx) => {
    setName(e.target.value);
  }

  //FUTURE TO-DO: need to refactor for using a unique id vs finding name since users can have same name
  const handleAdd = () => {
    let newExpense = filterExpenses(name.split(' '))
    newExpense.expenses.push({expense_id: newExpense.expenses.length, category: category, description: description, cost: parseInt(cost)});

    updateExpensesData(name.split(' '), newExpense);
  }


  expenseInfo.forEach(user => {
    const key = `${user.first_name} ${user.last_name}`.toString();
    names[key] = user.id;
    userExpenses[key] = [...user.expenses]
  })

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
                      <InputLabel id="demo-simple-select-label">Category</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        placeholder={editRow?.category}
                        label="Name"
                        onChange={e => setCategory(e.target.value)}
                        required
                      >
                        {categories.map(category => {return <MenuItem value={category}>{category}</MenuItem> })}
                      </Select>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Description</InputLabel>
                      <Input id='desciption' type='text' placeholder={editRow?.description} onChange={e => setDescription(e.target.value)} required/>
                    </FormControl>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Cost</InputLabel>
                      <Input id='cost' type='number' placeholder={editRow?.cost} onChange={e => setCost(e.target.value)} required/>
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
