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

const RubricNavigatorFrameworkNode = ({frameworkNode}) => {

  const dispatch = useDispatch();
  const theme = useTheme();

  const [ expanded, setExpanded ] = useState(false);

  const onClickFrameworkNodeShortName = () => {
    dispatch(setActiveFrameworkNodeId(frameworkNode.id));
  }

  const onClickFrameworkNodeTitle = () => {
    setExpanded((prev)=>!prev);
    dispatch(setActiveFrameworkNodeId(frameworkNode.id));
  }

  return (
    <>
      <Box className="section-row node-row">
        <div className="node-name cell-1" onClick={()=>onClickFrameworkNodeShortName()}>{frameworkNode?.shortName} </div>
        <div className="cell-2" onClick={()=>onClickFrameworkNodeTitle()}>{frameworkNode.title}</div>
        <div className="cell-3"></div>
      </Box>

      <Box 
        style={{height:`${expanded ? "auto" : "0px"}`}} 
        className={`${expanded ? "collapse in" : "collapse"}`}
      >

        {frameworkNode.rubricRows.map((x) => {
          return (<RubricNavigatorRubricRow key={x.id} rubricRow={x} />);
        })}
      </Box>
    </>
  )
};

const RubricNavigator = () => {

  const activeFramework = useSelector(selectActiveFramework);

  return (
    <>
      <Box className="rubric-helper">
        <Box className="framework-highlight well">
          <Typography className="row" variant="h4">Rubric Navigator</Typography>
          {activeFramework.frameworkNodes.map((x)=> (
            <Box className="section">
                <RubricNavigatorFrameworkNode key={x.id} frameworkNode={x} />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default RubricNavigator;