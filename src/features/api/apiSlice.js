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
    // Get all ECUs
    getECUs: builder.query({
      query: () => '/api/ecus',
    }),
    // Get components for a specific ECU
    getComponentsByEcuId: builder.query({
      query: (ecuId) => `/api/ecus/${ecuId}/components`,
    }),
    // Get CVEs for a specific ECU
    getCVEs: builder.query({
      query: (ecuId) => `/api/cves/${ecuId}`,
    }),
    // Get details for a specific CVE
    getCVEById: builder.query({
      query: (id) => `/api/cves/${id}`,
    }),
  }),
});

/**
 * Exported query hooks for use in components
 * Each hook provides:
 * - data: The response data
 * - isLoading: Loading state
 * - error: Error state
 * - refetch: Function to manually refetch data
 */
export const {
  useGetECUsQuery,
  useGetComponentsByEcuIdQuery,
  useGetCVEsQuery,
  useGetCVEByIdQuery,
} = apiSlice;
