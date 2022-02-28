import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useErrorHandler } from 'react-error-boundary';

import { 
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";

import {
  useGetFrameworkByIdQuery,
  useGetEvidencePackagesForCollectionQuery
} from "@api-slice";

import {
  selectActiveEvaluationId,
  selectActiveFrameworkId
} from "@user-context-slice";

import { 
  selectActiveFrameworkNodeId,
  selectActiveRubricRowId,
  selectCollectionType,
  selectCollectionObjectId,
  selectBuildingEvidencePackage,
  setEvidencePackageRubricAlignment,
  selectEvidencePackageRubricAlignment
} from "@evidence-collection-slice";

import { 
  PerformanceLevels,
  mapPerformanceLevelToRubricDescriptor,
  getRubricRow
 } from '@lib/eval-helpers';

import { createHighlightedDescriptorHtml, getSelectedHtml } from '@lib/utils';

import { PageSectionHeader } from "@components";

const RubricDescriptor = ({performanceLevel}) => {
  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();

  const [descriptorWithHighlights, setDescriptorWithHighlights] = useState(null);

  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const activeFrameworkId = useSelector(selectActiveFrameworkId);
  const activeFrameworkNodeId = useSelector(selectActiveFrameworkNodeId);
  const activeRubricRowId = useSelector(selectActiveRubricRowId);
  const collectionType = useSelector(selectCollectionType);
  const collectionObjectId = useSelector(selectCollectionObjectId);
  const buildingEvidencePackage = useSelector(selectBuildingEvidencePackage);
  const rubricAlignment = useSelector(selectEvidencePackageRubricAlignment);

  const { data: activeFramework, error: getFrameworkError } = 
    useGetFrameworkByIdQuery(activeFrameworkId);
  if (getFrameworkError) errorHandler(getFrameworkError);

  const { data: evidencePackageMap, error: getEvidencePackageMapError } = 
    useGetEvidencePackagesForCollectionQuery({
      collectionType,
      collectionObjectId,
      evaluationId: activeEvaluationId
    });
  if (getEvidencePackageMapError) errorHandler(getEvidencePackageMapError);

  useEffect(()=> {
    if (!activeFramework || !evidencePackageMap) return;

    const activeRubricRow = getRubricRow(activeFramework, activeFrameworkNodeId, activeRubricRowId);
    const descriptor = mapPerformanceLevelToRubricDescriptor(activeRubricRow, performanceLevel.value);
    let evidencePackages = evidencePackageMap[activeRubricRowId];
    if (!evidencePackages) evidencePackages = [];

    let selections = evidencePackages.map(x=>{
      return {
        text: x.rubricStatement,
        performanceLevel: x.performanceLevel,
        code: 1,
      }
    }).filter(x=>x.performanceLevel === performanceLevel.value);
    
    if (buildingEvidencePackage && rubricAlignment && rubricAlignment.performanceLevel === performanceLevel.value) {
      selections = [...selections, {text: rubricAlignment.rubricStatement, performanceLevel: performanceLevel.value, code: 1}]
    }
  
    setDescriptorWithHighlights(createHighlightedDescriptorHtml(descriptor, selections));

  }, [activeFramework, evidencePackageMap, rubricAlignment, activeFrameworkNodeId, activeRubricRowId, performanceLevel, buildingEvidencePackage])

  const onSelectEvidencePackageText = (performanceLevel) => {
    if (buildingEvidencePackage) {
      const html = getSelectedHtml();
      dispatch(setEvidencePackageRubricAlignment({rubricStatement: html, performanceLevel: performanceLevel.value}));
    }
  }

  return (
    <TableCell className="descriptor"
      onMouseUp={()=> {onSelectEvidencePackageText(performanceLevel)}} 
      dangerouslySetInnerHTML={{__html: `${descriptorWithHighlights}`}}>
      </TableCell>
  )
}

const RubricAlignmentSection = () => {

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
                  <RubricDescriptor key={i} performanceLevel={next} />
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