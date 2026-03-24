import { templateApi } from "@/redux/api/baseApi";

const CategoryApi = templateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleAddCategory: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: "/category/create",
          method: "POST",
          body: payload,
        };
      },
    }),
    handleFindCategory: builder.query<any, any>({
      query: ({ page = 1, limit = 10, search = "" }) => {
        return {
          url: "/category/",
          method: "GET",
          params: { page: page, limit: limit, name: search },
        };
      },
    }),
    handleFindSingleCategory: builder.query<any, any>({
      query: (slug) => {
        return {
          url: `/category/${slug}`,
          method: "GET",
        };
      },
    }),
    handleDeleteCategory: builder.mutation<any, any>({
      query: (CategoryMemberId) => {
        return {
          url: `/category/${CategoryMemberId}`,
          method: "DELETE",
        };
      },
    }),
    handleUpdateCategory: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: `/category/${payload.id}`,
          method: "PUT",
          body: { ...payload },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleAddCategoryMutation,
  useHandleDeleteCategoryMutation,
  useHandleFindCategoryQuery,
  useHandleFindSingleCategoryQuery,
  useHandleUpdateCategoryMutation,
} = CategoryApi;
