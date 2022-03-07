import * as React from 'react';
import {useState} from "react"
import { Box, Tabs, Tab, Typography } from '@mui/material' 
import OverviewTabContent from './OverviewTabContent';
import SurveyList from './SurveyList';
import TabPanel from "@components"


const Dashboard = () => {
  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Overview"  />
          <Tab label="Surveys"  />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <OverviewTabContent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SurveyList />
      </TabPanel>
    </Box>
    </>
  );
};

export default Dashboard;
