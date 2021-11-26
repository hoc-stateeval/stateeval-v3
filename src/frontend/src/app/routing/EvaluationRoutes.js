import { lazy } from 'react'
import { Route } from 'react-router-dom'

const TestPage = lazy(() => import('../features/Test'));

const EvaluationRoutes = () => {
  return (
    <>
    <Route path="/dashboard" element={<TestPage/>} />
    <Route path="/evaluation/artifacts" element={<TestPage/>}  />
    <Route path="/evaluation/ytd" element={<TestPage/>}  />
    <Route path="/evaluation/sg" element={<TestPage/>}  />
    <Route path="/evaluation/observations" element={<TestPage/>}  />
    <Route path="/evaluation/self-assessments" element={<TestPage/>}  />
    <Route path="/evaluation/summative-eval" element={<TestPage/>}  /> 
    {/* <Route path="/evaluation/setup/prompt-bank" element={<TestPage/>}  />  
    <Route path="/evaluation/setup/settings" element={<TestPage/>}  /> 
    <Route path="/evaluation/setup/assignments" element={<TestPage/>}  /> 
    <Route path="/evaluation/setup/user-groups" element={<TestPage/>}  /> 
    <Route path="/evaluation/setup/user-groups" element={<TestPage/>}  />  */}
    </>
  );
}

export default EvaluationRoutes;