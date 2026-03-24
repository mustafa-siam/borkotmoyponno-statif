import { templateApi } from "@/redux/api/baseApi";

const ReviewApi = templateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleAddReview: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: "/review",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["Review"],
    }),

    handleDeleteReview: builder.mutation<any, any>({
      query: (id) => {
        return {
          url: `/review/${id}`,
          method: "DELETE",
        };
      },
    }),

    handleGetAllReview: builder.query<any, any>({
      query: (search) => {
        return {
          url: "/review",
          method: "GET",
          params: search,
        };
      },
      providesTags: ["Review"],
    }),
    handleFIndReviewsByProduct: builder.query<any, any>({
      query: ( id ) => {
        return {
          url: `/review/find-by-id/${id}`,
          method: "GET",
        };
      },
    }),

    handleGetSingleReview: builder.query<any, any>({
      query: (id) => {
        return {
          url: `/review/${id}`,
          method: "GET",
        };
      },
    }),

    handleUpdateReview: builder.mutation<any, any>({
      query: ({ payload, id }) => {
        return {
          url: `/review/${id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleAddReviewMutation,
  useHandleGetAllReviewQuery,
  useHandleFIndReviewsByProductQuery,
  useHandleDeleteReviewMutation,
  useHandleGetSingleReviewQuery,
  useHandleUpdateReviewMutation,
} = ReviewApi;
