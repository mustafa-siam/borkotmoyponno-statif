import { templateApi } from "@/redux/api/baseApi";

const OrderApi = templateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleAddOrder: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: "/order/",
          method: "POST",
          body: payload,
        };
      },
    }),
    handleSendTORedxOrder: builder.mutation<any, any>({
      query: (id) => {
        return {
          url: `/order/send-to-redx/${id}`,
          method: "POST",
        };
      },
    }),
    handleGetRedxStatusTrackOrder: builder.query<any, any>({
      query: (id) => {
        return {
          url: `/order/track/${id}`,
          method: "GET",
        };
      },
    }),

    handleFindOrder: builder.query<any, any>({
      query: ({
        page = 1,
        limit = 10,
        search,
        status,
        date,
        fromDate,
        toDate,
        startDateTime,
        endDateTime,
        startDate,
        categoryId,
        endDate,
      }) => {
        return {
          url: "/order/",
          method: "GET",
          params: {
            page: page,
            limit: limit,
            search: search,
            status,
            date,
            startDate,
            endDate,
            fromDate,
            toDate,
            startDateTime,
            endDateTime,
            categoryId,
          },
        };
      },
    }),
    handleFindOrder2: builder.query<any, any>({
      query: ({
        search,
        status,
        date,
        fromDate,
        toDate,
        startDateTime,
        endDateTime,
        startDate,
        categoryId,
        endDate,
      }) => {
        return {
          url: "/order/find/find-for-excel",
          method: "GET",
          params: {
            search: search,
            status,
            date,
            startDate,
            endDate,
            fromDate,
            toDate,
            startDateTime,
            endDateTime,
            categoryId,
          },
        };
      },
    }),

    handleFindSingleOrder: builder.query<any, any>({
      query: (id) => {
        return {
          url: `/order/${id}`,
          method: "GET",
        };
      },
    }),

    handleOrderStatus: builder.mutation<any, any>({
      query: (data) => {
        return {
          url: `/order/${data?.id}`,
          method: "PUT",
          body: {
            orderStatus: data?.orderStatus,
            paymentStatus: data?.paymentStatus,
          },
        };
      },
    }),

    handleMultipleOrderStatus: builder.mutation<
      any,
      { ids: string[]; orderStatus: string }
    >({
      query: ({ ids, orderStatus }) => {

        return {
          url: `/order/confirm-multiple`,
          method: "PUT",
          body: {
            ids,
            orderStatus,
          },
        };
      },
    }),

    handleDeleteOrder: builder.mutation<any, any>({
      query: (OrderIds) => {
        return {
          url: `/order/${OrderIds?.id}`,
          method: "DELETE",
          body: { ids: OrderIds?.ids },
        };
      },
    }),

    handleUpdateOrder: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: `/order/${payload.id}`,
          method: "PUT",
          body: { ...payload },
        };
      },
    }),

    handleUpdateOrderData: builder.mutation<any, any>({
      query: ({ payload, id }) => {
        return {
          url: `/order/update-order/${id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),

    handleUpdateDeliveryInformation: builder.mutation<any, any>({
      query: ({ payload, id }) => {
        return {
          url: `/order/update-delevery-info/${id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),

    handleFindOrderForDashboard: builder.query<any, any>({
      query: ({ formDate, toDate, startDateTime, endDateTime }) => {
        return {
          url: "/order/find",
          method: "GET",
          params: {
            formDate,
            toDate,
            startDateTime,
            endDateTime,
          },
        };
      },
    }),

    handleFindCategoryForDashboard: builder.query<any, any>({
      query: ({ categoryId, startDateTime, endDateTime }) => {
        return {
          url: "/order/filter/orderby-category",
          method: "GET",
          params: { categoryId, startDateTime, endDateTime },
        };
      },
    }),
  }),

  overrideExisting: false,
});

export const {
  useHandleAddOrderMutation,
  useHandleDeleteOrderMutation,
  useHandleFindOrderQuery,
  useHandleFindOrder2Query,
  useHandleFindSingleOrderQuery,
  useHandleUpdateOrderMutation,
  useHandleOrderStatusMutation,
  useHandleSendTORedxOrderMutation,
  useHandleGetRedxStatusTrackOrderQuery,
  useHandleFindOrderForDashboardQuery,
  useHandleUpdateOrderDataMutation,
  useHandleUpdateDeliveryInformationMutation,
  useHandleFindCategoryForDashboardQuery,
  useHandleMultipleOrderStatusMutation,
} = OrderApi;
