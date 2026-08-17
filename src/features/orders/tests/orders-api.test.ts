import { describe, expect, it } from "vitest"

import { getOrderDetail, getOrders, ApiError } from "../api/orders-api"

describe("orders api", () => {
  it("returns the first page of orders with default pagination", async () => {
    const result = await getOrders()

    expect(result.total).toBe(12)
    expect(result.page).toBe(1)
    expect(result.pageSize).toBe(10)
    expect(result.items).toHaveLength(10)
    expect(result.items[0]?.orderId).toBe("ORD-20260817-001")
  })

  it("filters orders and applies pagination", async () => {
    const result = await getOrders({
      keyword: "김민준",
      status: "shipped",
      page: 1,
      pageSize: 5,
    })

    expect(result.total).toBe(1)
    expect(result.items.map((order) => order.orderId)).toEqual([
      "ORD-20260817-001",
    ])
  })

  it("returns an order detail with line items", async () => {
    const result = await getOrderDetail("ORD-20260817-001")

    expect(result.customerName).toBe("김민준")
    expect(result.totalAmount).toBe(89000)
    expect(result.items).toHaveLength(2)
    expect(result.items[0]).toEqual({
      productCode: "KEY-001",
      productName: "Orbit 기계식 키보드",
      option: "화이트 / 적축",
      quantity: 1,
      unitPrice: 69000,
      lineTotal: 69000,
    })
  })

  it("throws ApiError when the order does not exist", async () => {
    await expect(getOrderDetail("UNKNOWN")).rejects.toMatchObject({
      name: "ApiError",
      status: 404,
      message: "주문을 찾을 수 없습니다.",
    } satisfies Partial<ApiError>)
  })
})
