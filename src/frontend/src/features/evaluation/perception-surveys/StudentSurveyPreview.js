import {
  Alert,
  AlertTitle,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import tableData from "./studentSurveyTableData";

const StudentSurveyPreview = ({statements}) => {

  return (
    <>
      <Alert severity="info">
        <AlertTitle>Status: Preview</AlertTitle>
        <Typography>
          This survey is currently being previewed. To switch back to building the survey, 
          click the <strong>Edit Survey</strong> button.
        </Typography>
      </Alert>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Statement</TableCell>
                {tableData.map((x,i)=>(
                  <TableCell key={i} align="center">{x.levelOfAgreementTitle}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
          {statements.map((statement, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="left">{i+1}</TableCell>
                  <TableCell align="left" sx={{width:'40%'}}>{statement.text}</TableCell>
                  {tableData.map((x,j)=>(
                  <TableCell key={j} align="center">
                    <Radio
                      name={j.toString()}
                      />
                  </TableCell>
                  ))}
                </TableRow>)
          })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default StudentSurveyPreview;