import type {
  GetOrdersParams,
  OrderDetail,
  PaginatedOrdersResponse,
} from "../model/order"

export class ApiError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.name = "ApiError"
    this.status = status
  }
}

function apiUrl(path: string) {
  return new URL(path, window.location.origin)
}

async function request<T>(url: URL): Promise<T> {
  const response = await fetch(url)
  const body: unknown = await response.json()

  if (!response.ok) {
    const message =
      typeof body === "object" &&
      body !== null &&
      "message" in body &&
      typeof body.message === "string"
        ? body.message
        : "요청을 처리하지 못했습니다."

    throw new ApiError(response.status, message)
  }

  return body as T
}

export function getOrders(
  params: GetOrdersParams = {},
): Promise<PaginatedOrdersResponse> {
  const url = apiUrl("/api/orders")

  if (params.keyword) url.searchParams.set("keyword", params.keyword)
  if (params.status) url.searchParams.set("status", params.status)
  if (params.page) url.searchParams.set("page", String(params.page))
  if (params.pageSize) url.searchParams.set("pageSize", String(params.pageSize))

  return request<PaginatedOrdersResponse>(url)
}

export function getOrderDetail(orderId: string): Promise<OrderDetail> {
  return request<OrderDetail>(apiUrl(`/api/orders/${orderId}`))
}
