import { templateApi } from "@/redux/api/baseApi";

const ProductApi = templateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleAddProduct: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: "/product/",
          method: "POST",
          body: payload,
        };
      },
    }),
    handleFindProduct: builder.query<any, any>({
      query: ({ page = 1, limit, search, minPrice, maxPrice, category }) => {
        return {
          url: "/product/",
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
    handleFindSingleProduct: builder.query<any, any>({
      query: (slug) => {
        return {
          url: `/product/${slug}`,
          method: "GET",
        };
      },
    }),
    handleDeleteProduct: builder.mutation<any, any>({
      query: (ProductMemberId) => {
        return {
          url: `/product/${ProductMemberId}`,
          method: "DELETE",
        };
      },
    }),
    handleUpdateProduct: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: `/product/${payload.id}`,
          method: "PUT",
          body: { ...payload },
        };
      },
    }),

    handleFindProductCount: builder.query<any, any>({
      query: () => {
        return {
          url: "/product/find",
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useHandleAddProductMutation,
  useHandleDeleteProductMutation,
  useHandleFindProductQuery,
  useHandleFindSingleProductQuery,
  useHandleUpdateProductMutation,
  useHandleFindProductCountQuery,
} = ProductApi;
