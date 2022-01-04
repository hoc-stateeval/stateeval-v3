import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from './config';
import axios from 'axios'

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data })
      return { data: result.data }
    } catch (axiosError) {
     // throw new Error("There was an error");
      throw new Error(`status: ${axiosError.response?.status}, data: ${axiosError.response?.data}`)
      // let err = axiosError
      // return {
      //   error: { status: err.response?.status, data: err.response?.data },
      // }
    }
  }

const baseUrl = `${config.API_URL}/`;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['SchoolConfiguration'],
  endpoints: builder => ({

    // evaluations
    updateEvaluationSetEvaluator: builder.mutation({
      query(data) {
        return {
          url: `evaluations/${data.id}/updateevaluator`,
          method: 'PUT',
          body: data,
        };
      },
    }),

    updateEvaluationSetPlanType: builder.mutation({
      query(data) {
        return {
          url: `evaluations/${data.evaluationId}/updateplantype`,
          method: 'PUT',
          body: data,
        };
      },
    }),

    getHistoricalEvaluations: builder.query({
      query: (evaluateeId) => `evaluations/historical/${evaluateeId}`
    }),

    getEvaluationsForWorkAreaContext: builder.query({
      query: (workAreaContextId) => `evaluations/workarea-context/${workAreaContextId}`
    }),

    getEvaluationsForDistrictViewer: builder.query({
      query: (data) => {
        return `evaluations/${data.frameworkContextId}/${data.evaluatorId}/${data.schoolCode}`;
      }
    }),

    // buildings
    getSchoolsInDistrict: builder.query({
      query: (districtCode) => ({ url: `buildings/${districtCode}/schools/`, method: 'get' }),
    }),

    // users

    loginUser: builder.mutation({
      query: (data) => ({ url: `auth`, method: 'post', data: data }),
    }),
    
    getUsersInRoleAtDistrict: builder.query({
      query: (data) => `users/district/${data.districtCode}/usersinrole/${data.roleType}`
    }),

    getUsersInRoleAtSchool: builder.query({
      query: (data) => `users/school/${data.schoolCode}/usersinrole/${data.roleType}`
    }),

    getUsersInRoleAtSchools: builder.query({
      query: (data) => `users/${data.districtCode}/usersinroleinschools/${data.roleType}`
    }),

    getEvaluatorsForDistrictViewer: builder.query({
      query: (data) => {
        return `users/${data.workAreaContextId}/evaluators-for-district-viewer/${data.schoolCode}`
      }
    }),

    // roles
    updateDTERoleInSchools: builder.mutation({
      query(data) {
        return {
          url: `user-building-roles/update-dte-role-in-schools/${data.userId}`,
          method: 'PUT',
          body: data,
        };
      },
    }),

    // assignments
    getAssignmentsSummaryForDistrict: builder.query({
      query: (frameworkContextId) => `assignments/district-summary/${frameworkContextId}`
    }),

    getAssignmentsDetail: builder.query({
      query: (data) => `assignments/detail/${data.frameworkContextId}/${data.schoolCode}`
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
      query: (frameworkContextId) => `school-configurations/framework-context/${frameworkContextId}`,
      providesTags: ['SchoolConfiguration'],
    }),
    getSchoolConfigurationById: builder.query({
      query: (id) => `school-configurations/${id}`,
      providesTags: ['SchoolConfiguration'],
    }),
    updateSchoolConfiguration: builder.mutation({
      query(data) {
        return {
          url: `school-configurations/${data.id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['SchoolConfiguration'],
    }),
    updateSchoolConfigurationBatchEvaluationSetupDelegation: builder.mutation({
      query(data) {
        return {
          url: `school-configurations/${data.frameworkContextId}/delegate-evaluation-setup`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['SchoolConfiguration'],
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
  useUpdateDTERoleInSchoolsMutation,
  useUpdateEvaluationSetEvaluatorMutation,
  useGetHistoricalEvaluationsQuery,
  useUpdateEvaluationSetPlanTypeMutation,
  useGetEvaluationsForWorkAreaContextQuery,
  useGetEvaluationsForDistrictViewerQuery,
  useGetEvaluatorsForDistrictViewerQuery,
  useLoginUserMutation,
} = apiSlice