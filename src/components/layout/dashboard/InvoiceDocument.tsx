import { Order } from '@/redux/features/order/orderType';
import { Page, Text, View, Document, StyleSheet,Font } from '@react-pdf/renderer';
// Define your Order type

// Create styles
Font.register({
  family: 'Siyamrupali',
  src: '/assets/fonts/Siyamrupali.ttf'
});
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Siyamrupali',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
  },
  section: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    width: '30%',
  },
  value: {
    width: '70%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 5,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  col1: { width: '50%' },
  col2: { width: '20%', textAlign: 'right' },
  col3: { width: '30%', textAlign: 'right' },
  total: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 30,
    fontSize: 10,
    color: '#666666',
    textAlign: 'center',
  },
});

interface InvoiceDocumentProps {
  order: Order;
}

export const InvoiceDocument = ({ order }: InvoiceDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Invoice</Text>
        <Text style={styles.subtitle}>Order #: {order?.trackingId}</Text>
        <Text style={styles.subtitle}>Date: {new Date(order?.orderedAt).toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Bill To:</Text>
        <Text>{order.user.name}</Text>
        <Text>{order.user.phone}</Text>
        <Text>{order.user.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>Payment Method:</Text>
        <Text>{order.paymentInfo.method.toUpperCase()}</Text>
        {order.paymentInfo.method === 'bkash' && (
          <>
            <Text>Phone: {order.paymentInfo.bkashPhone}</Text>
            <Text>Transaction ID: {order.paymentInfo.bkashTransactionId}</Text>
          </>
        )}
      </View>

      <View style={styles.tableHeader}>
        <Text style={styles.col1}>Product</Text>
        <Text style={styles.col2}>Quantity</Text>
        <Text style={styles.col3}>Price</Text>
      </View>

      {order.products.map((item:any, index:any) => (
        <View key={index} style={styles.tableRow}>
          <Text style={styles.col1}>{item.product.productName.replace(/<[^>]*>/g, '')}</Text>
          <Text style={styles.col2}>{item.quantity}</Text>
          <Text style={styles.col3}>{item.price} Taka</Text>
        </View>
      ))}

      <View style={styles.total}>
        <Text>Shipping: {order.shippingCost} Taka</Text>
      </View>
      <View style={styles.total}>
        <Text>Total: {order.totalAmount} Taka</Text>
      </View>

      <View style={styles.footer}>
        <Text>Thank you for your order!</Text>
        <Text>For any queries, please contact our customer support.</Text>
      </View>
    </Page>
  </Document>
);