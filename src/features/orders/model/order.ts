export type OrderStatus =
  "pending" | "paid" | "preparing" | "shipped" | "cancelled"

export interface OrderItem {
  productCode: string
  productName: string
  option: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface OrderSummary {
  orderId: string
  orderedAt: string
  customerName: string
  status: OrderStatus
  itemCount: number
  totalQuantity: number
  totalAmount: number
}

export interface OrderDetail extends OrderSummary {
  items: OrderItem[]
}

export interface GetOrdersParams {
  keyword?: string
  status?: OrderStatus
  page?: number
  pageSize?: number
}

export interface PaginatedOrdersResponse {
  items: OrderSummary[]
  total: number
  page: number
  pageSize: number
}
