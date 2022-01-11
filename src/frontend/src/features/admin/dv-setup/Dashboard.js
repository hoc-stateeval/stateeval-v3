import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
} from "@mui/material";

import DvSchoolConfigModal from "./DvSchoolConfigModal";

import { setPageTitle } from "@user-context-slice";

import { useGetUsersInRoleAtDistrictQuery } from "@api-slice";

import { selectActiveWorkAreaContext } from "@user-context-slice";

import { RoleType } from "@lib/enums";

const Dashboard = () => {
  const pageTitle = "District Viewer Setup";

  const dispatch = useDispatch();

  const workAreaContext = useSelector(selectActiveWorkAreaContext);

  const [dlgOpen, setDlgOpen] = useState(false);

  const { data: users } = useGetUsersInRoleAtDistrictQuery({
    districtCode: workAreaContext.districtCode,
    roleType: RoleType.DV,
  });

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Typography variant="h2">{pageTitle}</Typography>

      <Stack spacing={3}>
        <Typography variant="body1">
          District users that are in the role District Viewer
          can be configured to be able to view evaluators in selected schools.
        </Typography>

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
              {users &&
                users.map((user) => (
                  <TableRow key={users.id}>
                    <TableCell align="center">{user.displayName}</TableCell>
                    {/* TODO: memo */}
                    <TableCell align="center">
                      {user.userBuildingRoles
                        .filter((x) => x.roleId === RoleType.DTE)
                        .map((x) => (
                          <Typography variant="body1" key={x.buildingId}>
                            {x.schoolName}
                          </Typography>
                        ))}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          setDlgOpen(true);
                        }}
                        color="secondary"
                        size="small"
                        variant="contained"
                      >
                        Edit
                      </Button>
                      <DvSchoolConfigModal
                        user={user}
                        districtCode={workAreaContext.districtCode}
                        setDlgOpen={setDlgOpen}
                        dlgOpen={dlgOpen}
                      />
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

export default Dashboard;
