import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from './config';

const baseUrl = `${config.API_URL}/`;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['SchoolConfiguration'],
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
  useGetTeacherAssignmentsSummaryForDistrictQuery,
  useUpdateSchoolConfigurationMutation,
  useUpdateSchoolConfigurationBatchEvaluationSetupDelegationMutation
} = apiSlice