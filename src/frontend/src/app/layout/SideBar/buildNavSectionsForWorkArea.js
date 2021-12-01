import ArtifactsIcon  from '@mui/icons-material/Article';
import SGGIcon from '@mui/icons-material/Face';
import GridViewIcon from '@mui/icons-material/GridView';
import YTDIcon from '@mui/icons-material/VerticalSplit';
import ObservationsIcon from '@mui/icons-material/Visibility';
import SelfAssessmentsIcon from '@mui/icons-material/LocalCafe';
import SummativeEvalIcon from '@mui/icons-material/Summarize';
import SettingsIcon from '@mui/icons-material/SettingsApplications';
import { EvaluationWorkAreas } from '../../core/workAreas';

const navSections = [
  {
    title: 'Evaluation',
    workAreaTags: EvaluationWorkAreas,
    items: [
      {
        title: 'Dashboard',
        icon: <GridViewIcon fontSize="small" />,
        path: '/app/evaluation/dashboards',
      },
      {
        title: 'Artifacts',
        icon: <ArtifactsIcon fontSize="small" />,
        path: '/app/evaluation/artifacts',
      },
      {
        title: 'YTD Evidence',
        icon: <YTDIcon fontSize="small" />,
        path: '/app/evaluation/ytd',
      },
      {
        title: 'Student Growth',
        icon: <SGGIcon fontSize="small" />,
        path: '/app/evaluation/sgg',
      },
      {
        title: 'Observations',
        icon: <ObservationsIcon fontSize="small" />,
        path: '/app/evaluation/observations',
      },
      {
        title: 'Self-Assessments',
        icon: <SelfAssessmentsIcon fontSize="small" />,
        path: '/app/evaluation/self-assessments',
      },
      {
        title: 'Summative Evaluation',
        icon: <SummativeEvalIcon fontSize="small" />,
        path: '/app/evaluation/summative-eval',
      },
       {
        title: 'Settings',
        icon: <SettingsIcon fontSize="small" />,
        path: '/app/evaluation/settings',
        children: [
          {
            title: 'Prompt Bank',
            path: '/app/evaluation/settings/prompt-bank',
          },
        ],
      },
      // {
      //   title: 'Setup',
      //   icon: <SettingsIcon fontSize="small" />,
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
 