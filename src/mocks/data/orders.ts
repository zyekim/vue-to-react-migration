import type { OrderDetail, OrderItem } from "@/features/orders/model/order"

function orderItem(
  productCode: string,
  productName: string,
  option: string,
  quantity: number,
  unitPrice: number,
): OrderItem {
  return {
    productCode,
    productName,
    option,
    quantity,
    unitPrice,
    lineTotal: quantity * unitPrice,
  }
}

function order(
  orderId: string,
  orderedAt: string,
  customerName: string,
  status: OrderDetail["status"],
  items: OrderItem[],
): OrderDetail {
  return {
    orderId,
    orderedAt,
    customerName,
    status,
    itemCount: items.length,
    totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: items.reduce((sum, item) => sum + item.lineTotal, 0),
    items,
  }
}

export const mockOrders: OrderDetail[] = [
  order("ORD-20260817-001", "2026-08-17T09:20:00+09:00", "김민준", "shipped", [
    orderItem("KEY-001", "Orbit 기계식 키보드", "화이트 / 적축", 1, 69000),
    orderItem("PAD-001", "Cloud 데스크 매트", "미드나이트", 1, 20000),
  ]),
  order("ORD-20260817-002", "2026-08-17T10:05:00+09:00", "이서연", "paid", [
    orderItem("MOU-002", "Nova 무선 마우스", "실버", 2, 42000),
  ]),
  order(
    "ORD-20260817-003",
    "2026-08-17T10:42:00+09:00",
    "박지훈",
    "preparing",
    [orderItem("HUB-003", "Link USB-C 허브", "7 in 1", 1, 58000)],
  ),
  order("ORD-20260817-004", "2026-08-17T11:18:00+09:00", "최유진", "pending", [
    orderItem("STD-001", "Arc 노트북 스탠드", "그레이", 1, 49000),
  ]),
  order(
    "ORD-20260817-005",
    "2026-08-17T11:55:00+09:00",
    "정하늘",
    "cancelled",
    [orderItem("CAB-004", "Flow 충전 케이블", "2m", 2, 15000)],
  ),
  order("ORD-20260816-006", "2026-08-16T15:10:00+09:00", "오지민", "shipped", [
    orderItem("CHR-001", "Loop 오피스 체어", "블랙", 1, 289000),
  ]),
  order("ORD-20260816-007", "2026-08-16T14:36:00+09:00", "한도윤", "paid", [
    orderItem("LMP-002", "Glow 모니터 램프", "블랙", 1, 79000),
  ]),
  order(
    "ORD-20260816-008",
    "2026-08-16T13:02:00+09:00",
    "윤서아",
    "preparing",
    [orderItem("MIC-001", "Wave USB 마이크", "차콜", 1, 119000)],
  ),
  order("ORD-20260815-009", "2026-08-15T17:25:00+09:00", "임현우", "pending", [
    orderItem("ARM-001", "Pivot 모니터 암", "싱글", 2, 89000),
  ]),
  order("ORD-20260815-010", "2026-08-15T12:40:00+09:00", "강수빈", "shipped", [
    orderItem("CAM-002", "Frame 웹캠", "2K", 1, 99000),
  ]),
  order("ORD-20260814-011", "2026-08-14T16:15:00+09:00", "송재민", "paid", [
    orderItem("SPK-001", "Echo 데스크 스피커", "오프화이트", 1, 149000),
  ]),
  order(
    "ORD-20260814-012",
    "2026-08-14T09:48:00+09:00",
    "배가은",
    "cancelled",
    [orderItem("PCH-003", "Grid 케이블 파우치", "네이비", 3, 24000)],
  ),
]
