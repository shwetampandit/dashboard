/**
 * API Slice Configuration
 * 
 * This file configures the RTK Query API slice for the application.
 * It defines all API endpoints and their corresponding query hooks.
 * 
 * Base URL: https://securethingsmockapi.onrender.com
 * 
 * Features:
 * - Automatic caching and revalidation
 * - Type-safe API calls
 * - Centralized API configuration
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  // Unique identifier for this API slice in the Redux store
  reducerPath: 'api',
  
  // Base configuration for all API requests
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://securethingsmockapi.onrender.com' 
  }),
  
  // API endpoints configuration
  endpoints: (builder) => ({
    /**
     * Get all ECUs (Electronic Control Units)
     * Endpoint: GET /api/ecus
     * Returns: Array of ECU objects
     */
    getECUs: builder.query({
      query: () => '/api/ecus',
    }),

    /**
     * Get components for a specific ECU
     * Endpoint: GET /api/ecus/:ecuId/components
     * @param {string} ecuId - The ID of the ECU
     * Returns: Array of component objects for the specified ECU
     */
    getComponentsByEcuId: builder.query({
      query: (ecuId) => `/api/ecus/${ecuId}/components`,
    }),

    /**
     * Get CVE (Common Vulnerabilities and Exposures) for a specific ECU
     * Endpoint: GET /api/cves/:ecuId
     * @param {string} ecuId - The ID of the ECU
     * Returns: CVE object for the specified ECU
     */
    getCVEs: builder.query({
      query: (ecuId) => `/api/cves/${ecuId}`,
    }),

    /**
     * Get specific CVE by ID
     * Endpoint: GET /api/cves/:id
     * @param {string} id - The ID of the CVE
     * Returns: Detailed CVE object
     */
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
