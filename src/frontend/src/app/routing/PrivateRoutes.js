
import { Routes, Route, Redirect } from 'react-router-dom'
import Layout from '../layout/Layout';
import { isEvaluationWorkArea } from '../core/workAreas';
import EvaluationRoutes from './EvaluationRoutes';
import Test from '../features/Test';


const PrivateRoutes = () => {
  // TODO: review metronic Routes.tsx
  // add suspense withfallback
  // {isEvaluationWorkArea(workArea)  && <EvaluationRoutes/>}

  const workArea = 'PR_TR';

  return (
    <Layout>
      <Test/>
      {/* <Routes>
        <Route path="/dashboard" element={<Test/>} />
        <Route exact path="/">
          <Test />
        </Route>
      </Routes> */}
    </Layout>
  )
}
 
 export default PrivateRoutes;
 