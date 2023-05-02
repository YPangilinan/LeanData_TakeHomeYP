import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Users from './Components/Users';
import Expenses from './Components/Expenses';
import CompanyExpenses from './Components/CompanyExpenses';
import Container from '@mui/material/Container';

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {
  const [data, setData] = React.useState(userData);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <Container maxWidth="md">
        <img src='https://d9hhrg4mnvzow.cloudfront.net/www.leandata.com/the-best-option/e066e281-ld-logo_108y01w000000000000000.png' alt="lean-data-logo"/>

        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Users Table" {...a11yProps(0)} />
            <Tab label="Expenses Table" {...a11yProps(1)} />
            <Tab label="Category Expenses Table" {...a11yProps(2)} />
          </Tabs>
        </Box>
          <TabPanel value={value} index={0}>
          <Users userData={data} setData={setData} />
          </TabPanel>
          <TabPanel value={value} index={1}>
          <Expenses expenseData={data} setData={setData}/>
          </TabPanel>
          <TabPanel value={value} index={2}>
          <CompanyExpenses categoryData={data} setData={setData}/>
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}

export default App;

