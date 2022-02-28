import { useEffect, useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { useSelector } from "react-redux";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import CheckIcon from "@mui/icons-material/Check";

import {
  useGetHistoricalEvaluationsQuery,
  useUpdateEvaluationSetPlanTypeMutation,
} from "@api-slice";

import { selectActiveWorkAreaContext } from "@user-context-slice";
import { PlanType, PerformanceLevel } from "@lib/enums";

import { PlanTypeDisplay } from "@components";

const PlanTypeField = (props) => {
  const errorHandler = useErrorHandler();

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  const [evalSummary, setEvalSummary] = useState(props.evalSummary);
  const [dlgOpen, setDlgOpen] = useState(false);
  const [selectedFocusFrameworkNodeId, setSelectedFocusFrameworkNodeId] =
    useState(evalSummary.focusedFrameworkNodeId || "0");
  const [selectedFocusSGFrameworkNodeId, setSelectedSGFrameworkNodeId] =
    useState(evalSummary.focusedSGFrameworkNodeId || "0");
  const [showStudentGrowthSelect, setShowStudentGrowthSelect] = useState(false);
  const [
    recommendedCarryForwardEvaluation,
    setRecommendedCarryForwardEvaluation,
  ] = useState(null);
  const [selectedCarryForwardSchoolYear, setSelectedCarryForwardSchoolYear] =
    useState(evalSummary.carryForwardSchoolYear || "0");
  const [
    selectedCarryForwardPerformanceLevel,
    setSelectedCarryForwardPerformanceLevel,
  ] = useState(evalSummary.carryForwardPerformanceLevel || "0");
  const [showOkBtn, setShowOkBtn] = useState(false);
  const [selectedEvaluationId, setSelectedEvaluationId] = useState(null);

  const { data: evaluations } = useGetHistoricalEvaluationsQuery(
    evalSummary.evaluateeId
  );
  const [updatePlanType, {error: updatePlanTypeError}] = 
    useUpdateEvaluationSetPlanTypeMutation();
  if (updatePlanTypeError) errorHandler(updatePlanTypeError);

  useEffect(() => {
    const allFieldsComplete = () => {
      const focusNode = activeWorkAreaContext.stateFramework.frameworkNodes.find(
        (x) => x.id === selectedFocusFrameworkNodeId
      );
      if (!focusNode) return false;

      if (!focusNode.isStudentGrowthAligned) {
        const sgFocusNode = activeWorkAreaContext.stateFramework.frameworkNodes.find(
          (x) => x.id === selectedFocusSGFrameworkNodeId
        );
        if (!sgFocusNode) return false;
      }

      if (
        selectedCarryForwardSchoolYear === 0 ||
        selectedCarryForwardPerformanceLevel === 0
      )
        return false;

      return true;
    };

    setShowOkBtn(allFieldsComplete());
  }, [
    selectedCarryForwardPerformanceLevel,
    selectedCarryForwardSchoolYear,
    selectedFocusFrameworkNodeId,
    selectedFocusSGFrameworkNodeId,
    activeWorkAreaContext.stateFramework.frameworkNodes,
  ]);

  useEffect(() => {
    if (evaluations) {
      const potentialCarryForwardEvaluations = evaluations.filter(
        (evaluation) => {
          return (
            evaluation.schoolYear < evalSummary.schoolYear &&
            (evaluation.planType === PlanType.COMPREHENSIVE ||
              evaluation.planType === PlanType.MODIFIED_COMP_2021) &&
            evaluation.performanceLevel >= PerformanceLevel.PL3
          );
        }
      );

      const maxEvaluation = potentialCarryForwardEvaluations.reduce(
        (max, next) => {
          if (!max || next.schoolYear < max.schoolYear) {
            max = next;
          }
          return max;
        },
        null
      );

      setRecommendedCarryForwardEvaluation(maxEvaluation);
    }
  }, [evaluations, evalSummary.schoolYear]);

  const handleClickDlgCancel = () => {
    setDlgOpen(false);
  };

  const handleClickDlgOk = async () => {
    updatePlanType({
      evaluationId: selectedEvaluationId,
      evaluateePlanType: PlanType.FOCUSED,
      comprehensiveCarryForward: true,
      carryForwardPerformanceLevel: selectedCarryForwardPerformanceLevel,
      carryForwardSchoolYear: selectedCarryForwardSchoolYear,
      focusedFrameworkNodeId: selectedFocusFrameworkNodeId,
      focusedSGFrameworkNodeId:
        selectedFocusSGFrameworkNodeId === "0"
          ? null
          : selectedFocusSGFrameworkNodeId,
    }).then((response) => {
      setEvalSummary(response.data);
      setDlgOpen(false);
    });
  };

  const handleSelectFocusFrameworkNode = (id) => {
    const node = activeWorkAreaContext.stateFramework.frameworkNodes.find((x) => x.id === id);
    if (node.isStudentGrowthAligned) setSelectedSGFrameworkNodeId(null);
    setShowStudentGrowthSelect(!node || !node.isStudentGrowthAligned);
    setSelectedFocusFrameworkNodeId(id);
  };

  const handleSelectFocusSGFrameworkNode = (id) => {
    setSelectedSGFrameworkNodeId(id);
  };

  const setEvaluateePlanType = async (id, planType) => {
    if (
      planType === PlanType.COMPREHENSIVE ||
      planType === PlanType.UNDEFINED
    ) {
      updatePlanType({
        evaluationId: id,
        evaluateePlanType: planType,
        comprehensiveCarryForward: false,
        carryForwardPerformanceLevel: null,
        carryForwardSchoolYear: null,
        focusedFrameworkNodeId: null,
        focusedSGFrameworkNodeId: null,
      }).then((response) => {
        setEvalSummary(response.data);
      });
    } else if (planType === PlanType.FOCUSED) {
      setSelectedEvaluationId(id);
      setDlgOpen(true);
    }
  };

  return (
    <>
      <TextField
        sx={{ minWidth: "120px" }}
        size="small"
        select
        value={evalSummary.planType ? evalSummary.planType : "0"}
        onChange={(e) => {
          setEvaluateePlanType(evalSummary.id, parseInt(e.target.value));
        }}
      >
        <MenuItem value="0">Not Set</MenuItem>
        <MenuItem value="1">Comprehensive</MenuItem>
        <MenuItem value="2">Focused</MenuItem>
        <MenuItem value="3">Modified Comprehensive</MenuItem>
      </TextField>
      {(evalSummary.planType === PlanType.FOCUSED ||
        evalSummary.planType === PlanType.MODIFIED_COMP_2021) && (
        <>
          <PlanTypeDisplay evaluation={evalSummary} />
        </>
      )}
      <Dialog open={dlgOpen} onClose={handleClickDlgCancel} maxWidth={"md"}>
        <DialogTitle>Focused Evaluation Configuration</DialogTitle>
        <DialogContent>
          <Box>
            <Stack sx={{ mb: 3 }} spacing={3}>
              <Typography variant="subtitle2">
                Select Focus Criterion
              </Typography>
              <TextField
                label="Focus Criterion"
                sx={{ minWidth: "200px", mr: 2 }}
                select
                value={selectedFocusFrameworkNodeId}
                onChange={(e) => {
                  handleSelectFocusFrameworkNode(parseInt(e.target.value));
                }}
              >
                <MenuItem value="0">Not Set</MenuItem>
                {activeWorkAreaContext.stateFramework.frameworkNodes.map((x) => (
                  <MenuItem key={x.id} value={x.id}>
                    {x.shortName}
                  </MenuItem>
                ))}
              </TextField>

              {showStudentGrowthSelect && (
                <>
                  <Alert severity="info">
                    When the focus criterion is not a student growth criterion,
                    a student growth criterion must be selected in addition to
                    the focus criterion.
                  </Alert>
                  <TextField
                    label="Student Growth Criterion"
                    sx={{ minWidth: "200px" }}
                    select
                    value={selectedFocusSGFrameworkNodeId}
                    onChange={(e) => {
                      handleSelectFocusSGFrameworkNode(
                        parseInt(e.target.value)
                      );
                    }}
                  >
                    <MenuItem value="0">Not Set</MenuItem>
                    {activeWorkAreaContext.stateFramework.frameworkNodes
                      .filter((x) => x.isStudentGrowthAligned)
                      .map((x) => (
                        <MenuItem key={x.id} value={x.id}>
                          {x.shortName}
                        </MenuItem>
                      ))}
                  </TextField>
                </>
              )}
            </Stack>
          </Box>
          <Box>
            <Stack spacing={3}>
              <Typography variant="subtitle2">
                Select Carry-forward Evaluation
              </Typography>
              <Typography>
                The most recent comprehensive evaluation created in eVAL will be
                used as the recommended carry-forward evaluation. If one does
                not exist in eVAL, then you can manually select the school year
                and performance level.
              </Typography>
              {recommendedCarryForwardEvaluation ? (
                <>
                  <Typography variant="body1">
                    The following comprehensive evaluations have been recorded
                    in eVAL.
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table size="small" aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Recommended</TableCell>
                          <TableCell align="center">School Year</TableCell>
                          <TableCell align="center">Evaluation Cycle</TableCell>
                          <TableCell align="center">
                            Performance Level
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {evaluations.map((evaluation) => (
                          <TableRow key={evaluation.id}>
                            <TableCell align="center">
                              {evaluation.id ===
                                recommendedCarryForwardEvaluation && (
                                <CheckIcon color="secondary" fontSize="small" />
                              )}
                            </TableCell>
                            <TableCell align="center">
                              {evaluation.schoolYearDisplayName}
                            </TableCell>
                            <TableCell align="center">
                              {evaluation.planTypeDisplayName}
                            </TableCell>
                            <TableCell align="center">
                              {evaluation.performanceLevelDisplayName}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </>
              ) : (
                <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
                  There are no previous comprehensive evaluations with a
                  carry-forward score of PRO/DIS recorded in eVAL. To manually
                  enter a comprehensive year and performance level please select
                  from the drop-downs below.
                </Alert>
              )}
              <TextField
                label="Carry-forward School Year"
                sx={{
                  minWidth: "220px",
                  mt: 2,
                  mr: 2,
                }}
                select
                value={selectedCarryForwardSchoolYear}
                onChange={(e) => {
                  setSelectedCarryForwardSchoolYear(parseInt(e.target.value));
                }}
              >
                <MenuItem value="0">Select...</MenuItem>
                <MenuItem value="2014">2013-2014</MenuItem>
                <MenuItem value="2015">2014-2015</MenuItem>
                <MenuItem value="2016">2015-2016</MenuItem>
                <MenuItem value="2017">2016-2017</MenuItem>
                <MenuItem value="2018">2017-2018</MenuItem>
                <MenuItem value="2019">2018-2019</MenuItem>
                <MenuItem value="2020">2019-2020</MenuItem>
                <MenuItem value="2021">2020-2021</MenuItem>
              </TextField>
              <TextField
                label="Carry-forward Performance Level"
                sx={{ minWidth: "220px", mt: 2 }}
                select
                value={selectedCarryForwardPerformanceLevel}
                onChange={(e) => {
                  setSelectedCarryForwardPerformanceLevel(
                    parseInt(e.target.value)
                  );
                }}
              >
                <MenuItem value="0">Select...</MenuItem>
                <MenuItem value="3">PRO</MenuItem>
                <MenuItem value="4">DIS</MenuItem>
              </TextField>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickDlgCancel}>Cancel</Button>
          <Button disabled={!showOkBtn} onClick={handleClickDlgOk}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PlanTypeField;
