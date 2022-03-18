import { useState } from "react";

import { 
  Box,
  Tab,
  Tabs,
 } from "@mui/material";

import { TabPanel } from "@components";

import OverviewTabContent from "./OverviewTabContent";
import SurveyList from "./SurveyList";

const Dashboard = () => {

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onChangeActiveTab = (event, activeTabIndex) => {
    setActiveTabIndex(activeTabIndex);
  };

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTabIndex} onChange={onChangeActiveTab} aria-label="perception survey tabs">
          <Tab label="Overview" />
          <Tab label="Surveys"/>
        </Tabs>
      </Box>
      <TabPanel value={activeTabIndex} index={0} title="Perception Surveys Overview">
        <OverviewTabContent />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={1} title="Perception Surveys">
        <SurveyList />
      </TabPanel>
    </Box>
    </>
  );
};

export default Dashboard;
