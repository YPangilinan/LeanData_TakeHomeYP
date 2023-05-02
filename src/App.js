import React from 'react';
import './App.css';
// import { Box, Tabs, Tab } from '@mui/material';
// import { TabPanel } from '@mui/lab';
import Users from './Components/Users';
import Expenses from './Components/Expenses';
import CompanyExpenses from './Components/CompanyExpenses';

const userData = [{
  id: 0,
  first_name: "John",
  last_name: "Smith",
  expenses: [
    {
    expense_id: 0,
    category: "Equipment",
    description: "office supplies",
    cost: 200,
    },
    {
      expense_id: 1,
      category: "Food",
      description: "snacks",
      cost: 50
    },
]
},
{
  id: 1,
  first_name: "Paul",
  last_name: "Jones",
  expenses: [
    {
    expense_id: 0,
    category: "Equipment",
    description: "Toilet paper",
    cost: 105
    },
    {
      expense_id: 1,
      category: "Food",
      description: "ground meats",
      cost: 600
    },
]
},
]

function App() {
  const [data, setData] = React.useState(userData);

  return (
    <div className="App">
      <Users userData={data} setData={setData} />
      <Expenses expenseData={data} setData={setData}/>
      <CompanyExpenses categoryData={data} setData={setData}/>
    </div>
  );
}

export default App;
