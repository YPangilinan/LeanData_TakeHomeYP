import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  full_name,
  category,
  description,
  cost
) {
  return { full_name, category, description, cost};
}


export default function Expenses({setData, expenseData}) {
  const [expenseInfo, setExpenseInfo] = React.useState(expenseData);
  const userExpenses = {};
  const rows = [];

  expenseInfo.forEach(user => {
    const key = `${user.first_name} ${user.last_name}`.toString();
    userExpenses[key] = [...user.expenses]
  })
  console.log(userExpenses)

  for(const [user, expenses] of Object.entries(userExpenses)){
    for(const expense of expenses){
      rows.push(createData(user, expense.category, expense.description, expense.cost))
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
        {rows.map((row, index) => (
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}
