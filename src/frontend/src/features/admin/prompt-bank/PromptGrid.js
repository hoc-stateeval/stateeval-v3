
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";

const PromptGrid = ({prompts}) => {
  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Prompt</TableCell>
              <TableCell align="center">Defined-By</TableCell>
              <TableCell align="center">Required-By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prompts &&
              prompts.map((prompt, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">
                      {prompt.prompt}
                    </TableCell>
                    <TableCell align="center">
                      {prompt.ownerTierDisplayName}
                    </TableCell>
                    <TableCell align="center">
                      {prompt.requiredByTierDisplayName}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PromptGrid;