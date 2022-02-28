import { useSelector, useDispatch } from 'react-redux';
import { useErrorHandler } from 'react-error-boundary';

import { 
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import {
  selectActiveEvaluationId,
  selectCurrentUser
} from "@user-context-slice";

import {
  selectActiveRubricRowId,
  selectCollectionType,
  selectCollectionObjectId,
  selectSelectedEvidenceItemIds,
  setSelectedEvidenceItemIds,
  selectEvidencePackageRubricAlignment,
} from "@evidence-collection-slice";

import {
  useGetEvidenceItemsForCollectionQuery,
  useCreateEvidencePackageMutation
} from "@api-slice";

import './evidence-package-builder.css';

const EvidencePackageBuilder = () => {
  const dispatch = useDispatch();
  const errorHandler = useErrorHandler();

  const currentUser = useSelector(selectCurrentUser);
  const activeEvaluationId = useSelector(selectActiveEvaluationId);
  const activeRubricRowId = useSelector(selectActiveRubricRowId);
  const collectionType = useSelector(selectCollectionType);
  const collectionObjectId = useSelector(selectCollectionObjectId);

  const rubricAlignment = useSelector(selectEvidencePackageRubricAlignment);
  const selectedEvidenceItemIds = useSelector(selectSelectedEvidenceItemIds);

  const { data: evidenceItemMap, error: getEvidenceItemMapError } = 
    useGetEvidenceItemsForCollectionQuery({
      collectionType,
      collectionObjectId,
      evaluationId: activeEvaluationId
    });
  if (getEvidenceItemMapError) errorHandler(getEvidenceItemMapError);

  const [createEvidencePackage, {error: createEvidencePackageError}] = useCreateEvidencePackageMutation();
  if (createEvidencePackageError) errorHandler(createEvidencePackageError);

  const onClickCreateEvidencePackage = async () => {
    await createEvidencePackage({
      collectionType: collectionType,
      collectionObjectId: collectionObjectId,
      evaluationId: activeEvaluationId,
      createdByUserId: currentUser.id,
      rubricRowId: activeRubricRowId,

      rubricStatement: rubricAlignment.rubricStatement,
      performanceLevel: rubricAlignment.performanceLevel,
      evidenceItemIds: selectedEvidenceItemIds
    });
    dispatch(setSelectedEvidenceItemIds([]));
  }

  const deSelectEvidenceItem = (evidenceItemId) => {
    dispatch(setSelectedEvidenceItemIds(selectedEvidenceItemIds.filter(x=>x===evidenceItemId)));
  };

  return (
    <>
      <div className="evidence-package-builder">
        <Typography variant="h4">Evidence Package Creation</Typography>
        <Divider/>
        <div className="subhead"><strong>Evidence demonstrating the claim</strong></div>
        <ul className="selected-evidence">
          {evidenceItemMap && selectedEvidenceItemIds.map((next, i)=> {
            const evidenceItem = evidenceItemMap[activeRubricRowId].find(x=>x.id===next);
            return (
              <li key={i} className="item-row">
                <div className="index">{i+1}</div>
                <div>{evidenceItem.evidenceTypeDisplayName}</div>
                <Tooltip title="Delete">
                  <IconButton onClick={()=>{ deSelectEvidenceItem(next)}}>
                    <DeleteRoundedIcon fontSize="small" sx={{}} />
                  </IconButton>
                </Tooltip>
              </li>
            )
          })}
          <Typography  variant="subhead"><strong>Relevant Rubric Alignment</strong></Typography>
          {}
          {/* <Button variant="contained" color="secondary" size="small">Go to Rubric</Button> and select the relevant rubric text */}
          <Stack direction="row" spacing={1} sx={{mt: 2, justifyContent:'flex-end'}}>
                <Button 
                  variant="contained" 
                  color="background" 
                  size="small"
                >Cancel</Button>
                <Button onClick={onClickCreateEvidencePackage}
                  variant="contained" 
                  color="secondary" 
                  size="small"
                >Create</Button>
              </Stack>
      </ul>
      </div>
    </>
  );
};

export default EvidencePackageBuilder;