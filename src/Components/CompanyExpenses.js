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

export default function CompanyExpenses({setData, categoryData}) {
  const [categoryInfo, setCategoryInfo] = React.useState(categoryData)
  const categories = {};
  const rows = [];

  categoryInfo.forEach(user => {
    user.expenses.forEach(expense => {
      const category = categories[expense.category]
      category ? categories[expense.category].push(expense) : categories[expense.category] = [expense]
    })
  })

  for(const [category, expenses] of Object.entries(categories)){
    let total = expenses.reduce((sum, {cost}) => sum + cost, 0);
    rows.push(createData(category, total))
  }

  React.useEffect(() => {
    setCategoryInfo(categoryData)
  }, [categoryData])

  return (
    <>
    <div>Company Expenses</div>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
