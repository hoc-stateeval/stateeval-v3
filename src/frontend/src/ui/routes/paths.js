
export const unAuthenticatedPaths = {
  login: '/login'
};

export const adminPaths = {
  daPrDashboard: '/admin/dashboards/da-pr',
  daTrDashboard: '/admin/dashboards/da-tr',
  dteSetup: '/admin/assignments/dte-setup',
  assignmentsDistrictSummary: '/admin/assignments/district-summary',
  assignmentsDistrictDetail: '/admin/assignments/district-detail',
  assignmentsSchoolDetail: '/admin/assignments/school-detail/:schoolCode/:schoolName',
};

export const evaluationPaths = {
  prTrDashboard: '/evaluation/dashboards/pr-tr',
  prPrDashboard: '/evaluation/dashboards/pr-pr',
  artifacts: '/evaluation/artifacts',
  ytdEvidence: '/evaluation/ytd',
  studentGrowth: '/evaluation/sgg',
  observations: '/evaluation/observations',
  selfAssessments: '/evaluation/self-assessments',
  summativeEvaluation: '/evaluation/summative-eval',
  settingsGeneral: '/evaluation/settings/general',
  settingsAssignments: '/evaluation/settings/assignments',
  settingsPromptBank: '/evaluation/settings/prompt-bank',
};

export const districtViewerPaths = {
  prTrDashboard: 'district-viewer/dashboards/pr-tr',
  prPrDashboard: 'district-viewer/dashboards/pr-pr',
  dteDashboard: 'district-viewer/dashboards/dte',
  deDashboard: 'district-viewer/dashboards/de',
  ctDashboard: 'district-viewer/dashboards/ct'
};
