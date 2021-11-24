import { Home as HomeIcon } from '../icons/home';

const navSections = [
  {
    title: 'Evaluation',
    workAreaTags: ['PR_TR', 'PR_PR', 'PR_ME', 'TR_ME', 'DTE', 'DE'],
    items: [
      {
        title: 'Dashboard',
        icon: <HomeIcon fontSize="small" />,
        path: '/dashboard',
      },
      {
        title: 'Artifacts',
        icon: <HomeIcon fontSize="small" />,
        path: '/evaluation/artifacts',
      },
      {
        title: 'YTD Evidence',
        icon: <HomeIcon fontSize="small" />,
        path: '/evaluation/ytd',
      },
      {
        title: 'Student Growth Goals',
        icon: <HomeIcon fontSize="small" />,
        path: '/evaluation/sgg',
      },
      {
        title: 'Observations',
        icon: <HomeIcon fontSize="small" />,
        path: '/evaluation/observations',
      },
      {
        title: 'Self-Assessments',
        icon: <HomeIcon fontSize="small" />,
        path: '/evaluation/self-assessments',
      },
      {
        title: 'Summative Evaluation',
        icon: <HomeIcon fontSize="small" />,
        path: '/evaluation/summative-eval',
      },
      {
        title: 'Setup',
        icon: <HomeIcon fontSize="small" />,
        path: '/evaluation/setup',
        children: [
          {
            title: 'Prompt Bank',
            path: '/evaluation/setup/prompt-bank',
          },
          {
            title: 'Settings',
            path: '/evaluation/setup/settings',
          },
          {
            title: 'Assignments',
            path: '/evaluation/setup/assignments',
          },
          {
            title: 'User Groups',
            path: '/evaluation/setup/user-groups',
          },
        ],
      },
      {
        title: 'Report Archives',
        icon: <HomeIcon fontSize="small" />,
        path: '/evaluation/report-archives',
      },
      {
        title: 'Resources',
        icon: <HomeIcon fontSize="small" />,
        path: '/evaluation/resources',
      },
    ],
  },
  {
    title: 'Training',
    workAreaTags: ['PR_TR', 'PR_PR', 'PR_ME', 'TR_ME', 'DTE', 'DE'],
    items: [
      {
        title: 'Dashboard',
        icon: <HomeIcon fontSize="small" />,
        path: '/training/dashboard',
      },
      {
        title: 'Videos',
        icon: <HomeIcon fontSize="small" />,
        children: [
          {
            title: 'BERC Videos',
            path: '/training/berc-videos',
          },
          {
            title: 'National Board Videos',
            path: '/training/national-board-videos',
          },
        ],
      },
    ],
  },
];

export const getNavSectionsForWorkArea = (workAreaTag) => {
  return navSections.filter(x=>x.workAreaTags.includes(workAreaTag));
}