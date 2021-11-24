import FusePageCarded from '@fuse/core/FusePageCarded';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import SchoolAssignments from '../../../admin/assignments/SchoolAssignments';
import SchoolAssignmentsHeader from '../../../admin/assignments/SchoolAssignmentsHeader';
import { selectEvaluationsAll } from '../../../../store/stateEval/userContextSlice';

const Root = styled(FusePageCarded)(({ theme }) => ({
  '& .FusePageCarded-header': {
    minHeight: 72,
    height: 72,
    alignItems: 'center',
    [theme.breakpoints.up('sm')]: {
      minHeight: 136,
      height: 136,
    },
  },
  '& .FusePageCarded-content': {
    display: 'flex',
  },
  '& .FusePageCarded-contentCard': {
    overflow: 'hidden',
  },
}));


function Assignments() {

  const evaluations = useSelector(selectEvaluationsAll);

  return (
    <Root
      header={<SchoolAssignmentsHeader />}
      content={<SchoolAssignments evaluations={evaluations} />}
      innerScroll
    />
  );
}

export default Assignments;
