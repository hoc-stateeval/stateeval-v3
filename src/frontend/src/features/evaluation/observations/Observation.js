
import { useState } from "react";

import { 
  Box,
  Tab,
  Tabs,
 } from "@mui/material";

import { TabPanel } from "@components";

import Settings from "./Settings";
import PreConference from "./PreConference";
import Observe from "./Observe";
import PostConference from "./PostConference";
import AlignAndScore from "./AlignAndScore";
import Artifacts from "./Artifacts";
import Report from "./Report";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Observation = () => {

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const onChangeActiveTab = (event, activeTabIndex) => {
    setActiveTabIndex(activeTabIndex);
  };

  return (
    <>
 <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeTabIndex} onChange={onChangeActiveTab} aria-label="observation tabs">
          <Tab label="Settings" {...a11yProps(0)} />
          <Tab label="Pre" {...a11yProps(1)} />
          <Tab label="Observe" {...a11yProps(2)} />
          <Tab label="Post" {...a11yProps(3)} />
          <Tab label="Align & Score" {...a11yProps(4)} />
          <Tab label="Artifacts" {...a11yProps(5)} />
          <Tab label="Report" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <TabPanel value={activeTabIndex} index={0} title="Settings">
        <Settings />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={1} title="Pre">
        <PreConference />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={2} title="Observe">
        <Observe />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={3} title="Post">
        <PostConference />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={4} title="Align & Score">
        <AlignAndScore />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={5} title="Artifacts">
        <Artifacts />
      </TabPanel>
      <TabPanel value={activeTabIndex} index={6} title="Report">
        <Report />
      </TabPanel>
    </Box>
    </>
  )
}

export default Observation;