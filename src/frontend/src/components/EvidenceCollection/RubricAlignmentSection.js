import { useSelector, useDispatch } from "react-redux";
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
  selectBuildingEvidencePackage,
  setEvidencePackageRubricAlignment,
} from "@evidence-collection-slice";

import { PerformanceLevel } from '@lib/enums';

import { PageSectionHeader } from "@components";



const RubricAlignmentSection = () => {
  const dispatch = useDispatch();

  const activeRubricRow = useSelector(selectActiveRubricRow);
  const buildingEvidencePackage = useSelector(selectBuildingEvidencePackage);

  const getSelectedText = () => {
    if (window.getSelection) {
        return window.getSelection().toString();
    } else if (document.getSelection) {
        return document.getSelection().toString();
    }
    else return '';
  }

  const onSelectEvidencePackageText = (performanceLevel) => {
    if (buildingEvidencePackage) {
      const text = getSelectedText();
      dispatch(setEvidencePackageRubricAlignment({rubricStatement: text, performanceLevel: performanceLevel}));
    }
  }

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
                <TableCell onMouseUp={()=> {onSelectEvidencePackageText(PerformanceLevel.UNS);}} dangerouslySetInnerHTML={{__html: `${activeRubricRow.pL1Descriptor}`}}></TableCell>
                <TableCell onMouseUp={()=> {onSelectEvidencePackageText(PerformanceLevel.BAS);}} dangerouslySetInnerHTML={{__html: `${activeRubricRow.pL2Descriptor}`}}></TableCell>
                <TableCell onMouseUp={()=> {onSelectEvidencePackageText(PerformanceLevel.PRO);}} dangerouslySetInnerHTML={{__html: `${activeRubricRow.pL3Descriptor}`}}></TableCell>
                <TableCell onMouseUp={()=> {onSelectEvidencePackageText(PerformanceLevel.DIS);}} dangerouslySetInnerHTML={{__html: `${activeRubricRow.pL4Descriptor}`}}></TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

    </>
  );
};

export default RubricAlignmentSection;