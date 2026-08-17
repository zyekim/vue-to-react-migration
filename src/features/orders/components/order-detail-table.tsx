import type { OrderDetail } from "../model/order"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

const currencyFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
})

interface OrderDetailTableProps {
  order: OrderDetail
}

export function OrderDetailTable({ order }: OrderDetailTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>상품코드</TableHead>
          <TableHead>상품명</TableHead>
          <TableHead>옵션</TableHead>
          <TableHead className="text-right">수량</TableHead>
          <TableHead className="text-right">단가</TableHead>
          <TableHead className="text-right">합계</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order.items.map((item) => (
          <TableRow key={`${order.orderId}-${item.productCode}`}>
            <TableCell className="font-medium">{item.productCode}</TableCell>
            <TableCell>{item.productName}</TableCell>
            <TableCell>{item.option}</TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
            <TableCell className="text-right">
              {currencyFormatter.format(item.unitPrice)}
            </TableCell>
            <TableCell className="text-right font-medium">
              {currencyFormatter.format(item.lineTotal)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
