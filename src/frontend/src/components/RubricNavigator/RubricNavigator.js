import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import {
  Box,
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

export const getRowStyles = (theme, fn) => {

  const buildFirstChildStyles = (fn) => {
    if (fn) {
      return {
        ">div:first-of-type": {
          textAlign: 'center',
          width: '3rem',
          backgroundColor: `${rubricNavigatorNodeBackgroundColor}`,
          color: `${rubricNavigatorNodeTextColor}`,
          fontWeight: '700',
          "&:hover": {
             backgroundColor: `${rubricNavigatorNodeHoverBackgroundColor}`,
             color: `${rubricNavigatorNodeHoverTextColor}`,
          }    
        },
      }
    }
    else {
      return {
        ">div:first-of-type": {
          textAlign: 'center',
          width: '3rem',
         },
      }
    }
  }

  let styles = {
    display: 'grid',
    gridTemplateColumns:'3rem auto',
    gridTemplateRows: '3rem',
    ">div": {
      height: '3rem',
      lineHeight: '3rem',
      borderLeft: `1px solid ${rubricNavigatorBorderColor}`,
      borderTop: `1px solid ${rubricNavigatorBorderColor}`,
      cursor: 'pointer',
    },
    ">div:nth-of-type(2)": {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      borderRight: `1px solid ${rubricNavigatorBorderColor}`,
      padding: '3px',
      textAlign: 'left',
      width: 'auto',
    },
  };

  return {
    ...styles,
    ...buildFirstChildStyles(fn)
  }
}

const RubricNavigatorRubricRow = ({rubricRow}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const onClickRubricRow = () => {
    dispatch(setActiveRubricRowId(rubricRow.id));
  }

  return (
    <Box sx={{ ...getRowStyles(theme, false) }} >
        <div className="rr" onClick={()=>onClickRubricRow()}>{rubricRow?.shortName} </div>
        <div>{rubricRow.title}</div>
    </Box>
  )
};

const RubricNavigatorFrameworkNode = ({frameworkNode}) => {

  const dispatch = useDispatch();
  const theme = useTheme();

  // const [ expanded, setExpanded ] = useState(false);

  const onClickFrameworkNode = () => {
    //dispatch(setActiveFrameworkNodeId(frameworkNode.id));
  }

  return (
    <>
      <Box sx={{ ...getRowStyles(theme, true) }} >
        <div onClick={()=>onClickFrameworkNode()}>{frameworkNode?.shortName} </div>
        <div>{frameworkNode.title}</div>
      </Box>

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
      <Box sx={{borderBottom: `1px solid ${rubricNavigatorBorderColor}`}}>
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
      </Box>
    </>
  );
};

export default RubricNavigator;