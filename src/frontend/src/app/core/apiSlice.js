import { createApi } from '@reduxjs/toolkit/query/react'
import { config } from './config';
import axios from 'axios';

// const request = (url, method = 'get', data = {}) => new Promise((resolve, reject) => {
//   const token = localStorage.getItem('token');
//   const preparedRequest = {
//     method,
//     url: `${config.API_URL}/${url}`,
//     data: data,
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   };
//   axios(preparedRequest)
//     .then((data) => {
//       resolve(data.data);
//     })
//     .catch((err) => {
//       if (err.response?.status === 401) {
//         localStorage.removeItem('token');
//         window.location.href = '/login';
//       }
//       reject(err.response.data.ErrorMessage);
//     });
// });

const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token;  
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;

//     if (!originalConfig.url.contains("users/authenticate") && err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;

//         try {
//           const rs = await axiosInstance.post("users/refresh-token", {});
//           const { accessToken } = rs.data;

//           //dispatch(refreshToken(accessToken));
//           //TokenService.updateLocalAccessToken(accessToken);
//           localStorage.setItem('token', accessToken);
//           return axiosInstance(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//     }

//     return Promise.reject(err);
//   });

const axiosBaseQuery =
  ({ baseUrl, headers } = { baseUrl: '', headers: '' }) =>
  async ({ url, method, data }) => {
     try {
     // const token = localStorage.getItem('accessToken');
      const result = await axiosInstance({
        method,
        url: `${baseUrl}${url}`,
        data: data,
      });
      // if (token) {
      //   axios_args['headers'] = `Authorization: Bearer ${token}`;
      // }
     // const result = await axios(axios_args);

      const login = url.includes('authenticate');
      if (login) {
        const { accessToken, refreshToken } = result.data.data.tokens;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
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
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
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