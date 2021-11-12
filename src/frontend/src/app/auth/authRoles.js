/**
 * Authorization Roles
 */

import { Roles } from '../main/core/enums';

const authRoles = {
  PR_PR: [Roles.PR_PR],
  PR_TR: [Roles.PR_TR],
  PR_ME: [Roles.PR_ME],
  TR_ME: [Roles.TR_ME],
  EVALUATION: [Roles.PR_PR, Roles.PR_TR, Roles.PR_ME, Roles.TR_ME],
  EVALUTOR: [Roles.PR_PR, Roles.PR_TR],
  EVALUATEE: [Roles.PR_ME, Roles.TR_ME],
  onlyGuest: [],
};

export const isEvaluator = (workArea) => authRoles.EVALUATION.includes(workArea.tagName);
export const isEvaluatee = (workArea) => authRoles.EVALUATEE.includes(workArea.tagName);

export default authRoles;
