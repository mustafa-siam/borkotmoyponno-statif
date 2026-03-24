import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

interface Order {
  products: any;
  payload: {
    createdAt: string;
    user: {
      name: string;
      phone: string;
      address: string;
    };
    shippingCost: number;
    products: {
      product: {
        productName: string;
        productImage: string;
      };
      quantity: number;
      price?: number;
    }[];
    paymentInfo: {
      method: string;
      cashPaymentMessage?: string;
      bkashPhone?: string;
      bkashTransactionId?: string;
    };
    inDhaka: boolean;
    trackingId: string;
    totalAmount?: number;
    deliveryFee?: number;
    status?: string;
  };
}
Font.register({
  family: "Siyamrupali",
  src: "/assets/fonts/Siyamrupali.ttf",
});
// Modernized styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: "Siyamrupali",
    fontSize: 10,
    backgroundColor: "#ffffff",
    color: "#1f2937",
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "2 solid #1e3a8a",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1e3a8a",
  },
  section: {
    marginBottom: 20,
    padding: 12,
    border: "1 solid #d1d5db",
    borderRadius: 6,
    backgroundColor: "#f9fafb",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#111827",
    borderBottom: "1 solid #e5e7eb",
    paddingBottom: 4,
  },
  text: {
    fontSize: 11,
    marginBottom: 4,
  },
  table: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 5,
    paddingHorizontal: 4,
    alignItems: "center",
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 11,
    fontWeight: "bold",
    color: "#1f2937",
  },
  tableCell: {
    flex: 1,
    fontSize: 10,
    color: "#374151",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  footer: {
    marginTop: 30,
    padding: 12,
    borderTop: "1 solid #e5e7eb",
    textAlign: "center",
  },
  footerText: {
    fontSize: 11,
    color: "#6b7280",
  },
});

const OrderInvoice = ({ payload, products }: Order) => {
  const date = new Date(payload.createdAt);
  const currentDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const deliveryFee = payload.shippingCost;
  const stripHtml = (html: string) => html.replace(/<[^>]*>?/gm, "");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Order Invoice</Text>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <Text style={styles.text}>Name: {payload.user.name}</Text>
          <Text style={styles.text}>Phone: {payload.user.phone}</Text>
          <Text style={styles.text}>Address: {payload.user.address}</Text>
        </View>

        {/* Order Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Details</Text>
          <Text style={styles.text}>Order ID: {payload.trackingId}</Text>
          <Text style={styles.text}>Order Date: {currentDate}</Text>
          <Text style={styles.text}>
            Payment Method:{" "}
            {payload.paymentInfo.method === "cash"
              ? "Cash on Delivery"
              : payload.paymentInfo.method}
          </Text>
          <Text style={styles.text}>Delivery Fee: {deliveryFee} TK</Text>
        </View>

        {/* Product Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeaderCell}>Product</Text>
              <Text style={styles.tableHeaderCell}>Qty</Text>
              <Text style={styles.tableHeaderCell}>Price</Text>
              <Text style={styles.tableHeaderCell}>Total</Text>
            </View>
            {products.map((item: any, i: number) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  {stripHtml(item.product.productName)}
                </Text>
                <Text style={styles.tableCell}>{item.quantity}</Text>
                <Text style={styles.tableCell}>{item.price ?? 0} TK</Text>
                <Text style={styles.tableCell}>
                  {(item.price ?? 0) * item.quantity} TK
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.summaryRow}>
            <Text>Subtotal:</Text>
            <Text>
              {Number(payload?.totalAmount) - Number(payload?.shippingCost)} TK
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text>Delivery Fee:</Text>
            <Text>{payload?.shippingCost} TK</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={{ fontWeight: "bold" }}>Total:</Text>
            <Text style={{ fontWeight: "bold" }}>
              {payload?.totalAmount} TK
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Thank you for your order!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderInvoice;
