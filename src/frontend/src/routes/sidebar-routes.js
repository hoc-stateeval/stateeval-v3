import { WorkArea } from '@lib/enums';
import { adminPaths, evaluationPaths, districtViewerPaths } from '@routes/paths';

import ArtifactsIcon  from '@mui/icons-material/Article';
import SGGIcon from '@mui/icons-material/Face';
import GridViewIcon from '@mui/icons-material/GridView';
import YTDIcon from '@mui/icons-material/VerticalSplit';
import ObservationsIcon from '@mui/icons-material/Visibility';
import SelfAssessmentsIcon from '@mui/icons-material/LocalCafe';
import SummativeEvalIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/SettingsApplications';

const evaluationSharedNavItems = {
  artifacts: {
    title: 'Artifacts',
    icon: <ArtifactsIcon fontSize="small" />,
    path: evaluationPaths.artifacts,
  },
  ytdEvidence: {
    title: 'YTD Evidence',
    icon: <YTDIcon fontSize="small" />,
    path: evaluationPaths.ytdEvidence,
  },
  studentGrowth: {
    title: 'Student Growth',
    icon: <SGGIcon fontSize="small" />,
    path: evaluationPaths.studentGrowth,
  },
  observations: {
    title: 'Observations',
    icon: <ObservationsIcon fontSize="small" />,
    path: evaluationPaths.observations,
  },
  selfAssessments: {
    title: 'Self-Assessments',
    icon: <SelfAssessmentsIcon fontSize="small" />,
    path: evaluationPaths.selfAssessments,
  },
  midYearEvaluation: {
    title: 'Mid-year Evaluation',
    icon: <SummativeEvalIcon fontSize="small" />,
    path: evaluationPaths.midYearEvaluation,
  },
  summativeEvaluation: {
    title: 'Summative Evaluation',
    icon: <SummativeEvalIcon fontSize="small" />,
    path: evaluationPaths.summativeEvaluation,
  },
  settingsGeneral : {
    title: 'General',
    path: evaluationPaths.settingsGeneral,
  },
  settingsPromptBank: {
    title: 'Prompt Bank',
    path: evaluationPaths.settingsPromptBank,
  },
  resources: {
    title: 'Resources',
    icon: <SummativeEvalIcon fontSize="small" />,
    path: evaluationPaths.resources,
  },
};

const evaluationCoreNavItems = [
  evaluationSharedNavItems.artifacts,
  evaluationSharedNavItems.ytdEvidence,
  evaluationSharedNavItems.studentGrowth,
  evaluationSharedNavItems.observations,
  evaluationSharedNavItems.selfAssessments,
  evaluationSharedNavItems.midYearEvaluation,
  evaluationSharedNavItems.summativeEvaluation,
  evaluationSharedNavItems.resources
];

/*
 * Evaluation Routes 
 */
const routes_PR_ME = {
  workAreaTag: WorkArea.PR_ME,
  sections: [
    {
      title: 'Evaluation',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: evaluationPaths.prMeDashboard,
        },
        ...evaluationCoreNavItems,
      ],
    }
  ]
}

const routes_TR_ME = {
  workAreaTag: WorkArea.TR_ME,
  sections: [
    {
      title: 'Evaluation',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: evaluationPaths.trMeDashboard,
        },
        ...evaluationCoreNavItems,
      ],
    }
  ]
}

const routes_PR_PR = {
  workAreaTag: WorkArea.PR_PR,
  sections: [
    {
      title: 'Evaluation',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: evaluationPaths.prPrDashboard,
        },
        ...evaluationCoreNavItems,
        {
          title: 'Settings',
          icon: <SettingsIcon fontSize="small" />,
          path: evaluationPaths.settingsRoot,
          children: [
            {
              title: 'Assignments',
              path: adminPaths.assignmentsSchoolDetailRoot,
            }
           
          ],
        },
      ],
    }
  ]
}
const routes_PR_TR = {
  workAreaTag: WorkArea.PR_TR,
  sections: [
    {
      title: 'Evaluation',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: evaluationPaths.prTrDashboard,
        },
        ...evaluationCoreNavItems,
        {
          title: 'Settings',
          icon: <SettingsIcon fontSize="small" />,
          path: evaluationPaths.settingsRoot,
          children: [
            {
              title: 'Assignments',
              path: adminPaths.assignmentsSchoolDetailRoot,
            }
          
          ],
        },
      ],
    }
  ]
};

const routes_DE = {
  workAreaTag: WorkArea.DE,
  sections: [
    {
      title: 'Evaluation',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: evaluationPaths.deDashboard,
        },
        ...evaluationCoreNavItems,
        {
          title: 'Settings',
          icon: <SettingsIcon fontSize="small" />,
          path: evaluationPaths.settingsRoot,
          children: [
            // {
            //   title: 'Prompt Bank',
            //   path: adminPaths,
            // },
            // {
            //   title: 'General Settings',
            //   path: adminPaths,
            // },
            // {
            //   title: 'Assignments',
            //   path: adminPaths,
            // }
           
          ],
        },
      ],
    }
  ]
}

const routes_DTE = {
  workAreaTag: WorkArea.DTE,
  sections: [
    {
      title: 'Evaluation',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: evaluationPaths.dteDashboard,
        },
        ...evaluationCoreNavItems,
        {
          title: 'Settings',
          icon: <SettingsIcon fontSize="small" />,
          path: evaluationPaths.settingsRoot,
          children: [
            // {
            //   title: 'Prompt Bank',
            //   path: adminPaths,
            // },
            // {
            //   title: 'General Settings',
            //   path: adminPaths,
            // },
            // {
            //   title: 'Assignment Requests',
            //   path: adminPaths,
            // }
           
          ],
        },
      ],
    }
  ]
}

const routes_CT = {
  workAreaTag: WorkArea.CT,
  sections: [
    {
      title: 'Evaluation',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: evaluationPaths.ctDashboard,
        },
        evaluationSharedNavItems.artifacts,
        evaluationSharedNavItems.ytdEvidence,
        evaluationSharedNavItems.observations,
        {
          title: 'Mid-Year',
          icon: <GridViewIcon fontSize="small" />,
          path: evaluationPaths.midYearEvaluation,
        },
        evaluationSharedNavItems.summativeEvaluation,
        {
          title: 'Settings',
          icon: <SettingsIcon fontSize="small" />,
          path: evaluationPaths.settingsRoot,
          children: [
            // {
            //   title: 'Prompt Bank',
            //   path: adminPaths,
            // },
            // {
            //   title: 'General Settings',
            //   path: adminPaths,
            // },
            // {
            //   title: 'Assignment Requests',
            //   path: adminPaths,
            // }
           
          ],
        },
      ],
    }
  ]
}

/*
 * Admin Routes 
 */

const adminRoutePromptBank = {
    title: 'Prompt Bank',
    icon: <ArtifactsIcon fontSize="small" />,
    path: adminPaths.promptBankRoot,
};

const adminRouteReports = {
  title: 'Reports',
  icon: <ArtifactsIcon fontSize="small" />,
  path: adminPaths.reports,
};

const adminRouteResources = {
  title: 'Resources',
  icon: <ArtifactsIcon fontSize="small" />,
  path: adminPaths.resources,
};

const adminRouteSettings = {
  title: 'Settings',
  icon: <ArtifactsIcon fontSize="small" />,
  path: adminPaths.settingsRoot,
  children: [
    {
      title: 'General',
      path: adminPaths.settingsGeneral,
    },
    {
      title: 'Observation Report',
      path: adminPaths.settingsObservationReport,
    },
    {
      title: 'Self-Assessment Report',
      path: adminPaths.settingsSelfAssessmentReport,
    },
    {
      title: 'Mid-Year Report',
      path: adminPaths.settingsMidYearReport,
    },
    {
      title: 'Summative Report',
      path: adminPaths.settingsSummativeReport,
    }
  ],
};

const routes_DA_PR = {
  workAreaTag: WorkArea.DA_PR,
  sections: [
    {
      title: 'Evaluation Setup',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: adminPaths.daPrDashboard,
        },
        adminRoutePromptBank,
        {
          title: 'Assignments',
          icon: <ArtifactsIcon fontSize="small" />,
          path: adminPaths.assignmentsDistrictDetail,
        },
        adminRouteSettings,
        adminRouteReports,
        adminRouteResources,
      ]
    }
  ]
};

const routes_DA_TR = {
  workAreaTag: WorkArea.DA_TR,
  sections: [
    {
      title: 'Evaluation Setup',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: adminPaths.daTrDashboard,
        },
        adminRoutePromptBank,
        {
          title: 'Assignments',
          icon: <ArtifactsIcon fontSize="small" />,
          path: adminPaths.assignmentsDistrictSummary,
        },
        {
          title: 'DTE Setup',
          icon: <ArtifactsIcon fontSize="small" />,
          path: adminPaths.dteSetup,
        },
        {
          title: 'District Viewer Setup',
          icon: <ArtifactsIcon fontSize="small" />,
          path: adminPaths.dvSetup,
        },
        adminRouteSettings,
        adminRouteReports,
        adminRouteResources,
      ]
    }
  ]
};

/*
 * District Viewer Routes 
 */

const routes_DV_PR_PR = {
  workAreaTag: WorkArea.DV_PR_PR,
  sections: [
    {
      title: 'View Evaluator - Head Principal',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: districtViewerPaths.prPr,
        }
      ]
    }
  ]
};

const routes_DV_PR_TR = {
  workAreaTag: WorkArea.DV_PR_TR,
  sections: [
    {
      title: 'View Evaluator - Principal',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: districtViewerPaths.prTr
        }
      ]
    }
  ]
};

const routes_DV_DTE = {
  workAreaTag: WorkArea.DV_DTE,
  sections: [
    {
      title: 'View Evaluator - DTE',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: districtViewerPaths.dte,
        },
      ]
    }
  ]
};

const routes_DV_DE = {
  workAreaTag: WorkArea.DV_DE,
  sections: [
    {
      title: 'View Evaluator - DE',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: districtViewerPaths.de,
        },
      ]
    }
  ]
};


const routes_DV_CT = {
  workAreaTag: WorkArea.DV_CT,
  sections: [
    {
      title: 'View Evaluator - Consulting Teacher',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: districtViewerPaths.ct,
        },
      ]
    }
  ]
};

  // {
  //   title: 'Training',
  //   workAreaTags: ['PR_TR', 'PR_PR', 'PR_ME', 'TR_ME', 'DTE', 'DE'],
  //   items: [
  //     {
  //       title: 'Dashboard',
  //       icon: <HomeIcon fontSize="small" />,
  //       path: '/training/dashboard',
  //     },
  //     {
  //       title: 'Videos',
  //       icon: <HomeIcon fontSize="small" />,
  //       children: [
  //         {
  //           title: 'BERC Videos',
  //           path: '/training/berc-videos',
  //         },
  //         {
  //           title: 'National Board Videos',
  //           path: '/training/national-board-videos',
  //         },
  //       ],
  //     },
  //   ],
  // },
 
const SIDEBAR_ROUTES = [
    routes_DA_PR,
    routes_DA_TR,
    routes_PR_PR,
    routes_PR_TR,
    routes_DV_CT,
    routes_DV_DE,
    routes_DV_DTE,
    routes_DV_PR_PR,
    routes_DV_PR_TR,
    routes_PR_ME,
    routes_TR_ME,
    routes_DTE,
    routes_DE
];

export {
  SIDEBAR_ROUTES
}