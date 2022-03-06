import {
  Box,
  Typography
} from "@mui/material";

const TabPanel = ({children, title, value, index}) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h2">{title}</Typography>
          {children}
        </Box>
      )}
    </div>
  )
}

export default TabPanel;