import {
  Typography,
} from '@mui/material';

import { PlanType } from '@lib/enums';
import { mapPerformanceLevelToShortName, SchoolYearMapper } from "@lib/eval-helpers";

const PlanTypeDisplay = ({evaluation}) => {
 
  const planTypeDisplayName = evaluation.planTypeDisplayName;

  if (evaluation.planType === PlanType.COMPREHENSIVE) {
    return <Typography variant="body1">{planTypeDisplayName}: C1-C8</Typography>
  }

  const performanceLevelShortName = mapPerformanceLevelToShortName(evaluation.carryForwardPerformanceLevel);
  const schoolYear = SchoolYearMapper[evaluation.carryForwardSchoolYear];

   if (evaluation.planType === PlanType.FOCUSED) {
    const focusedFrameworkNodeShortName = evaluation.focusedFrameworkNodeShortName;
    const focusedSGFrameworkNodeShortName = evaluation.focusedSGFrameworkNodeShortName;
    return <>
          <Typography variant="body1">
            <strong>{focusedFrameworkNodeShortName}{focusedSGFrameworkNodeShortName && `, ${focusedSGFrameworkNodeShortName} (SG)`}</strong>
          {/* </Typography>
          <Typography variant="body1"> */}
            {/* Carry-forward: <strong>{performanceLevel} {schoolYear}</strong> */}
            &nbsp;&nbsp;<strong>{performanceLevelShortName} - {schoolYear}</strong>
          </Typography>
          </>
  }
  else if (evaluation.planType === PlanType.MODIFIED_COMP_2021) {
    const fn1 = evaluation.focusedFrameworkNodeDisplayName;
    const fn2 = evaluation.modifiedCompFocusedFrameworkNode2DisplayName;
    const fnSG = evaluation.focusedSGFrameworkNodeDisplayName;
    return <Typography variant="body1">
              <strong>{fn1}, {fn2}, {fnSG}</strong> 
              Carry-forward: <strong>{performanceLevelShortName} {schoolYear}</strong>
            </Typography>
  }
  else {
    return `Unknown plan type: ${evaluation.evaluationType}`;
  }
};

export default PlanTypeDisplay;

