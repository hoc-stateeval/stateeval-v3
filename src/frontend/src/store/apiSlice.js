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
      query: (data) => ({ url: `users/authenticate`, method: 'post', data: data }),
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