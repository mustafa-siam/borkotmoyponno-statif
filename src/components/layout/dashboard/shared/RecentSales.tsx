import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  customer: string
  total: number
  status: string
  method: string
}

interface RecentSalesProps {
  orders: Order[]
}

export function RecentSales({ orders }: RecentSalesProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Customer</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell className="font-medium">{order.customer}</TableCell>
            <TableCell>{order.method}</TableCell>
            <TableCell>৳{order.total}</TableCell>
            <TableCell>
              <Badge variant={
                order.status === 'completed' ? 'default' : 
                order.status === 'processing' ? 'secondary' : 'outline'
              }>
                {order.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}