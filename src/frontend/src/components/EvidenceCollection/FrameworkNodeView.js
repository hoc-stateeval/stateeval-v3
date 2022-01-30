import { useSelector } from "react-redux";
import { 
  Box,
  Typography 
} from "@mui/material";

import { 
  selectActiveFrameworkNode,
} from "@evidence-collection-slice";

 const FrameworkNodeView = () => {
  const activeFrameworkNode = useSelector(selectActiveFrameworkNode);

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