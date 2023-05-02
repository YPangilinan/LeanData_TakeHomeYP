import React from 'react';
import './App.css';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Users from './Components/Users';
import Expenses from './Components/Expenses';
import CompanyExpenses from './Components/CompanyExpenses';
import Container from '@mui/material/Container';
import { TabPanel, a11yProps } from './Components/TabPanel';

//importing userdata json 
const userData = require('./userData.json');

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
        {/* Navigation Tabs for the 3 different tables */}
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="navigation-tabs">
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
          <CompanyExpenses categoryData={data}/>
          </TabPanel>
        </Box>
      </Container>
    </div>
  );
}

export default App;

