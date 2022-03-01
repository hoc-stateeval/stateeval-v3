import { createApi } from '@reduxjs/toolkit/query/react'
import { config } from '../config';
import { executeRequest } from '@lib/api';

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async (request) => {
    return executeRequest(request)
  }

const baseUrl = `${config.API_URL}/`;

const convertToRubricRowIdMap = (response) => {
  const map = response.reduce((acc,next)=> {
    const rubricRowId = next.rubricRowId;
    if (!acc[rubricRowId]) acc[rubricRowId] = [];
    acc[rubricRowId].push(next);
    return acc;
  }, {});
  return map;
}
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: baseUrl }),
  keepUnusedDataFor: 0,
  tagTypes: ['EvidenceItem', 'EvidencePackage'],
  endpoints: builder => ({

    // evidence collections
    getEvidenceItemsForCollection: builder.query({
    query: (data) =>({url: `evidence-items/${data.evaluationId}/${data.collectionType}/${data.collectionObjectId}`, method: 'get'}),
      transformResponse: (response) => {
        return convertToRubricRowIdMap(response);
      },
      providesTags: ['EvidenceItem'],
    }),
    getEvidencePackagesForCollection: builder.query({
      query: (data) =>({url: `evidence-packages/${data.evaluationId}/${data.collectionType}/${data.collectionObjectId}`, method: 'get'}),
      transformResponse: (response) => {
        return convertToRubricRowIdMap(response);
      },
      providesTags: ['EvidencePackage'],
    }),
    createOtherEvidenceItem: builder.mutation({
      query: (data) => ({ url: `evidence-items/${data.evaluationId}/${data.collectionType}/${data.collectionObjectId}`, method: 'post', data: data }),
      invalidatesTags: ['EvidenceItem'],
    }),
    createEvidencePackage: builder.mutation({
      query: (data) => ({ url: `evidence-packages/${data.evaluationId}/${data.collectionType}/${data.collectionObjectId}`, method: 'post', data: data }),
      invalidatesTags: ['EvidencePackage'],
    }),

    // work area contexts
    getWorkAreaContextsForUser: builder.query({
      query: (userId) =>({url: `workarea-contexts/user/${userId}`, method: 'get'}),
    }),

    // frameworks
    getFrameworkById: builder.query({
      query: (id) => ({ url: `frameworks/${id}`, method: 'get' }),
      transformResponse: (response) => {
        const rubricRowMap = response.frameworkNodes.reduce((acc, node) => {
          for (const rubricRow of node.rubricRows) {
            acc[rubricRow.id] = rubricRow;
          }
          return acc;
        }, {});

        const frameworkNodeMap = response.frameworkNodes.reduce((acc, node) => {
          acc[node.id] = node;
          return acc;
        }, {});

        response.rubricRowMap = rubricRowMap;
        response.frameworkNodeMap = frameworkNodeMap;
        return response;
      },
    }),
    
    // perception surveys
    getPerceptionSurveysForEvaluation: builder.query({
      query: (evaluationId) => ({ url: `perception-surveys/evaluation/${evaluationId}`, method: 'get' }),
    }),

    getPerceptionSurveyById: builder.query({
      query: (data) => ({ url: `perception-surveys/${data.id}}`, method: 'get' }),
    }),

    createPerceptionSurvey: builder.mutation({
      query: (data) => ({ url: `perception-surveys/evaluation/${data.evaluationId}`, method: 'post', data: data }),
    }),

    // evaluations
    getEvaluationById: builder.query({
      query: (evaluationId) => ({url: `evaluations/${evaluationId}`, method: 'get'})
    }),
    updateEvaluationSetEvaluator: builder.mutation({
      query: (data) => ({url: `evaluations/${data.id}/update-evaluator`, method: 'put', data: data}) 
    }),
    updateEvaluationSetPlanType: builder.mutation({
      query: (data) => ({url: `evaluations/${data.evaluationId}/update-plantype`, method: 'get'})
    }),
    getHistoricalEvaluations: builder.query({
      query: (evaluateeId) => ({url: `evaluations/historical/${evaluateeId}`, method: 'get'}) 
    }),
    getEvaluationsForWorkAreaContext: builder.query({
      query: (workAreaContextId) => ({url: `evaluations/work-area-context/${workAreaContextId}`, method: 'get'}) 
    }),
    getEvaluationsForDistrictViewer: builder.query({
      query: (data) => ({url: `evaluations/${data.frameworkContextId}/${data.evaluatorId}/${data.schoolCode}`, method: 'get'})
    }),

    // buildings
    getSchoolsInDistrict: builder.query({
      query: (districtCode) => ({ url: `buildings/${districtCode}/schools/`, method: 'get' }),
    }),

    // users
    loginUser: builder.mutation({
      query: (data) => ({ url: `users/authenticate`, method: 'post', data: data }),
    }),
    getUsersInRoleAtDistrict: builder.query({
      query: (data) => ({url:`users/district/${data.districtCode}/users-in-role/${data.roleType}`, method: 'get' })
    }),
    getUsersInRoleAtSchool: builder.query({
      query: (data) => ({url: `users/school/${data.schoolCode}/users-in-role/${data.roleType}`, method: 'get'})
    }),
    getUsersInRoleAtSchools: builder.query({
      query: (data) => ({url: `users/${data.districtCode}/users-in-role-in-schools/${data.roleType}`, method: 'get'})
    }),
    getEvaluatorsForDistrictViewer: builder.query({
      query: (data) =>({url: `users/${data.workAreaContextId}/evaluators-for-district-viewer/${data.schoolCode}`, method: 'get'})
    }),

    // roles
    updateDteRoleInSchools: builder.mutation({
      query: (data) => ({url: `user-building-roles/update-dte-role-in-schools/${data.userId}`, method: 'put', data: data})
    }),

    updateDvRoleInSchools: builder.mutation({
      query: (data) => ({url: `user-building-roles/update-dv-role-in-schools/${data.userId}`, method: 'put', data: data})
    }),

    // assignments
    getAssignmentsSummaryForDistrict: builder.query({
      query: (frameworkContextId) => ({url: `assignments/district-summary/${frameworkContextId}`, method: 'get'}) 
    }),
    getAssignmentsDetail: builder.query({
      query: (data) => ({url: `assignments/detail/${data.frameworkContextId}/${data.schoolCode}`, method: 'get'})
    }),

    // local login
    getLocalLoginDistricts: builder.query({
      query: () => ({ url: `local-login/districts`, method: 'get' }),
    }),
    getLocalLoginUsersForDistrict: builder.query({
      query: (districtCode) => ({ url: `local-login/users/${districtCode}`, method: 'get' }),
    }),

    // school configurations
    getSchoolConfigurationsForFrameworkContext: builder.query({
      query: (frameworkContextId) => ({url: `school-configurations/framework-context/${frameworkContextId}`, method: 'get'})
    }),
    getSchoolConfigurationById: builder.query({
      query: (id) => ({url: `school-configurations/${id}`, method: 'get'})
    }),
    updateSchoolConfiguration: builder.mutation({
      query: (data) => ({url:`school-configurations/${data.id}`,method:'put', data:data})
    }),
    updateSchoolConfigurationBatchEvaluationSetupDelegation: builder.mutation({
      query: (data) => ({url:`school-configurations/${data.frameworkContextId}/delegate-evaluation-setup`, method: 'put', data: data})
    }),
  })
})

export const { 
  useGetLocalLoginDistrictsQuery,
  useGetLocalLoginUsersForDistrictQuery,
  useGetSchoolConfigurationsForFrameworkContextQuery,
  useGetSchoolConfigurationByIdQuery,
  useGetAssignmentsSummaryForDistrictQuery,
  useGetAssignmentsDetailQuery,
  useUpdateSchoolConfigurationMutation,
  useUpdateSchoolConfigurationBatchEvaluationSetupDelegationMutation,
  useGetUsersInRoleAtDistrictQuery,
  useGetUsersInRoleAtSchoolQuery,
  useGetUsersInRoleAtSchoolsQuery,
  useGetSchoolsInDistrictQuery,
  useUpdateDteRoleInSchoolsMutation,
  useUpdateDvRoleInSchoolsMutation,
  useUpdateEvaluationSetEvaluatorMutation,
  useGetHistoricalEvaluationsQuery,
  useUpdateEvaluationSetPlanTypeMutation,
  useGetEvaluationsForWorkAreaContextQuery,
  useGetEvaluationsForDistrictViewerQuery,
  useGetEvaluatorsForDistrictViewerQuery,
  useLoginUserMutation,
  useCreateEvidenceItemMutation,
  useGetPerceptionSurveyByIdQuery,
  useCreateEvidencePackageMutation,
  useGetPerceptionSurveysForEvaluationQuery,
  useCreatePerceptionSurveyMutation,
  useGetWorkAreaContextsForUserQuery,
  useGetEvaluationByIdQuery,
  useGetFrameworkByIdQuery,
  useGetEvidenceItemsForCollectionQuery,
  useGetEvidencePackagesForCollectionQuery,
  useCreateOtherEvidenceItemMutation,
} = apiSlice