import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { config } from './config';

const baseUrl = `${config.API_URL}/`;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: builder => ({
    getLocalLoginDistricts: builder.query({
      query: () => ({ url: 'local-login/districts' }),
      // query: () => 'local-login/districts'
    }),
    getLocalLoginUsersForDistrict: builder.query({
      query: (districtCode) => `local-login/users/${districtCode}`
    })
  })
})

export const { 
  useGetLocalLoginDistrictsQuery,
  useGetLocalLoginUsersForDistrictQuery,
} = apiSlice