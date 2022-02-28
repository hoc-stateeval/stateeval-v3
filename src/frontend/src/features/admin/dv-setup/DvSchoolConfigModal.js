import { useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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

import {
  useGetSchoolsInDistrictQuery,
  useUpdateDvRoleInSchoolsMutation,
} from "@api-slice";

import { RoleType } from "@lib/enums";

const getDvBuildingRolesInSchools = (user, districtCode) => {
  return user.userBuildingRoles.reduce((acc, next) => {
    if (
      next.districtCode === districtCode &&
      next.schoolCode !== "" &&
      next.roleId === RoleType.DTE
    ) {
      acc.push(next);
    }

    return acc;
  }, []);
};

const DVSchoolConfigModal = ({ districtCode, user, setDlgOpen, dlgOpen }) => {
  const errorHandler = useErrorHandler();
  
  const [buildingRoles, setBuildingRoles] = useState(
    getDvBuildingRolesInSchools(user, districtCode)
  );
  const { data: schools } = useGetSchoolsInDistrictQuery(districtCode);
  const [updateRoles, {error: updateRolesError}] = 
    useUpdateDvRoleInSchoolsMutation();
  if (updateRolesError) errorHandler(updateRolesError);

  const handleClickDlgCancel = () => {
    setDlgOpen(false);
  };

  const handleClickDlgOk = async () => {
    updateRoles({
      userId: user.id,
      newUserBuildingRoles: buildingRoles,
    });

    setDlgOpen(false);
  };

  const toggleConfigureUserInRoleAtSchool = (buildingId) => {
    const match = buildingRoles.find((x) => x.buildingId === buildingId);
    if (!match) {
      setBuildingRoles([
        ...buildingRoles,
        {
          id: 0,
          userId: user.id,
          buildingId: buildingId,
          roleId: RoleType.DTE,
        },
      ]);
    } else {
      setBuildingRoles(
        buildingRoles.filter((x) => x.buildingId !== buildingId)
      );
    }
  };

  return (
    <>
      <Dialog open={dlgOpen} onClose={handleClickDlgCancel} maxWidth={"md"}>
        <DialogTitle>
          Configure District-wide Teacher Evaluator Schools
        </DialogTitle>
        <DialogContent>
          <Box>
            <Stack spacing={3}>
              <Typography variant="body1">
                Check the schools where the <strong>{user.displayName}</strong>{" "}
                can view evaluators.
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Select</TableCell>
                      <TableCell align="center">School</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {schools &&
                      schools.map((school) => (
                        <TableRow key={school.id}>
                          <TableCell align="center">
                            <Checkbox
                              color="secondary"
                              checked={user.userBuildingRoles.find(
                                (x) => x.buildingId === school.id
                              )}
                              onChange={(event) => {
                                toggleConfigureUserInRoleAtSchool(school.id);
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">
                            {school.schoolName}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickDlgCancel}>Cancel</Button>
          <Button onClick={handleClickDlgOk}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DVSchoolConfigModal;
