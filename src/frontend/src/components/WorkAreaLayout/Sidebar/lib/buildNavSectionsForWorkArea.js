import ArtifactsIcon  from '@mui/icons-material/Article';
import SGGIcon from '@mui/icons-material/Face';
import GridViewIcon from '@mui/icons-material/GridView';
import YTDIcon from '@mui/icons-material/VerticalSplit';
import ObservationsIcon from '@mui/icons-material/Visibility';
import SelfAssessmentsIcon from '@mui/icons-material/LocalCafe';
import SummativeEvalIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/SettingsApplications';

import { WorkArea } from '@lib/enums';
import { adminPaths, evaluationPaths, districtViewerPaths } from '@routes/paths';

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
  }
};

const navSections = [
  {
    workAreaTag: WorkArea.DV_PR_PR,
    title: 'View Evaluator - Head Principal',
    items: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: districtViewerPaths.prPr,
      }
    ]
  },
  {
    workAreaTag: WorkArea.DV_PR_TR,
    title: 'View Evaluator - Principal',
    items: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: districtViewerPaths.prTr
      }
    ]
  },
  {
    workAreaTag: WorkArea.DV_DTE,
    title: 'View Evaluator - DTE',
    items: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: districtViewerPaths.dte,
      },
    ]
  },
  {
    workAreaTag: WorkArea.DV_DE,
    title: 'View Evaluator - DE',
    items: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: districtViewerPaths.de,
      },
    ]
  },
  {
    workAreaTag: WorkArea.DV_CT,
    title: 'View Evaluator - Consulting Teacher',
    items: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: districtViewerPaths.ct,
      }
    ]
  },
  {
    workAreaTag: WorkArea.PR_PR,
    title: 'Evaluation',
    items: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: evaluationPaths.prPrDashboard,
      },
      evaluationSharedNavItems.artifacts,
      evaluationSharedNavItems.ytdEvidence,
      evaluationSharedNavItems.studentGrowth,
      evaluationSharedNavItems.observations,
      evaluationSharedNavItems.selfAssessments,
      evaluationSharedNavItems.summativeEvaluation,
      {
        title: 'Settings',
        icon: <SettingsIcon fontSize="small" />,
        path: '@ui/routing/evaluation/settings',
        children: [
          evaluationSharedNavItems.settingsGeneral,
         
        ],
      },
    ],
  },
  {
    workAreaTag: WorkArea.PR_TR,
    title: 'Evaluation',
    items: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: evaluationPaths.prTrDashboard,
      },
      evaluationSharedNavItems.artifacts,
      evaluationSharedNavItems.ytdEvidence,
      evaluationSharedNavItems.studentGrowth,
      evaluationSharedNavItems.observations,
      evaluationSharedNavItems.selfAssessments,
      evaluationSharedNavItems.summativeEvaluation,
      {
        title: 'Settings',
        icon: <SettingsIcon fontSize="small" />,
        path: '@ui/routing/evaluation/settings',
        children: [
          evaluationSharedNavItems.settingsGeneral,
         
        ],
      },
    ],
  },
  {
    workAreaTag: WorkArea.DA_PR,
    title: 'Evaluation Setup',
    items: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: adminPaths.daPrDashboard,
      },
      {
        title: 'Assignments',
        icon: <ArtifactsIcon fontSize="small" />,
        path: adminPaths.assignmentsDistrictSummary,
      },
      {
        title: 'DTE Setup',
        icon: <ArtifactsIcon fontSize="small" />,
        path: adminPaths.dteSetup,
      }
    ]
  },
  {
    workAreaTag: WorkArea.DA_TR,
    title: 'Evaluation Setup',
    items: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: adminPaths.daTrDashboard,
      },
      {
        title: 'Assignments',
        icon: <ArtifactsIcon fontSize="small" />,
        path: adminPaths.assignmentsDistrictSummary,
      },
      {
        title: 'DTE Setup',
        icon: <ArtifactsIcon fontSize="small" />,
        path: adminPaths.dteSetup,
      }
    ]
  },
  {
    title: 'Evaluation Setup',
    workAreaTags: WorkArea.DA_PR,
    items: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: '@ui/routing/admin/dashboards/da-pr',
      },
      {
        title: 'Assignments',
        icon: <ArtifactsIcon fontSize="small" />,
        path: '@ui/routing/admin/assignments/district-detail',
      },
    ]
  },
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
];
 

export const buildNavSectionsForWorkArea = (workAreaTag) => {
  return navSections.filter(x=>x.workAreaTag === workAreaTag);
}

export default buildNavSectionsForWorkArea;
 