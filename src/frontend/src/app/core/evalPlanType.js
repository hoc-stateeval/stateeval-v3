import { PerformanceLevelShortNameMapper } from "./performanceLevel";
import { SchoolYearMapper } from "./schoolYear";

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
}

const buildSuggestedPlanTypeDisplayString = (evaluation) => {
  const planType = evaluation.nextYearEvaluateePlanType;
  if (planType === PlanType.FOCUSED) {
    const focusFrameworkNodeShortName = evaluation.suggestedFocusedFrameworkNodeShortName;
    const focusSGFrameworkNodeShortName = evaluation.suggestedFocusedSGframeworkNodeShortName;
    if (focusSGFrameworkNodeShortName === focusFrameworkNodeShortName) {
      return `Focused: ${focusFrameworkNodeShortName}, ${focusSGFrameworkNodeShortName} (SG)`;
    }
    else {
      return `Focused: ${focusFrameworkNodeShortName}`;

    }
  }
  else if (planType === PlanType.COMPREHENSIVE) {
    return "Comprehensive: C1-C8";
  }
}

const buildCarryForwardDisplayString = (evaluation) => {
  const performanceLevel = PerformanceLevelShortNameMapper[evaluation.comprehensiveCarryOverPerformanceLevel];
  const schoolYear = SchoolYearMapper[evaluation.comprehensiveCarryOverSchoolYear];
  return `Carry-forward: <strong>${performanceLevel} (${schoolYear})</strong>`;
}

const buildPlanTypeDisplayString = (evaluation) => {

  let html = '';
  const planTypeDisplayName = evaluation.planTypeDisplayName;
  if (evaluation.planType === PlanType.FOCUSED) {
    const focusFrameworkNode = evaluation.focusFrameworkNode;
    const focusSGFrameworkNode = evaluation.focusSGFrameworkNode;
    html = evaluation.focusFrameworkNodeDisplayName;
    if (focusSGFrameworkNode && focusSGFrameworkNode.id !== focusFrameworkNode.id) {
      html = `${html}, ${evaluation.focusSGFrameworkNodeDisplayName} (SG)`;
    }

    if (evaluation.comprehensiveCarryForward) {
      html = `${html}: ${buildCarryForwardDisplayString(evaluation)}`;
    }
    return html;
  }
  else if (evaluation.planType === PlanType.MODIFIED_COMP_2021) {
    const fn1 = evaluation.focusFrameworkNodeDisplayName;
    const fn2 = evaluation.modifiedCompFocusedFrameworkNode2DisplayName;
    const fnSG = evaluation.focusSGFrameworkNodeDisplayName;
    let html = `<strong>${fn1}, ${fn2}, ${fnSG}<strong>`;
    if (evaluation.comprehensiveCarryForward) {
      html = `${html}: ${buildCarryForwardDisplayString(evaluation)}`;
    }
    return html;
  }
  else if (evaluation.planType === PlanType.COMPREHENSIVE) {
    return `${planTypeDisplayName}: C1-C8`;
  }
  else {
    return `Unknown plan type: ${evaluation.evaluationType}`;
  }
}




export {
  PlanType,
  buildPlanTypeDisplayString,
  buildLastYearPlanTypeDisplayString,
  buildSuggestedPlanTypeDisplayString
};