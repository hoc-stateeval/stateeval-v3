
import { PlanType } from '@lib/enums';

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

export {
  buildLastYearPlanTypeDisplayString,
  buildSuggestedPlanTypeDisplayString
};