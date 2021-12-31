
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import DTESchoolConfigModal from './DTESchoolConfigModal';

import {
  setPageTitle,
} from '../../../store/stateEval/userContextSlice';

import {
  useGetUsersInRoleAtDistrictQuery,
} from '../../../core/apiSlice';

import {
  selectActiveWorkAreaContext,
} from '../../../store/stateEval/userContextSlice';

import { RoleType } from '../../../core/roleType';

const DTESetup = () => {
  const pageTitle = "District-wide Teacher Evaluator Setup";

  const dispatch = useDispatch();

  const workAreaContext = useSelector(selectActiveWorkAreaContext);

  const [dlgOpen, setDlgOpen] = useState(false);

  const { data : users } = useGetUsersInRoleAtDistrictQuery({ districtCode: workAreaContext.districtCode, roleType: RoleType.DTE});

  useEffect(()=> {
    dispatch(setPageTitle(pageTitle));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h2">{pageTitle}</Typography>
    
      <Stack spacing={3}>
        <Typography variant="body1">District users that are in the role District-wide Teacher Evaluator can be configured to be able to evaluate teachers in selected schools.
        Once the user has been configured for a school, the district administrator can assign the evaluator in the Assignments section.</Typography>
      
        <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="center">User</TableCell>
                <TableCell align="center">Schools</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users && users.map((user) => (
                <TableRow key={users.id}>
                  <TableCell align="center">
                    {user.displayName}
                  </TableCell>
                  {/* TODO: memo */}
                  <TableCell align="center">{user.userBuildingRoles.filter(x=>x.roleId===RoleType.DTE).map(x=>(<Typography variant="body1" key={x.buildingId}>{x.schoolName}</Typography>))}</TableCell>
                  <TableCell align="center">
                    <Button onClick={()=> {
                      setDlgOpen(true);
                    }} color="secondary" size="small" variant="contained">Edit</Button>
                    <DTESchoolConfigModal user={user} districtCode={workAreaContext.districtCode} setDlgOpen={setDlgOpen} dlgOpen={dlgOpen} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
    </TableContainer>
      </Stack>
    </>
  );
};

export default DTESetup;