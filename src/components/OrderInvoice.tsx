"use client";

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image as PdfImage,
} from "@react-pdf/renderer";

interface OrderInvoiceProps {
  payload: {
    createdAt: string;
    user: { name: string; phone: string; address: string };
    shippingCost: number;
    paymentInfo: { method: string };
    trackingId: string;
    totalAmount: number;
  };
  products: {
    name: string;
    price: number;
    quantity: number;
    image: string;
    unit: string;
  }[];
}

Font.register({
  family: "Siyamrupali",
  src: "/assets/fonts/Siyamrupali.ttf",
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Siyamrupali",
    fontSize: 10,
    backgroundColor: "#ffffff",
    color: "#111827",
  },

  header: {
    textAlign: "center",
    marginBottom: 20,
  },

  brand: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#16a34a",
  },

  title: {
    fontSize: 14,
    marginTop: 4,
    color: "#374151",
  },

  section: {
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 3,
  },

  text: {
    fontSize: 10,
    marginBottom: 3,
  },

  table: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },

  headerRow: {
    backgroundColor: "#f3f4f6",
    fontWeight: "bold",
  },

  colProduct: { flex: 3, flexDirection: "row", alignItems: "center" },
  colQty: { flex: 1, textAlign: "center" },
  colPrice: { flex: 1, textAlign: "center" },
  colTotal: { flex: 1, textAlign: "center" },

  img: {
    width: 28,
    height: 28,
    marginRight: 6,
    borderRadius: 4,
  },

  summary: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },

  total: {
    fontWeight: "bold",
    fontSize: 12,
  },

  footer: {
    marginTop: 25,
    textAlign: "center",
  },

  footerText: {
    fontSize: 10,
    color: "#6b7280",
  },
});

const OrderInvoice = ({ payload, products }: OrderInvoiceProps) => {
  const date = new Date(payload.createdAt).toLocaleDateString("en-GB");

  const subtotal = products.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + payload.shippingCost;

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.brand}>Borkotmoy Ponno</Text>
          <Text style={styles.title}>Official Invoice</Text>
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
          <Text style={styles.text}>Date: {date}</Text>
          <Text style={styles.text}>
            Payment:{" "}
            {payload.paymentInfo.method === "cash"
              ? "Cash on Delivery"
              : payload.paymentInfo.method}
          </Text>
          <Text style={styles.text}>Shipping: {payload.shippingCost} TK</Text>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Products</Text>

          <View style={styles.table}>

            {/* Header */}
            <View style={[styles.row, styles.headerRow]}>
              <Text style={styles.colProduct}>Product</Text>
              <Text style={styles.colQty}>Qty</Text>
              <Text style={styles.colPrice}>Price</Text>
              <Text style={styles.colTotal}>Total</Text>
            </View>

            {/* Rows */}
            {products.map((item, i) => (
              <View key={i} style={styles.row}>
                <View style={styles.colProduct}>
                  {item.image ? (
                    <PdfImage src={item.image} style={styles.img} />
                  ) : null}
                  <Text>{item.name}</Text>
                </View>

                <Text style={styles.colQty}>{item.quantity}</Text>
                <Text style={styles.colPrice}>{item.price} TK</Text>
                <Text style={styles.colTotal}>
                  {item.price * item.quantity} TK
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text>Subtotal</Text>
            <Text>{subtotal} TK</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text>Shipping</Text>
            <Text>{payload.shippingCost} TK</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.total}>Total</Text>
            <Text style={styles.total}>{total} TK</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for shopping with us
          </Text>
        </View>

      </Page>
    </Document>
  );
};

export default OrderInvoice;