import HomeIcon  from '@mui/icons-material/Home';
import { EvaluationWorkAreas } from '../../core/workAreas';

const navSections = [
  {
    title: 'Evaluation',
    workAreaTags: EvaluationWorkAreas,
    items: [
      {
        title: 'Dashboard',
        icon: <HomeIcon fontSize="small" />,
        path: '/app/dashboard',
      },
      {
        title: 'Artifacts',
        icon: <HomeIcon fontSize="small" />,
        path: '/app/evaluation/artifacts',
      },
      {
        title: 'TR_ME only',
        icon: <HomeIcon fontSize="small" />,
        path: '/app/evaluation/tr_me',
        workAreaTags: ['TR_ME'],
      },
      {
        title: 'PR_TR only',
        icon: <HomeIcon fontSize="small" />,
        path: '/app/evaluation/pr_tr',
        workAreaTags: ['PR_TR'],
      },
      // {
      //   title: 'YTD Evidence',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/ytd',
      // },
      // {
      //   title: 'Student Growth',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/sg',
      // },
      // {
      //   title: 'Observations',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/observations',
      // },
      // {
      //   title: 'Self-Assessments',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/self-assessments',
      // },
      // {
      //   title: 'Summative Evaluation',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/summative-eval',
      // },
      // {
      //   title: 'Setup',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/setup',
      //   children: [
      //     {
      //       title: 'Prompt Bank',
      //       path: '/evaluation/setup/prompt-bank',
      //     },
      //     {
      //       title: 'Settings',
      //       path: '/evaluation/setup/settings',
      //     },
      //     {
      //       title: 'Assignments',
      //       path: '/evaluation/setup/assignments',
      //     },
      //     {
      //       title: 'User Groups',
      //       path: '/evaluation/setup/user-groups',
      //     },
      //   ],
      // },
      // {
      //   title: 'Report Archives',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/report-archives',
      // },
      // {
      //   title: 'Resources',
      //   icon: <HomeIcon fontSize="small" />,
      //   path: '/evaluation/resources',
      // },
    ],
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

  const result = navSections.reduce( (acc, nextSection) => {
    if (nextSection.workAreaTags.includes(workAreaTag)) {
      let section = {...nextSection};
      section.items = section.items.filter(x=>(!x.workAreaTags?x:x.workAreaTags.includes(workAreaTag)));
      acc.push(section);
    }
    return acc;
  }, []);

  return result;
}
 
export default buildNavSectionsForWorkArea;
 