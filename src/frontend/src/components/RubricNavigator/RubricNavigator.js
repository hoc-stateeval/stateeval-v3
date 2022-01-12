import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import {
  selectActiveFramework,
} from "@user-context-slice";

import {
  setActiveFrameworkNodeId,
  setActiveRubricRowId,
} from "@rubric-navigator-slice";

import './rubric-helper.css';

const RubricNavigatorRubricRow = ({rubricRow}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const onClickRubricRow = () => {
    dispatch(setActiveRubricRowId(rubricRow.id));
  }

  return (
    <Box className="section-row rubric-row" onClick={()=>onClickRubricRow()} >
        <Box className="row-name cell-1">{rubricRow?.shortName} </Box>
        <Box className="cell-2">{rubricRow.title}</Box>
        <Box className="cell-3"></Box>
    </Box>
  )
};

const RubricNavigatorFrameworkNode = ({frameworkNode, toggleExpanded, expanded}) => {

  const dispatch = useDispatch();
  const theme = useTheme();

  // the old site had different behavior if you clicked the shortname vs
  // the title, but it now just always switches framework ndoes when 
  // you click on a different one.

  const clickRow = () => {
    toggleExpanded(frameworkNode);
    dispatch(setActiveFrameworkNodeId(frameworkNode.id));
    dispatch(setActiveRubricRowId(frameworkNode.rubricRows[0].id))
  }
  const onClickFrameworkNodeShortName = () => {
    clickRow();
  }

  const onClickFrameworkNodeTitle = () => {
    clickRow();
  }

  return (
    <>
      <Box  className={`section-row node-row ${expanded ? "rr-expand" : ""}`}>
        <div className="node-name cell-1" onClick={()=>onClickFrameworkNodeShortName()}>{frameworkNode?.shortName} </div>
        <div className="cell-2" onClick={()=>onClickFrameworkNodeTitle()}>{frameworkNode.title}</div>
        <div className="cell-3"></div>
      </Box>

      <Box className={`${expanded ? "expand" : "collapse"}`}>
        {frameworkNode.rubricRows.map((x) => {
          return (<RubricNavigatorRubricRow key={x.id} rubricRow={x} />);
        })}
      </Box>
    </>
  )
};

const RubricNavigator = () => {

  const activeFramework = useSelector(selectActiveFramework);
  const [expandedMap, setExpandedMap] = useState({});

  const toggleExpanded = (frameworkNode) => {
    let newMap = {...expandedMap};
    let newValue = !newMap[frameworkNode.id];
    for (const prop in newMap) {
      newMap[prop] = false;
    }
    if (!expandedMap[frameworkNode.id]) {
      newMap[frameworkNode.id] = true;
    }
    else {
      newMap[frameworkNode.id] = newValue;
    }
    setExpandedMap(newMap);
  }

  return (
    <>
      <Box className="rubric-helper">
        <Box className="framework-highlight well">
          <Typography className="row" variant="h4">Rubric Navigator</Typography>
          {activeFramework.frameworkNodes.map((x)=> (
            <Box className="section">
                <RubricNavigatorFrameworkNode 
                  key={x.id} 
                  frameworkNode={x} 
                  expanded={expandedMap[x.id] ?? false} 
                  toggleExpanded={toggleExpanded} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default RubricNavigator;