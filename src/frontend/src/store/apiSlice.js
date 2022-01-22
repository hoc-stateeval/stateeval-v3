import { createApi } from '@reduxjs/toolkit/query/react'
import { config } from '../config';
import axios from 'axios';

import { getTokens, updateTokens } from '@lib/tokenService';

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getTokens();
    if (accessToken) {
      config.headers["Authorization"] = 'Bearer ' + accessToken;  
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data }) => {
     try {
      const result = await axiosInstance({
        method,
        url: `${baseUrl}${url}`,
        data: data,
      });

      const login = url.includes('authenticate');
      if (login) {
        const { accessToken, refreshToken } = result.data.data.tokens;
        updateTokens(accessToken, refreshToken);
      }

      return {data: result.data.data};
    }
    catch (axiosError) {
      if (axiosError.response.status === 401) {
        try {
          const token = localStorage.getItem('refreshToken');
          const rs = await axiosInstance({
            method: 'POST',
            url: `${baseUrl}users/refresh-token`,
            data: {
              refreshToken: token,
            },
          });
          const { accessToken, refreshToken } = rs.data.data;
          updateTokens(accessToken, refreshToken);
          return axios(axiosError.config.url);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
      throw new Error(`status: ${axiosError.response?.status}, data: ${axiosError.response?.data.ErrorMessage}`)
    }
  }

const baseUrl = `${config.API_URL}/`;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: baseUrl }),
  tagTypes: [],
  endpoints: builder => ({

    // evidenceItems
    getYearToDateEvidenceItems: builder.query({
      query: (data) => ({url: `evidence-items/${data.evaluationId}`, method: 'get'})
    }),
    getEvidenceItemsForCollection: builder.query({
      query: (data) => ({url: `evidence-items/${data.collectionType}/${data.collectionObjectId}`, method: 'get'})
    }),
    createEvidenceItem: builder.mutation({
      query: (data) => ({url: `evidence-items/${data.collectionType}/${data.collectionObjectId}`, method: 'post', data: data}) 
    }),

    // evaluations
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
  useGetEvidenceItemsForCollectionQuery,
  useCreateEvidenceItemMutation,
  useGetYearToDateEvidenceItemsQuery
} = apiSlice