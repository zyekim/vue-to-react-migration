import type { KeyboardEvent } from "react"
import { cn } from "@/shared/lib/utils"
import type { OrderStatus, OrderSummary } from "../model/order"
import { Badge } from "@/shared/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"

const statusLabels: Record<OrderStatus, string> = {
  pending: "결제 대기",
  paid: "결제 완료",
  preparing: "상품 준비",
  shipped: "배송 완료",
  cancelled: "주문 취소",
}

const dateTimeFormatter = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "medium",
  timeStyle: "short",
})

const currencyFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
})

interface OrderListTableProps {
  orders: OrderSummary[]
  selectedOrderId: string | null
  onSelect: (orderId: string) => void
}

export function OrderListTable({
  orders,
  selectedOrderId,
  onSelect,
}: OrderListTableProps) {
  const handleKeyDown = (
    event: KeyboardEvent<HTMLTableRowElement>,
    orderId: string,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSelect(orderId)
    }
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50"
      case "paid":
        return "text-green-600 bg-green-50"
      case "preparing":
        return "text-blue-600 bg-blue-50"
      case "shipped":
        return "text-purple-600 bg-purple-50"
      case "cancelled":
        return "text-red-600 bg-red-50"
      default:
        return ""
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>주문번호</TableHead>
          <TableHead>주문일시</TableHead>
          <TableHead>고객명</TableHead>
          <TableHead>상태</TableHead>
          <TableHead className="text-right">상품 종류</TableHead>
          <TableHead className="text-right">총 수량</TableHead>
          <TableHead className="text-right">총 금액</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow
            key={order.orderId}
            aria-selected={selectedOrderId === order.orderId}
            className="aria-selected:bg-muted cursor-pointer"
            tabIndex={0}
            onClick={() => onSelect(order.orderId)}
            onKeyDown={(event) => handleKeyDown(event, order.orderId)}
          >
            <TableCell className="font-medium">{order.orderId}</TableCell>
            <TableCell>
              {dateTimeFormatter.format(new Date(order.orderedAt))}
            </TableCell>
            <TableCell>{order.customerName}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={cn(getStatusColor(order.status))}
              >
                {statusLabels[order.status]}
              </Badge>
            </TableCell>
            <TableCell className="text-right">{order.itemCount}</TableCell>
            <TableCell className="text-right">{order.totalQuantity}</TableCell>
            <TableCell className="text-right font-medium">
              {currencyFormatter.format(order.totalAmount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
