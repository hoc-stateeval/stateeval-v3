import { useSelector, useDispatch } from 'react-redux';

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
  selectActiveRubricRowId,
  selectSelectedEvidenceItems,
  setSelectedEvidenceItems,
  selectEvidencePackageRubricAlignment,
  createEvidencePackage,
} from "@evidence-collection-slice";

import { 
  selectActiveEvaluationId, 
  selectCurrentUser,
} from "@user-context-slice";

import { EvidenceCollectionType } from "@lib/enums";

import './evidence-package-builder.css';

const EvidencePackageBuilder = () => {
  const dispatch = useDispatch();

  const rubricAlignment = useSelector(selectEvidencePackageRubricAlignment);
   const evaluationId = useSelector(selectActiveEvaluationId);
  const rubricRowId = useSelector(selectActiveRubricRowId);
  const currentUser = useSelector(selectCurrentUser);
  const selectedEvidenceItems = useSelector(selectSelectedEvidenceItems);

  const onClickCreateEvidencePackage = async () => {

    let data = {
      collectionType: EvidenceCollectionType.OTHER_EVIDENCE,
      collectionObjectId: evaluationId,
      evaluationId: evaluationId,
      rubricRowId: rubricRowId,
      createdByUserId: currentUser.id,
      rubricStatement: rubricAlignment.rubricStatement,
      public: true, 
      performanceLevel: rubricAlignment.performanceLevel,
      evidenceItemIds: selectedEvidenceItems.reduce((acc, next)=> {
        acc.push(next.evidenceItem.id);
        return acc;
      }, [])
    }

    await dispatch(createEvidencePackage(data));

    const newState = selectedEvidenceItems
          .map(x=>({...x, selected: false}));
    dispatch(setSelectedEvidenceItems(newState));
  }

  const deSelectEvidenceItem = (selectedEvidenceItem) => {
    const newState = selectedEvidenceItems
          .map(x=>(x.evidenceItem.id===selectedEvidenceItem.evidenceItem.id?{...x, selected: false} : x));
    dispatch(setSelectedEvidenceItems(newState));
  };

  return (
    <>
      <div className="evidence-package-builder">
        <Typography variant="h4">Evidence Package Creation</Typography>
        <Divider/>
        <div className="subhead"><strong>Evidence demonstrating the claim</strong></div>
        <ul className="selected-evidence">
          {selectedEvidenceItems.filter(x=>x.selected).map((next, i)=> {
            return (
              <li key={i} className="item-row">
                <div className="index">{i+1}</div>
                <div>{next.evidenceItem.evidenceTypeDisplayName}</div>
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