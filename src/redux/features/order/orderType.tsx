export interface Order {
  _id: string;
  user: {
    name: string;
    phone: string;
    address: string;
  };
  paymentInfo: {
    method: string;
    bkashPhone?: string;
    bkashTransactionId?: string;
    status: string;
  };
  products: Array<{
    product: {
      productName: string;
      // Add other product fields as needed
    };
    quantity: number;
    price: number;
    _id: string;
  }>;
  orderStatus: string;
  shippingCost: number;
  totalAmount: number;
  orderedAt: string;
  trackingId: string;
  // Add other fields as needed
}