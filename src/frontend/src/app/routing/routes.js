const DASHBOARD_ROUTES = {
  DA_PR_DASHBOARD: '/app/dashboards/da-pr',
  DA_TR_DASHBOARD: '/app/dashboards/da-tr',
}
const ROUTES = {
  ...DASHBOARD_ROUTES,
  DA_TR_DTE_SETUP: '/app/admin/assignments/dte-setup',
  ASSIGNMENTS_DISTRICT_SUMMARY: '/app/admin/assignments/district-summary',
  ASSIGNMENTS_DISTRICT_DETAIL: '/app/admin/assignments/district-detail',
  ASSIGNMENTS_SCHOOL_DETAIL: '/app/admin/assignments/school-detail/:schoolCode/:schoolName',

};

export {
  ROUTES,
}