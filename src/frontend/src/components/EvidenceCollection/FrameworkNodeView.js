import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { useErrorHandler } from 'react-error-boundary';

import { 
  Box,
  Typography 
} from "@mui/material";

import {
  selectActiveFrameworkId
} from "@user-context-slice";

import { 
  selectActiveFrameworkNodeId,
} from "@evidence-collection-slice";

import {
  useGetFrameworkByIdQuery
} from "@api-slice";

import {
  getFrameworkNode
} from "@lib/eval-helpers";

 const FrameworkNodeView = () => {

  const errorHandler = useErrorHandler();
  const [activeFrameworkNode, setActiveFrameworkNode] = useState(null);

  const activeFrameworkId = useSelector(selectActiveFrameworkId);
  const activeFrameworkNodeId = useSelector(selectActiveFrameworkNodeId);

  const { data: activeFramework, error: getFrameworkError } = 
    useGetFrameworkByIdQuery(activeFrameworkId);
  if (getFrameworkError) errorHandler(getFrameworkError);

  useEffect(()=> {
    if (!activeFramework) return;
    setActiveFrameworkNode(getFrameworkNode(activeFramework, activeFrameworkNodeId));

  }, [activeFramework, activeFrameworkNodeId])

  return (
    <>
      <Box>
        <Typography variant="h5" sx={{ mb:4}}>
          {activeFrameworkNode?.shortName} - {activeFrameworkNode?.title}
        </Typography>
      </Box>
    </>
  );
};

export default FrameworkNodeView;