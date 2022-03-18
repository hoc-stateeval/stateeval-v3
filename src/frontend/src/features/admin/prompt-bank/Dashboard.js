import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from 'react';

import { 
  Box,
  Tab,
  Tabs,
  Typography 
} from "@mui/material";

import { setPageTitle } from "@user-context-slice";

import PromptTypeConfig from "./PromptTypeConfig";
import { PageSectionHeader, TabPanel } from "@components";
import { UserPromptTypes } from "@lib/eval-helpers";

const Dashboard = () => {
  const dispatch = useDispatch();
  const pageTitle = "Prompt Bank Dashboard";

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onChangeActiveTab = (event, activeTabIndex) => {
    setActiveTabIndex(activeTabIndex);
  };

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTabIndex} onChange={onChangeActiveTab} aria-label="prompt bank tabs">
          {UserPromptTypes.map((x,i) => (<Tab key={i} label={x.shortName} />))}
        </Tabs>
      </Box>
      {UserPromptTypes.map((x,i) => (
        <TabPanel key={i} value={activeTabIndex} index={i}  label={x.name}>
          <PromptTypeConfig promptType={x} />
        </TabPanel>
      ))}
    </Box>
    </>
  );
};

export default Dashboard;
