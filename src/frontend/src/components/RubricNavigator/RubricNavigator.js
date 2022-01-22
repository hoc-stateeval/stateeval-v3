
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
} from "@mui/material";

import {
  selectActiveFramework,
  setActiveFrameworkNodeId,
  setActiveRubricRowId,
  selectActiveRubricRowId,
  selectActiveFrameworkNodeId
} from "@user-context-slice";

import './rubric-helper.css';

const RubricNavigatorRubricRow = ({rubricRow, selected}) => {
  const dispatch = useDispatch();

  const onClickRubricRow = () => {
    dispatch(setActiveRubricRowId(rubricRow.id));
  }

  return (
    <Box className={`section-row rubric-row ${selected ? "selected" : ""}`} onClick={()=>onClickRubricRow()} >
        <Box className="row-name cell-1">{rubricRow?.shortName} </Box>
        <Box className="cell-2">{rubricRow?.title}</Box>
        <Box className="cell-3"></Box>
    </Box>
  )
};

const RubricNavigatorFrameworkNode = ({frameworkNode, expanded}) => {

  const dispatch = useDispatch();
  const activeRubricRowId = useSelector(selectActiveRubricRowId);

  const clickRow = () => {
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
        <div className="cell-2" onClick={()=>onClickFrameworkNodeTitle()}>{frameworkNode?.title}</div>
        <div className="cell-3"></div>
      </Box>

      <Box className={`${expanded ? "expand" : "collapse"}`}>
        {frameworkNode.rubricRows.map((x) => {
          return (<RubricNavigatorRubricRow 
                    key={x.id} 
                    rubricRow={x} 
                    selected={x.id===activeRubricRowId}
                    />);
        })}
      </Box>
    </>
  )
};

const RubricNavigator = () => {

  const activeFramework = useSelector(selectActiveFramework);
  const activeFrameworkNodeId = useSelector(selectActiveFrameworkNodeId);

  return (
    <>
      <Box className="rubric-helper">
        <Box className="framework-highlight well">
          <Typography className="row" variant="h4">Rubric Navigator</Typography>
          {activeFramework.frameworkNodes.map((x)=> (
            <Box className="section" key={x.id} >
                <RubricNavigatorFrameworkNode 
                  frameworkNode={x} 
                  expanded={x.id===activeFrameworkNodeId}
                />
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default RubricNavigator;