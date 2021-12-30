import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from './config';

const baseUrl = `${config.API_URL}/`;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: builder => ({

    // assignments
    getTeacherAssignmentsSummaryForDistrict: builder.query({
      query: (frameworkContextId) => `assignments/tr-assignments-summary/${frameworkContextId}`
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
      provides: (result) => [
        ...result.map(({ id }) => ({ type: 'SchoolConfigurations', id })),
        { type: 'SchoolConfigurations', id: 'LIST' },
      ],
    }),
    getSchoolConfigurationById: builder.query({
      query: (id) => `school-configurations/${id}`,
      provides: (_, id) => [{ type: 'SchoolConfigurations', id }],
    }),
    updateSchoolConfiguration: builder.mutation({
      query(data) {
        return {
          url: `school-configurations/${data.id}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidates: (_, { id }) => [{ type: 'SchoolConfigurations', id }],
    }),
    updateSchoolConfigurationBatchEvaluationSetupDelegation: builder.mutation({
      query(data) {
        return {
          url: `school-configurations/${data.frameworkContextId}/delegate-evaluation-setup`,
          method: 'PUT',
          body: data,
        };
      },
    }),
  })
})

export const { 
  useGetLocalLoginDistrictsQuery,
  useGetLocalLoginUsersForDistrictQuery,
  useGetSchoolConfigurationsForFrameworkContextQuery,
  useGetSchoolConfigurationByIdQuery,
  useGetTeacherAssignmentsSummaryForDistrictQuery,
  useUpdateSchoolConfigurationMutation,
  useUpdateSchoolConfigurationBatchEvaluationSetupDelegationMutation
} = apiSlice