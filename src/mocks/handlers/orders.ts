import { http, HttpResponse } from "msw"

import type { OrderStatus, OrderSummary } from "@/features/orders/model/order"
import { mockOrders } from "@/mocks/data/orders"

const orderStatuses: OrderStatus[] = [
  "pending",
  "paid",
  "preparing",
  "shipped",
  "cancelled",
]

function positiveInteger(value: string | null, fallback: number) {
  const parsedValue = Number(value)
  return Number.isInteger(parsedValue) && parsedValue > 0
    ? parsedValue
    : fallback
}

function toSummary(order: (typeof mockOrders)[number]): OrderSummary {
  return {
    orderId: order.orderId,
    orderedAt: order.orderedAt,
    customerName: order.customerName,
    status: order.status,
    itemCount: order.itemCount,
    totalQuantity: order.totalQuantity,
    totalAmount: order.totalAmount,
  }
}

export const ordersHandlers = [
  http.get("/api/orders", ({ request }) => {
    const url = new URL(request.url)
    const keyword = url.searchParams.get("keyword")?.trim().toLowerCase() ?? ""
    const requestedStatus = url.searchParams.get("status")
    const status = orderStatuses.find((item) => item === requestedStatus)
    const page = positiveInteger(url.searchParams.get("page"), 1)
    const pageSize = positiveInteger(url.searchParams.get("pageSize"), 10)

    const filteredOrders = mockOrders.filter((order) => {
      const matchesKeyword =
        !keyword ||
        order.orderId.toLowerCase().includes(keyword) ||
        order.customerName.toLowerCase().includes(keyword)
      const matchesStatus = !status || order.status === status

      return matchesKeyword && matchesStatus
    })

    const startIndex = (page - 1) * pageSize
    const items = filteredOrders
      .slice(startIndex, startIndex + pageSize)
      .map(toSummary)

    return HttpResponse.json({
      items,
      total: filteredOrders.length,
      page,
      pageSize,
    })
  }),

  http.get("/api/orders/:orderId", ({ params }) => {
    const order = mockOrders.find((item) => item.orderId === params.orderId)

    if (!order) {
      return HttpResponse.json(
        { message: "주문을 찾을 수 없습니다." },
        { status: 404 },
      )
    }

    return HttpResponse.json(order)
  }),
]
