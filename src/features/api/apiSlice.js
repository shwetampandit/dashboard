/**
 * This file configures the RTK Query API slice for the application.
 * It defines all API endpoints and their corresponding query hooks.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  // Name for this API in Redux
  reducerPath: 'api',
  // Set the base URL for all API calls
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://securethingsmockapi.onrender.com' 
  }),
  // Define API endpoints
  endpoints: (builder) => ({
    getECUs: builder.query({
      query: () => '/api/ecus',
    }),
    getComponentsByEcuId: builder.query({
      query: (ecuId) => `/api/ecus/${ecuId}/components`,
    }),
    getCVEs: builder.query({
      query: (ecuId) => `/api/cves/${ecuId}`,
    }),
    getCVEById: builder.query({
      query: (id) => `/api/cves/${id}`,
    }),
  }),
});

// Export the query hooks
export const {
  useGetECUsQuery,
  useGetComponentsByEcuIdQuery,
  useGetCVEsQuery,
  useGetCVEByIdQuery,
} = apiSlice;
