import { templateApi } from "@/redux/api/baseApi";

const BannerApi = templateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleAddBanner: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: "/banner/",
          method: "POST",
          body: payload,
        };
      },
    }),
    handleChangeOrderBanner: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: "/banner/change-order",
          method: "PATCH",
          body: payload,
        };
      },
    }),
    handleFindBanner: builder.query<any, any>({
      query: ({ page = 1, limit = 10, search = "" }) => {
        return {
          url: "/banner/",
          method: "GET",
          params: { page: page, limit: limit, name: search },
        };
      },
    }),
    handleFindSingleBanner: builder.query<any, any>({
      query: (slug) => {
        return {
          url: `/banner/${slug}`,
          method: "GET",
        };
      },
    }),
    handleDeleteBanner: builder.mutation<any, any>({
      query: (BannerMemberId) => {
        return {
          url: `/banner/${BannerMemberId}`,
          method: "DELETE",
        };
      },
    }),
    handleUpdateBanner: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: `/banner/${payload.id}`,
          method: "PUT",
          body: { ...payload },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleAddBannerMutation,
  useHandleDeleteBannerMutation,
  useHandleFindBannerQuery,
  useHandleFindSingleBannerQuery,
  useHandleUpdateBannerMutation,
  useHandleChangeOrderBannerMutation,
} = BannerApi;
