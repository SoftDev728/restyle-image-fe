import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_BASE_URL,
    responseHandler: async (response) => {
      // For image responses, get ArrayBuffer
      const contentType = response.headers.get("content-type");
      if (contentType?.startsWith("image/")) {
        const buffer = await response.arrayBuffer();
        return { data: buffer, contentType };
      }
      return response.json();
    },
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});

export default apiSlice;
