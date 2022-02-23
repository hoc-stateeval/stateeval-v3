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
  selectEvidencePackagesForActiveRubricRow,
  selectEvidencePackageRubricAlignment
} from "@evidence-collection-slice";

import { 
  PerformanceLevels,
  mapPerformanceLevelToRubricDescriptor
 } from '@lib/eval-helpers';
import { createHighlightedDescriptorHtml, getSelectedHtml } from '@lib/utils';

import { PageSectionHeader } from "@components";

const RubricDescriptor = ({rubricRow, performanceLevel}) => {
  const dispatch = useDispatch();

  const buildingEvidencePackage = useSelector(selectBuildingEvidencePackage);
  const evidencePackages = useSelector(selectEvidencePackagesForActiveRubricRow);
  const rubricAlignment = useSelector(selectEvidencePackageRubricAlignment);

  const onSelectEvidencePackageText = (performanceLevel) => {
    if (buildingEvidencePackage) {
      const html = getSelectedHtml();
      dispatch(setEvidencePackageRubricAlignment({rubricStatement: html, performanceLevel: performanceLevel.value}));
    }
  }

  const descriptor =  mapPerformanceLevelToRubricDescriptor(rubricRow, performanceLevel.value);
  let selections = evidencePackages.map(x=>{
    return {
      text: x.rubricStatement,
      performanceLevel: x.performanceLevel,
      code: 1,
    }
  }).filter(x=>x.performanceLevel === performanceLevel.value)
  if (buildingEvidencePackage && rubricAlignment && rubricAlignment.performanceLevel === performanceLevel.value) {
    selections = [...selections, {text: rubricAlignment.rubricStatement, performanceLevel: performanceLevel.value, code: 1}]
  }

  const descriptorWithHighlights = createHighlightedDescriptorHtml(descriptor, selections);

  return (
    <TableCell className="descriptor"
      onMouseUp={()=> {onSelectEvidencePackageText(performanceLevel)}} 
      dangerouslySetInnerHTML={{__html: `${descriptorWithHighlights}`}}>
      </TableCell>
  )
}

const RubricAlignmentSection = () => {

  const activeRubricRow = useSelector(selectActiveRubricRow);

  return (
    <>
      <Stack spacing={2}>
        <PageSectionHeader title={"Rubric Alignment"}></PageSectionHeader>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {PerformanceLevels.map((next, i)=>(
                  <TableCell key={i}>{next.shortName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow style={{verticalAlign:'top'}}>
                {PerformanceLevels.map((next, i)=>(
                  <RubricDescriptor key={i} rubricRow={activeRubricRow} performanceLevel={next} />
                ))
                }
             </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

    </>
  );
};

export default RubricAlignmentSection;