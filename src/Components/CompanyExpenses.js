import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  category,
  total
) {
  return { category, total};
}

export default function CompanyExpenses({categoryData}) {
  const [categoryInfo, setCategoryInfo] = React.useState(categoryData)
  const categories = {};
  const rows = [];

  React.useEffect(() => {
    setCategoryInfo(categoryData)
  }, [categoryData])

  //creating a local map of the category and total expenses information 
  categoryInfo.forEach(user => {
    user.expenses.forEach(expense => {
      categories[expense.category] ? categories[expense.category] += expense.cost : categories[expense.category] = expense.cost;
    })
  })

  //find the populate the row data
  for(const [category, expenses] of Object.entries(categories)){
    rows.push(createData(category, expenses))
  }

  return (
    <>
    <h3>Company Expenses</h3>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          <TableCell>Category</TableCell>
          <TableCell align="right">Total Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.category}
            </TableCell>
            <TableCell align="right">${row.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </>
  )
}
