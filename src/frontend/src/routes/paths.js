
export const unAuthenticatedPaths = {
  login: '/login'
};

const adminRoot = '/admin';
const adminDashboardsRoot = `${adminRoot}/dashboards`
const assignmentsRoot = `${adminRoot}/assignments`;
const assignmentsSchoolDetailRoot = `${assignmentsRoot}/school-detail/`;
const promptBankRoot = `${adminRoot}/prompt-bank`;
const adminSettingsRoot =   `${adminRoot}/settings`;

export const adminPaths = {
  daPrDashboard: `${adminDashboardsRoot}/da-pr`,
  daTrDashboard: `${adminDashboardsRoot}/da-tr`,
  saPrDashboard: `${adminDashboardsRoot}/sa-pr`,
  saTrDashboard: `${adminDashboardsRoot}/sa-tr`,

  assignmentsRoot: `${assignmentsRoot}`,
  assignmentsDistrictSummary: `${assignmentsRoot}/district-summary`,
  assignmentsDistrictDetail: `${assignmentsRoot}/district-detail`,
  assignmentsSchoolDetailRoot: `${assignmentsSchoolDetailRoot}`,
  assignmentsSchoolDetail: `${assignmentsSchoolDetailRoot}/:schoolCode/:schoolName`,

  promptBankRoot: `${promptBankRoot}`,

  dteSetup: `${adminRoot}/dte-setup`,
  dvSetup: `${adminRoot}/dv-setup`,

  settings: `${adminSettingsRoot}`,
  settingsGeneral: `${adminSettingsRoot}/general`,

  reports: `${adminRoot}/reports`,
  resources: `${adminRoot}/resources`,
};

const evaluationRoot = '/evaluation';
const evalDashboardsRoot = `${evaluationRoot}/dashboards`
const evalSettingsRoot = `${evaluationRoot}/settings`;

export const evaluationPaths = {
  prTrDashboard: `${evalDashboardsRoot}/pr-tr`,
  prPrDashboard: `${evalDashboardsRoot}/pr-pr`,
  prMeDashboard: `${evalDashboardsRoot}/pr-me`,
  trMeDashboard: `${evalDashboardsRoot}/tr-me`,
  dteDashboard: `${evalDashboardsRoot}/dte`,
  deDashboard: `${evalDashboardsRoot}/de`,
  ctDashboard: `${evalDashboardsRoot}/ct`,

  artifacts: `${evaluationRoot}/artifacts`,
  ytdEvidence: `${evaluationRoot}/ytd`,
  studentGrowth: `${evaluationRoot}/sgg`,
  observations: `${evaluationRoot}/observations`,
  selfAssessments: `${evaluationRoot}/self-assessments`,
  midYearEvaluation:  `${evaluationRoot}/mid-year-eval`,
  summativeEvaluation: `${evaluationRoot}/summative-eval`,
  resources:  `${evaluationRoot}/resources`,

  settingsRoot: `${evalSettingsRoot}`,
  settingsGeneral: `${evalSettingsRoot}/general`,
  settingsAssignments: `${evalSettingsRoot}/assignments`,
  settingsPromptBank: `${evalSettingsRoot}/prompt-bank`,
};

const dvRoot = '/district-viewer';
const dvDashboardsRoot = `${dvRoot}/dashboards`

export const districtViewerPaths = {
  prTrDashboard: `${dvDashboardsRoot}/pr-tr`,
  prPrDashboard: `${dvDashboardsRoot}/pr-pr`,
  dteDashboard: `${dvDashboardsRoot}/dte`,
  deDashboard: `${dvDashboardsRoot}/de`,
  ctDashboard: `${dvDashboardsRoot}/ct`
};
