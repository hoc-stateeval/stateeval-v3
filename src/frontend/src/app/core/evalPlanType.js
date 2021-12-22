const PlanType = {
  'UNDEFINED': 0,
  'COMPREHENSIVE': 1,
  'FOCUSED': 2,
  'MODIFIED_COMP_2021': 3
};

const buildLastYearPlanTypeDisplayString = (evaluation) => {
  const planType = evaluation.lastYearEvaluateePlanType;
  if (planType === PlanType.FOCUSED) {
    const focusFrameworkNodeShortName = evaluation.lastYearFocusedFrameworkNodeShortName;
    const focusSGFrameworkNodeShortName = evaluation.LastYearFocusedSGframeworkNodeShortName;
    if (focusSGFrameworkNodeShortName === focusFrameworkNodeShortName) {
      return `Focused: ${focusFrameworkNodeShortName}, ${focusSGFrameworkNodeShortName} (SG)`;
    }
    else {
      return `Focused: ${focusFrameworkNodeShortName}`;

    }
  }
  else if (planType === PlanType.MODIFIED_COMP_2021) {
    return "Modified Comprehensive";
  }
  else if (planType === PlanType.COMPREHENSIVE) {
    return "Comprehensive: C1-C8";
  }
  else {
    return "N/A";
  }
}

const buildSuggestedPlanTypeDisplayString = (evaluation) => {
  const planType = evaluation.nextYearEvaluateePlanType;
  if (planType === PlanType.FOCUSED) {
    const focusedFrameworkNodeShortName = evaluation.suggestedFocusedFrameworkNodeShortName;
    const focusedSGFrameworkNodeShortName = evaluation.suggestedFocusedSGframeworkNodeShortName;
    if (focusedSGFrameworkNodeShortName === focusedFrameworkNodeShortName) {
      return `Focused: ${focusedFrameworkNodeShortName}, ${focusedSGFrameworkNodeShortName} (SG)`;
    }
    else {
      return `Focused: ${focusedFrameworkNodeShortName}`;

    }
  }
  else if (planType === PlanType.COMPREHENSIVE) {
    return "Comprehensive: C1-C8";
  }
  else {
    return "N/A";
  }
}

// const buildCarryForwardDisplayString = (evaluation) => {
//   const performanceLevel = PerformanceLevelShortNameMapper[evaluation.carryForwardPerformanceLevel];
//   const schoolYear = SchoolYearMapper[evaluation.carryForwardSchoolYear];
//   return <Typography>Carry-forward: <strong>{performanceLevel} {schoolYear}</strong></Typography>;
// }

// const buildPlanTypeDisplayString = (evaluation) => {

//   let html = '';
//   const planTypeDisplayName = evaluation.planTypeDisplayName;
//   if (evaluation.planType === PlanType.FOCUSED) {
//     const focusedFrameworkNodeShortName = evaluation.focusedFrameworkNodeShortName;
//     const focusedSGFrameworkNodeShortName = evaluation.focusedSGFrameworkNodeShortName;
//     html = focusedFrameworkNodeShortName;
//     if (focusedSGFrameworkNodeShortName && focusedSGFrameworkNodeShortName !== focusedFrameworkNodeShortName) {
//       html = `${html}, ${focusedSGFrameworkNodeShortName} (SG)`;
//     }

//     if (evaluation.comprehensiveCarryForward) {
//       html = `${html}: ${buildCarryForwardDisplayString(evaluation)}`;
//     }
//     return html;
//   }
//   else if (evaluation.planType === PlanType.MODIFIED_COMP_2021) {
//     const fn1 = evaluation.focusedFrameworkNodeDisplayName;
//     const fn2 = evaluation.modifiedCompFocusedFrameworkNode2DisplayName;
//     const fnSG = evaluation.focusedSGFrameworkNodeDisplayName;
//     let html = `<strong>${fn1}, ${fn2}, ${fnSG}<strong>`;
//     if (evaluation.comprehensiveCarryForward) {
//       html = `${html}: ${buildCarryForwardDisplayString(evaluation)}`;
//     }
//     return html;
//   }
//   else if (evaluation.planType === PlanType.COMPREHENSIVE) {
//     return `${planTypeDisplayName}: C1-C8`;
//   }
//   else {
//     return `Unknown plan type: ${evaluation.evaluationType}`;
//   }
// }




export {
  PlanType,
  buildLastYearPlanTypeDisplayString,
  buildSuggestedPlanTypeDisplayString
};