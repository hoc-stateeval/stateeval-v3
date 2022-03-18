
import { Typography } from "@mui/material";

const PageSectionHeader = ({title, children}) => {
  return (
    <>
      <Typography>{title}</Typography>
        {children}
    </>
  )
}

export default PageSectionHeader;