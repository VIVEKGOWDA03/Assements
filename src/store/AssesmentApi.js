// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const AssesmentApi = createApi({
//     reducerPath: 'assesmentApi',
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thecatapi.com/v1/' }),
//     endpoints: (builder) => ({
//       getCats: builder.query({
//         query: (page = 1) => `images/search?limit=5&page=${page}&order=Desc`,
//       }),
//     }),
//   });
  
//   export const { useGetCatsQuery } = AssesmentApi;
  
// src/features/catApi.js
// src/store/AssesmentApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AssesmentApi = createApi({
  reducerPath: 'AssesmentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thecatapi.com/v1/' }),
  endpoints: (builder) => ({
    getCats: builder.query({
      query: ({ limit, page }) => `images/search?limit=${limit}&page=${page}&order=Desc`,
    }),
  }),
});

// Export the generated hook
export const { useGetCatsQuery } = AssesmentApi;
