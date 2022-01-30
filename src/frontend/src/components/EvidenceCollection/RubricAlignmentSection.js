import { useSelector } from "react-redux";
import { 
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { 
  selectActiveRubricRow,
} from "@evidence-collection-slice";

import { PageSectionHeader } from "@components";



const RubricAlignmentSection = () => {

  const activeRubricRow = useSelector(selectActiveRubricRow);

  return (
    <>
      <Stack spacing={2}>
        <PageSectionHeader title={"Rubric Alignment"}></PageSectionHeader>

        <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>UNS</TableCell>
                <TableCell>BAS</TableCell>
                <TableCell>PRO</TableCell>
                <TableCell>DIS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow style={{verticalAlign:'top'}}>
                <TableCell  dangerouslySetInnerHTML={{__html: `${activeRubricRow.pL1Descriptor}`}}></TableCell>
                <TableCell dangerouslySetInnerHTML={{__html: `${activeRubricRow.pL2Descriptor}`}}></TableCell>
                <TableCell dangerouslySetInnerHTML={{__html: `${activeRubricRow.pL3Descriptor}`}}></TableCell>
                <TableCell dangerouslySetInnerHTML={{__html: `${activeRubricRow.pL4Descriptor}`}}></TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

    </>
  );
};

export default RubricAlignmentSection;