import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from './config';

const baseUrl = `${config.API_URL}/`;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
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
      query: (districtCode) => `buildings/${districtCode}/schools/`
    }),

    // users

    loginUser: builder.mutation({
      query(data) {
        return {
          url: `auth`,
          method: 'POST',
          body: data,
        };
      },
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
      query: () => 'local-login/districts'
    }),
    getLocalLoginUsersForDistrict: builder.query({
      query: (districtCode) => `local-login/users/${districtCode}`
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