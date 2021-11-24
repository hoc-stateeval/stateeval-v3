import authRoles from 'app/auth/authRoles';

const EvaluationNavigation = [
  {
    id: 'evaluation',
    title: 'Evaluation',
    type: 'group',
    icon: 'apps',
    auth: authRoles.EVALUATION,
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/dashboard',
        auth: authRoles.EVALUATION,
      },
      {
        id: 'artifacts',
        title: 'Artifacts',
        type: 'item',
        icon: 'today',
        url: '/evaluation/artifacts',
        auth: authRoles.EVALUATION,
      },
      {
        id: 'ytd-evidence',
        title: 'YTD Evidence',
        type: 'item',
        icon: 'today',
        url: '/evaluation/ytd',
        auth: authRoles.EVALUATION,
      },
      {
        id: 'student-growth-goals',
        title: 'Student Growth Goals',
        type: 'item',
        icon: 'today',
        url: '/evaluation/sgg',
        auth: authRoles.EVALUATION,
      },
      {
        id: 'observations',
        title: 'Observations',
        type: 'item',
        icon: 'today',
        url: '/evaluation/observations',
        auth: authRoles.EVALUATION,
      },
      {
        id: 'self-assessments',
        title: 'Self-Assessments',
        type: 'item',
        icon: 'today',
        url: '/evaluation/self-assessments',
        auth: authRoles.EVALUATION,
      },
      {
        id: 'summative-eval',
        title: 'Summative Evaluation',
        type: 'item',
        icon: 'today',
        url: '/evaluation/summative-eval',
        auth: authRoles.EVALUATION,
      },
      {
        id: 'setup',
        title: 'Setup',
        type: 'collapse',
        icon: 'settings',
        url: '/evaluation/setup',
        auth: authRoles.EVALUATION,
        children: [
          {
            id: 'prompt-bank',
            title: 'Prompt Bank',
            type: 'item',
            icon: 'today',
            url: '/evaluation/setup/prompt-bank',
            auth: authRoles.EVALUATION,
          },
          {
            id: 'settings',
            title: 'Settings',
            type: 'item',
            icon: 'today',
            url: '/evaluation/setup/settings',
            auth: authRoles.EVALUATION,
          },
          {
            id: 'assignments',
            title: 'Assignments',
            type: 'item',
            icon: 'today',
            url: '/evaluation/setup/assignments',
            auth: authRoles.EVALUATION,
          },
          {
            id: 'user-groups',
            title: 'User Groups',
            type: 'item',
            icon: 'today',
            url: '/evaluation/setup/user-groups',
            auth: authRoles.EVALUATION,
          },
        ],
      },
      {
        id: 'report-archives',
        title: 'Report Archives',
        type: 'item',
        icon: 'today',
        url: '/evaluation/report-archives',
        auth: authRoles.EVALUATION,
      },
      {
        id: 'resources',
        title: 'Resources',
        type: 'item',
        icon: 'today',
        url: '/evaluation/resources',
        auth: authRoles.EVALUATION,
      },
    ],
  },
  {
    id: 'training',
    title: 'Training',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'training-dashboard',
        title: 'Dashboard',
        type: 'item',
        icon: 'dashboard',
        url: '/training/dashboard',
      },
      {
        id: 'training-videos',
        title: 'Videos',
        type: 'collapse',
        icon: 'today',
        children: [
          {
            id: 'training-berc-videos',
            title: 'BERC Videos',
            type: 'item',
            icon: 'today',
            url: '/training/berc-videos',
          },
          {
            id: 'training-national-board-videos',
            title: 'National Board Videos',
            type: 'item',
            icon: 'today',
            url: '/training/national-board-videos',
          },
        ],
      },
    ],
  },
];

export default EvaluationNavigation;
