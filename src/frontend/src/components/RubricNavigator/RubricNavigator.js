import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  selectActiveFramework,
} from "@user-context-slice";

import {
  selectActiveFrameworkId,
  selectActiveRubricRowId,
  setActiveFrameworkNodeId,
  setActiveRubricRowId,
} from "@rubric-navigator-slice";


const rubricNavigatorBorderColor = 'grey';
const rubricNavigatorNodeBackgroundColor = '#2f4050';
const rubricNavigatorNodeTextColor = 'white';
const rubricNavigatorNodeHoverBackgroundColor ='#7FB8EC';
const rubricNavigatorNodeHoverTextColor = '#2F4050';

const RubricRowStyled = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns:'3rem auto',
  gridTemplateRows: '3rem',
  "> div": {
    height: '3rem',
    lineHeight: '3rem',
    borderLeft: `1px solid ${rubricNavigatorBorderColor}`,
    borderTop: `1px solid ${rubricNavigatorBorderColor}`,
    cursor: 'pointer',
  },
  "> div:first-of-type": {
    textAlign: 'center',
    width: '3rem',
  },
  ">div:nth-of-type(2)": {
     borderRight: '1px solid $rubric-navigator-border-color',
     padding: '3px',
     textAlign: 'left',
     width: 'auto',
     //fontSize: '.75rem',
  }
}));

const RubricNavigatorRubricRow = ({rubricRow}) => {

  const dispatch = useDispatch();

  const onClickRubricRow = () => {
    dispatch(setActiveRubricRowId(rubricRow.id));
  }

  return (
    <RubricRowStyled>
        <div className="rr" onClick={()=>onClickRubricRow()}>{rubricRow?.shortName} </div>
        <div>{rubricRow.title}</div>
    </RubricRowStyled>
  )
};

const RubricNavigatorFrameworkNode = ({frameworkNode}) => {

  const dispatch = useDispatch();

  // const [ expanded, setExpanded ] = useState(false);

  const onClickFrameworkNode = () => {
    //dispatch(setActiveFrameworkNodeId(frameworkNode.id));
  }

  return (
    <>
      <div className="fn">
        <div onClick={()=>onClickFrameworkNode()}>{frameworkNode?.shortName} </div>
        <div>{frameworkNode.title}</div>
      </div>

      <div>
        {frameworkNode.rubricRows.map((x)=>(
          <RubricNavigatorRubricRow key={x.id} rubricRow={x} />
        ))}
      </div>
    </>
  )
};

const RubricNavigator = () => {

  const activeFramework = useSelector(selectActiveFramework);

  return (
    <>
      <Paper>
        <Typography variant="h6">Rubric Navigator</Typography>
        <Stack spacing={3}>
          <div className="navigator">
            <div className="body">
              {activeFramework.frameworkNodes.map((x)=> (
                <RubricNavigatorFrameworkNode key={x.id} frameworkNode={x} />
              ))}
            </div>
          </div>
        </Stack>
      </Paper>
    </>
  );
};

export default RubricNavigator;