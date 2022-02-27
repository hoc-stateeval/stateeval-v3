import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useErrorHandler } from 'react-error-boundary';
import {
  Alert,
  Button,
  Checkbox,
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

import CheckIcon from "@mui/icons-material/Check";

import { setPageTitle, selectActiveWorkAreaContext } from "@user-context-slice";

import {
  useGetSchoolConfigurationsForFrameworkContextQuery,
  useGetAssignmentsSummaryForDistrictQuery,
  useUpdateSchoolConfigurationMutation,
  useUpdateSchoolConfigurationBatchEvaluationSetupDelegationMutation,
} from "@api-slice";

import { adminPaths } from '@routes/paths';
import { PageHeader } from "@components";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  backgroundColor: theme.palette.primary,
  color: theme.palette.text.primary,
}));

const getEvaluationSetupDelegatedToAllSchools = (schoolConfigs) => {
  schoolConfigs.reduce((acc, next) => {
    if (!next.evaluationSetupDelegated) return false;
    return true;
  }, true);
};

const AssignmentsDistrictSummary = () => {
  const dispatch = useDispatch();
  const handleError = useErrorHandler();

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
  const pageTitle = `Assignments for ${activeWorkAreaContext.evaluateeTerm} Evaluations`;

  const [totalCount, setTotalCount] = useState(0);
  const [assignedCount, setAssignedCount] = useState(0);
  const [setupDelegatedToAllSchools, setSetupDelegatedToAllSchools] =
    useState(false);

  const { data: schoolConfigs, error: error1 } =
    useGetSchoolConfigurationsForFrameworkContextQuery(
      activeWorkAreaContext.frameworkContextId
    );

  if (error1) {
    handleError(error1);
  }

  const { data: summaries, error: error2 } = useGetAssignmentsSummaryForDistrictQuery(
    activeWorkAreaContext.frameworkContextId
  );

  if (error2) {
    handleError(error2);
  }

  const [updateSchoolConfiguration] = useUpdateSchoolConfigurationMutation();
  const [batchUpdateEvaluationSetupDelegation] =
    useUpdateSchoolConfigurationBatchEvaluationSetupDelegationMutation();

  useEffect(() => {
    if (schoolConfigs?.length > 0) {
      setSetupDelegatedToAllSchools(
        getEvaluationSetupDelegatedToAllSchools(schoolConfigs)
      );
    }
  }, [schoolConfigs]);

  useEffect(() => {
    if (summaries?.length > 0) {
      const totalCount = summaries.reduce((totalCount, next) => {
        totalCount += next.totalCount;
        return totalCount;
      }, 0);

      const assignedCount = summaries.reduce((assignedCount, next) => {
        assignedCount += next.assignedCount;
        return assignedCount;
      }, 0);

      setTotalCount(totalCount);
      setAssignedCount(assignedCount);
    }
  }, [summaries]);

  useEffect(() => {
    dispatch(setPageTitle(pageTitle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTitle]);

  const toggleDelegationForSchool = (row, event) => {
    let schoolConfig = schoolConfigs.find(
      (x) => x.schoolCode === row.schoolCode
    );
    updateSchoolConfiguration({
      ...schoolConfig,
      evaluationSetupDelegated: !schoolConfig.evaluationSetupDelegated,
    });
  };

  const handleClickDelegateToAllSchools = () => {
    batchUpdateEvaluationSetupDelegation({
      frameworkContextId: activeWorkAreaContext.frameworkContextId,
      delegateEvalSetup: true,
    }).then(() => {
      setSetupDelegatedToAllSchools(true);
    });
  };

  return (
    <>
      <PageHeader title="Assignments Summary">
        Summary of {activeWorkAreaContext.evaluateeTerm}'s assignments across the
        entire district.
      </PageHeader>

      <Typography sx={{ mb: 3 }} variant="body1">
        By default, the district is responsible for assigning evaluators and
        choosing the evaluation plan type for {activeWorkAreaContext.evaluateeTermLC}{" "}
        evaluations. Districts can choose to allow school admins and principals
        to perform these tasks. Click the delegate to all schools button, or
        check the column for individual schools, to allow schools to perform
        these tasks.
      </Typography>
      {setupDelegatedToAllSchools ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          Evaluation setup has been delegated to all schools
        </Alert>
      ) : (
        <Button
          sx={{ mb: 2 }}
          color="secondary"
          size="small"
          variant="contained"
          onClick={handleClickDelegateToAllSchools}
        >
          Delegate to All Schools
        </Button>
      )}

      <Stack direction="row" sx={{ alignItems: "center", mb: 3 }} spacing={3}>
        <Item>
          <strong>Schools:&nbsp;</strong>
          {summaries?.length || "...loading"}
        </Item>
        <Item>
          <strong>{activeWorkAreaContext.evaluateeTerm}s Assigned:&nbsp;</strong>
          {assignedCount}
        </Item>
        <Item>
          <strong>
            {activeWorkAreaContext.evaluateeTerm}s Awaiting Assignment:&nbsp;
          </strong>
          {totalCount - assignedCount}
        </Item>
      </Stack>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Delegate to School</TableCell>
              <TableCell align="center">School</TableCell>
              <TableCell align="center">Evaluators</TableCell>
              <TableCell align="center">
                {activeWorkAreaContext.evaluateeTerm}s
              </TableCell>
              <TableCell align="center">Assigned</TableCell>
              <TableCell align="center">
                {activeWorkAreaContext.evaluateeTerm}s Awaiting Assignment
              </TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schoolConfigs &&
              summaries &&
              summaries.map((row) => (
                <TableRow key={row.schoolName}>
                  <TableCell align="center">
                    <Checkbox
                      color="secondary"
                      checked={
                        schoolConfigs.find(
                          (x) => x.schoolCode === row.schoolCode
                        ).evaluationSetupDelegated
                      }
                      onChange={(event) => {
                        toggleDelegationForSchool(row, event);
                      }}
                    />
                  </TableCell>
                  <TableCell align="center">{row.schoolName}</TableCell>
                  <TableCell align="center">
                    {row.evaluators.map((x) => (
                      <Typography variant="body1" key={x.id}>
                        {x.displayName}
                      </Typography>
                    ))}
                  </TableCell>
                  <TableCell align="center">{row.totalCount}</TableCell>
                  <TableCell align="center">{row.assignedCount}</TableCell>
                  <TableCell align="center">
                    {row.unassignedCount === 0 && (
                      <CheckIcon color="secondary" fontSize="small" />
                    )}
                    {row.unassignedCount > 0 && row.unassignedCount}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      component={RouterLink}
                      to={`${adminPaths.assignmentsRoot}/school-detail/${row.schoolCode}/${row.schoolName}`}
                      color="secondary"
                      size="small"
                      variant="contained"
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AssignmentsDistrictSummary;
