import { WorkArea } from '@lib/enums';
import { adminPaths, evaluationPaths, districtViewerPaths, trainingPaths } from '@routes/paths';

import ArtifactsIcon  from '@mui/icons-material/Article';
import SGGIcon from '@mui/icons-material/Face';
import GridViewIcon from '@mui/icons-material/GridView';
import YTDIcon from '@mui/icons-material/VerticalSplit';
import ObservationsIcon from '@mui/icons-material/Visibility';
import SelfAssessmentsIcon from '@mui/icons-material/LocalCafe';
import SummativeEvalIcon from '@mui/icons-material/Summarize';
import ReportArchivesIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/SettingsApplications';

const trainingSection = {
    title: 'Training',
    items: [
      {
        title: 'Dashboard',
        icon: <ArtifactsIcon fontSize="small" />,
        path: trainingPaths.root,
      },
      {
        title: 'Videos',
        icon: <SettingsIcon fontSize="small" />,
        path: trainingPaths.videos,
        children: [
          {
            title: 'BERC Videos',
            path: trainingPaths.bercVideos,
          },
          {
            title: 'National Board Videos',
            path: trainingPaths.nationalBoardVideos,
          },   
        ],
      },
    ],
  };

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
  reportArchives: {
    title: 'Report Archives',
    icon: <ReportArchivesIcon fontSize="small" />,
    path: evaluationPaths.reportArchives,
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
  evaluationSharedNavItems.resources,
  evaluationSharedNavItems.reportArchives
];

const nestedPromptBankNavItem = {
  title: 'Prompt Bank',
  path: adminPaths.promptBankRoot,
};

const nestedAssignmentsDistrictDetailNavItem = {
  title: 'Assignments',
  path: adminPaths.assignmentsDistrictDetail,
};

const nestedAssignmentsSchoolDetailNavItem = {
  title: 'Assignments',
  icon: <GridViewIcon fontSize="small" />,
  path: adminPaths.assignmentsSchoolDetailRoot,
};

const nestedReportSettingsNavItem = {
  title: 'Report Settings',
  path: adminPaths.settingsReports,
};

/*
 * Evaluation Routes - Evaluatees
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
    },
    trainingSection,
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
    },
    trainingSection,
  ]
}

/*
 * Evaluation Routes - Evaluators
 */
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
            nestedPromptBankNavItem,
            nestedAssignmentsSchoolDetailNavItem,
            nestedReportSettingsNavItem
          ],
        },
      ],
    },
    trainingSection
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
          title: 'Admin',
          icon: <SettingsIcon fontSize="small" />,
          path: evaluationPaths.settingsRoot,
          children: [
            nestedPromptBankNavItem,
            nestedAssignmentsSchoolDetailNavItem,
            nestedReportSettingsNavItem
          ],
        },
      ],
    },
    trainingSection,
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
          title: 'Admin',
          icon: <SettingsIcon fontSize="small" />,
          path: evaluationPaths.settingsRoot,
          children: [
            nestedPromptBankNavItem,
            nestedAssignmentsDistrictDetailNavItem,
            nestedReportSettingsNavItem
          ],
        },
      ],
    },
    trainingSection,
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
            nestedPromptBankNavItem,
            nestedAssignmentsDistrictDetailNavItem,
            nestedReportSettingsNavItem
          ],
        },
      ],
    },
    trainingSection,
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
      ],
    },
    trainingSection,
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

const adminRouteDvSetup = {
  title: 'District Viewer Setup',
  icon: <ArtifactsIcon fontSize="small" />,
  path: adminPaths.dvSetup,
};

const adminRouteDteSetup = {
  title: 'DTE Setup',
  icon: <ArtifactsIcon fontSize="small" />,
  path: adminPaths.dteSetup,
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
      title: 'Report Settings',
      path: adminPaths.settingsReports,
    },
  ],
};

const schoolAdminReportSettings = {
  title: 'Report Settings',
  icon: <ArtifactsIcon fontSize="small" />,
  path: adminPaths.settingsReports,
}

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
        adminRouteDvSetup,
        adminRouteSettings,
        adminRouteReports,
        adminRouteResources,
      ]
    },
    trainingSection,
  ]
};

const routes_DAM_PR = {
  workAreaTag: WorkArea.DAM_PR,
  sections: [
    {
      title: 'Evaluation Setup',
      items: [
        {
          title: 'Assignments',
          icon: <ArtifactsIcon fontSize="small" />,
          path: adminPaths.assignmentsDistrictDetail,
        },
        adminRouteDvSetup,
      ]
    },
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
        adminRouteDteSetup,
        adminRouteDvSetup,
        adminRouteSettings,
        adminRouteReports,
        adminRouteResources,
      ]
    },
    trainingSection,
  ]
};

const routes_DAM_TR = {
  workAreaTag: WorkArea.DAM_TR,
  sections: [
    {
      title: 'Evaluation Setup',
      items: [
        {
          title: 'Assignments',
          icon: <ArtifactsIcon fontSize="small" />,
          path: adminPaths.assignmentsDistrictSummary,
        },
        adminRouteDteSetup,
        adminRouteDvSetup,
      ]
    },
  ]
};

const routes_SA_PR = {
  workAreaTag: WorkArea.SA_PR,
  sections: [
    {
      title: 'Evaluation Setup',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: adminPaths.saPrDashboard,
        },
        adminRoutePromptBank,
        {
          title: 'Assignments',
          icon: <ArtifactsIcon fontSize="small" />,
          path: adminPaths.assignmentsSchoolDetailRoot,
        },
        schoolAdminReportSettings,
        adminRouteReports,
      
        adminRouteResources,
      ]
    },
    trainingSection,
  ]
};

const routes_SA_TR = {
  workAreaTag: WorkArea.SA_TR,
  sections: [
    {
      title: 'Evaluation Setup',
      items: [
        {
          title: 'Dashboard',
          icon: <GridViewIcon fontSize="small" />,
          path: adminPaths.saTrDashboard,
        },
        adminRoutePromptBank,
        {
          title: 'Assignments',
          icon: <ArtifactsIcon fontSize="small" />,
          path: adminPaths.assignmentsSchoolDetailRoot,
        },
        schoolAdminReportSettings,
        adminRouteReports,
        adminRouteResources,
      ]
    },
    trainingSection,
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
          path: districtViewerPaths.prPrDashboard,
        }
      ]
    },
    trainingSection,
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
          path: districtViewerPaths.prTrDashboard
        }
      ]
    },
    trainingSection,
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
          path: districtViewerPaths.dteDashboard,
        },
      ]
    },
    trainingSection,
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
          path: districtViewerPaths.deDashboard,
        },
      ]
    },
    trainingSection,
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
          path: districtViewerPaths.ctDashboard,
        },
      ]
    },
    trainingSection,
  ]
};

const SIDEBAR_ROUTES = [
    // admin - district
    routes_DA_PR,
    routes_DA_TR,

    // district assignment manager
    routes_DAM_PR,
    routes_DAM_TR,

    // admin - school
    routes_SA_PR,
    routes_SA_TR,

    // evaluation - evaluator
    routes_PR_PR,
    routes_PR_TR,
    routes_DTE,
    routes_DE,
    routes_CT,

    // evaluation - evaluatee
    routes_PR_ME,
    routes_TR_ME,

    // district viewer
    routes_DV_CT,
    routes_DV_DE,
    routes_DV_DTE,
    routes_DV_PR_PR,
    routes_DV_PR_TR,
];

export {
  SIDEBAR_ROUTES
}