import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const articleapiKey = import.meta.env.VITE_RAPID_ARTICLE_API;

export const articleApi = createApi({
    reducerPath:"articleApi",
    baseQuery:fetchBaseQuery({
        baseUrl:"https://article-extractor-and-summarizer.p.rapidapi.com",
        prepareHeaders:(headers)=>{
            headers.set('X-RapidAPI-Key', articleapiKey),
            headers.set('X-RapidAPI-Host','article-extractor-and-summarizer.p.rapidapi.com')
            return headers;
        }
    }),
    endpoints:(builder)=>({
        getSummary:builder.query({
            query:(params)=>`/summarize?url=${encodeURIComponent(params.articleUrl)}&length=${params.length}`
        })
    })
});

export const { useLazyGetSummaryQuery } = articleApi;


















// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// //Preserving ENV Data in VITE Env
// const articleapiKey = import.meta.env.VITE_RAPID_ARTICLE_API;

// //Creating API with headers and EndPoints
// export const articleApi = createApi({
//     reducerPath:"articleApi",
//     baseQuery:fetchBaseQuery({
//         baseUrl:"https://article-extractor-and-summarizer.p.rapidapi.com",
//         prepareHeaders:(headers)=>{
//             headers.set('X-RapidAPI-Key', articleapiKey);
//             headers.set('X-RapidAPI-Host','article-extractor-and-summarizer.p.rapidapi.com')
//             return headers;
//         }

//     }),
//     endpoints: (builder)=>({
//         getSummery:builder.query({
//             query:(params)=>`/summarize?url=${encodeURIComponent(params.articleUrl)}?length=3`
//         }),
//     }),
    
    
// });
// //Export as a lazy query its means OnDemand query execution 
// export const { useLazyGetSummeryQuery } = articleApi;

