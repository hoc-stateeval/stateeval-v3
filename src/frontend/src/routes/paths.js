
/*
 * Public Routes 
 */
export const unAuthenticatedPaths = {
  login: '/login',
  studentPerceptionSurvey: '/perception-surveys/student-survey/:guid'
};

/*
 * Training Routes 
 */
const trainingRoot = '/training';
const trainingVideosRoot = `${trainingRoot}/videos`;

export const trainingPaths = {
  root: `${trainingRoot}`,
  videos: `${trainingVideosRoot}`,
  bercVideos: `${trainingVideosRoot}/berc`,
  nationalBoardVideos: `${trainingVideosRoot}/national-board`,
};

/*
 * Admin Routes 
 */
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

  // da-only
  assignmentsDistrictSummary: `${assignmentsRoot}/district-summary`,
  assignmentsDistrictDetail: `${assignmentsRoot}/district-detail`,

  // district, school, and evaluator
  assignmentsSchoolDetailRoot: `${assignmentsSchoolDetailRoot}`,
  assignmentsSchoolDetail: `${assignmentsSchoolDetailRoot}/:schoolCode/:schoolName`,


  promptBankRoot: `${promptBankRoot}`,

  // da-only
  dteSetup: `${adminRoot}/dte-setup`,
  dvSetup: `${adminRoot}/dv-setup`,

  settingsRoot: `${adminSettingsRoot}`,

  // da-only
  settingsGeneral: `${adminSettingsRoot}/general`,

  settingsReports: `${adminSettingsRoot}/reports`,

  reports: `${adminRoot}/reports`,
  resources: `${adminRoot}/resources`,
};

/*
 * Evaluation Routes 
 */

const evaluationRoot = '/evaluation';
const evalDashboardsRoot = `${evaluationRoot}/dashboards`
const evalSettingsRoot = `${evaluationRoot}/settings`;
const evalPerceptionSurveysRoot =  `${evaluationRoot}/perception-surveys`
const evalObservationsRoot =  `${evaluationRoot}/observations`

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
  observationById: `${evalObservationsRoot}/:id`,
  selfAssessments: `${evaluationRoot}/self-assessments`,
  midYearEvaluation:  `${evaluationRoot}/mid-year-eval`,
  summativeEvaluation: `${evaluationRoot}/summative-eval`,
  reportArchives: `${evaluationRoot}/report-archives`,
  resources:  `${evaluationRoot}/resources`,
  trMePerceptionSurveys: evalPerceptionSurveysRoot,
  trMePerceptionSurveyById: `${evalPerceptionSurveysRoot}/:id`,

  settingsRoot: `${evalSettingsRoot}`,
  settingsGeneral: `${evalSettingsRoot}/general`,
  settingsAssignments: `${evalSettingsRoot}/assignments`,
  settingsPromptBank: `${evalSettingsRoot}/prompt-bank`,
};

/*
 * District Viewer Routes 
 */

const dvRoot = '/district-viewer';
const dvDashboardsRoot = `${dvRoot}/dashboards`

export const districtViewerPaths = {
  prTrDashboard: `${dvDashboardsRoot}/pr-tr`,
  prPrDashboard: `${dvDashboardsRoot}/pr-pr`,
  dteDashboard: `${dvDashboardsRoot}/dte`,
  deDashboard: `${dvDashboardsRoot}/de`,
  ctDashboard: `${dvDashboardsRoot}/ct`
};
