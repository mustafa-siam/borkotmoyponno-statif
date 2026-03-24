import { templateApi } from "@/redux/api/baseApi";

const LevelApi = templateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleAddLevel: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: "/level/",
          method: "POST",
          body: payload,
        };
      },
    }),
    handleFindLevel: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 10,
        search,
        minPrice,
        maxPrice,
        category,
      }) => {
        return {
          url: "/level/",
          method: "GET",
          params: {
            page: page,
            limit: limit,
            search: search,
            minPrice: minPrice,
            maxPrice: maxPrice,
            category: category,
          },
        };
      },
    }),
    handleFindSingleLevel: builder.query<any, any>({
      query: (slug) => {
        return {
          url: `/level/${slug}`,
          method: "GET",
        };
      },
    }),
    handleDeleteLevel: builder.mutation<any, any>({
      query: (LevelMemberId) => {
        return {
          url: `/level/${LevelMemberId}`,
          method: "DELETE",
        };
      },
    }),
    handleUpdateLevel: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: `/level/${payload.id}`,
          method: "PUT",
          body: { ...payload },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleAddLevelMutation,
  useHandleDeleteLevelMutation,
  useHandleFindLevelQuery,
  useHandleFindSingleLevelQuery,
  useHandleUpdateLevelMutation,
} = LevelApi;
