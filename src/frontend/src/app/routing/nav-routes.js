
// import PrivateRoute from '../shared-components';

// import { 
//   adminRoutes_DA_PR, 
//   adminRoutes_DA_TR,
//   evaluationRoutes_PR_PR, 
//   evaluationRoutes_PR_TR 
// } from './configs';

// const NAV_ROUTES = [
//   adminRoutes_DA_PR,
//   adminRoutes_DA_TR,
//   evaluationRoutes_PR_PR,
//   evaluationRoutes_PR_TR,
// ];

// const buildNavRoutesForWorkArea = (workArea) => {

//   if (!workArea) return [];

//   return NAV_ROUTES.reduce((finalRoutes, next)=> {
//     if (next.workAreaTag === workArea.tagName) {
//       const workAreaRoutes = next.routes.map((x)=>(
//         {
//           path: x.path, 
//           element: <PrivateRoute element={x.element} workAreaTags={[next.workAreaTag]} />
//         } 
//       ));
//       finalRoutes.push(...workAreaRoutes);
//     }
//     return finalRoutes;
//   }, []);
// }

// export default buildNavRoutesForWorkArea;
