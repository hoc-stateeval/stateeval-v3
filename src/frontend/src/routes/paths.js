
export const unAuthenticatedPaths = {
  login: '/login'
};

const adminRoot = '/admin';
const assignmentsRoot = `${adminRoot}/assignments`;
const assignmentsSchoolDetailRoot = `${assignmentsRoot}/school-detail/`;
export const adminPaths = {
  daPrDashboard: `${adminRoot}/dashboards/da-pr`,
  daTrDashboard: `${adminRoot}/dashboards/da-tr`,
  assignmentsRoot: `${assignmentsRoot}`,
  dteSetup: `${assignmentsRoot}/dte-setup`,
  assignmentsDistrictSummary: `${assignmentsRoot}/district-summary`,
  assignmentsDistrictDetail: `${assignmentsRoot}/district-detail`,
  assignmentsSchoolDetailRoot: `${assignmentsSchoolDetailRoot}`,
  assignmentsSchoolDetail: `${assignmentsSchoolDetailRoot}/:schoolCode/:schoolName`,
};

const evaluationRoot = '/evaluation';
const evalSettingsRoot = `${evaluationRoot}/settings`;
export const evaluationPaths = {
  prTrDashboard: `${evaluationRoot}/dashboards/pr-tr`,
  prPrDashboard: `${evaluationRoot}/dashboards/pr-pr`,
  prMeDashboard: `${evaluationRoot}/dashboards/pr-me`,
  trMeDashboard: `${evaluationRoot}/dashboards/tr-me`,
  artifacts: `${evaluationRoot}/artifacts`,
  ytdEvidence: `${evaluationRoot}/ytd`,
  studentGrowth: `${evaluationRoot}/sgg`,
  observations: `${evaluationRoot}/observations`,
  selfAssessments: `${evaluationRoot}/self-assessments`,
  summativeEvaluation: `${evaluationRoot}/summative-eval`,
  settingsRoot: `${evalSettingsRoot}`,
  settingsGeneral: `${evalSettingsRoot}/general`,
  settingsAssignments: `${evalSettingsRoot}/assignments`,
  settingsPromptBank: `${evalSettingsRoot}/prompt-bank`,
};

const dvRoot = '/district-viewer';
export const districtViewerPaths = {
  prTrDashboard: `${dvRoot}/dashboards/pr-tr`,
  prPrDashboard: `${dvRoot}/dashboards/pr-pr`,
  dteDashboard: `${dvRoot}/dashboards/dte`,
  deDashboard: `${dvRoot}/dashboards/de`,
  ctDashboard: `${dvRoot}/dashboards/ct`
};
