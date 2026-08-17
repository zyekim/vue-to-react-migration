import { type FormEvent, useEffect, useState } from "react"

import { getOrderDetail, getOrders } from "@/features/orders/api/orders-api"
import { OrderDetailTable } from "@/features/orders/components/order-detail-table"
import { OrderListTable } from "@/features/orders/components/order-list-table"
import type {
  OrderDetail,
  OrderStatus,
  PaginatedOrdersResponse,
} from "@/features/orders/model/order"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { Spinner } from "@/shared/ui/spinner"

const PAGE_SIZE = 5

type RequestStatus = "idle" | "loading" | "success" | "error"
type StatusFilter = OrderStatus | "all"

interface AppliedFilters {
  keyword: string
  status?: OrderStatus
}

const statusOptions: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "전체 상태" },
  { value: "pending", label: "결제 대기" },
  { value: "paid", label: "결제 완료" },
  { value: "preparing", label: "상품 준비" },
  { value: "shipped", label: "배송 완료" },
  { value: "cancelled", label: "주문 취소" },
]

export function OrdersPage() {
  const [draftKeyword, setDraftKeyword] = useState("")
  const [draftStatus, setDraftStatus] = useState<StatusFilter>("all")
  const [filters, setFilters] = useState<AppliedFilters>({ keyword: "" })
  const [page, setPage] = useState(1)
  const [reloadKey, setReloadKey] = useState(0)
  const [orders, setOrders] = useState<PaginatedOrdersResponse | null>(null)
  const [listStatus, setListStatus] = useState<RequestStatus>("loading")
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null)
  const [detailStatus, setDetailStatus] = useState<RequestStatus>("idle")

  useEffect(() => {
    let ignore = false

    void getOrders({
      ...filters,
      page,
      pageSize: PAGE_SIZE,
    })
      .then((response) => {
        if (ignore) return

        const firstOrderId = response.items[0]?.orderId ?? null

        setOrders(response)
        setOrderDetail(null)
        setDetailStatus(firstOrderId ? "loading" : "idle")
        setSelectedOrderId(firstOrderId)
        setListStatus("success")
      })
      .catch(() => {
        if (ignore) return

        setOrders(null)
        setSelectedOrderId(null)
        setListStatus("error")
      })

    return () => {
      ignore = true
    }
  }, [filters, page, reloadKey])

  useEffect(() => {
    if (!selectedOrderId) return

    let ignore = false

    void getOrderDetail(selectedOrderId)
      .then((response) => {
        if (ignore) return

        setOrderDetail(response)
        setDetailStatus("success")
      })
      .catch(() => {
        if (ignore) return

        setOrderDetail(null)
        setDetailStatus("error")
      })

    return () => {
      ignore = true
    }
  }, [selectedOrderId])

  const totalPages = orders ? Math.ceil(orders.total / PAGE_SIZE) : 0

  const prepareListRequest = () => {
    setListStatus("loading")
    setOrders(null)
    setSelectedOrderId(null)
    setOrderDetail(null)
    setDetailStatus("idle")
  }

  const selectOrder = (orderId: string) => {
    if (orderId === selectedOrderId) return

    setOrderDetail(null)
    setDetailStatus("loading")
    setSelectedOrderId(orderId)
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    prepareListRequest()
    setPage(1)
    setFilters({
      keyword: draftKeyword.trim(),
      status: draftStatus === "all" ? undefined : draftStatus,
    })
  }

  const moveToPage = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === page) return
    prepareListRequest()
    setPage(nextPage)
  }

  const retryList = () => {
    prepareListRequest()
    setReloadKey((key) => key + 1)
  }

  return (
    <section className="mx-auto w-full max-w-7xl space-y-6">
      <header>
        <p className="text-muted-foreground text-sm font-medium">Orders</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          주문 목록
        </h1>
      </header>

      <form
        className="flex flex-col gap-2 rounded-xl border bg-white p-4 shadow-sm sm:flex-row"
        onSubmit={handleSearch}
      >
        <label className="sr-only" htmlFor="order-keyword">
          주문 검색
        </label>
        <Input
          id="order-keyword"
          value={draftKeyword}
          placeholder="주문번호 또는 고객명"
          className="sm:max-w-sm"
          onChange={(event) => setDraftKeyword(event.target.value)}
        />
        <Select
          value={draftStatus}
          onValueChange={(value) => setDraftStatus(value as StatusFilter)}
        >
          <SelectTrigger aria-label="주문 상태" className="w-full sm:w-40">
            <SelectValue>
              {
                statusOptions.find((option) => option.value === draftStatus)
                  ?.label
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit">검색</Button>
      </form>

      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">주문 조회 결과</h2>
          {orders && (
            <span className="text-muted-foreground text-sm">
              총 {orders.total}건
            </span>
          )}
        </div>

        {listStatus === "loading" && (
          <LoadingState label="주문 목록을 불러오는 중입니다." />
        )}

        {listStatus === "error" && (
          <Alert variant="destructive">
            <AlertTitle>주문 목록을 불러오지 못했습니다.</AlertTitle>
            <AlertDescription>
              잠시 후 다시 시도해주세요.
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="ml-3"
                onClick={retryList}
              >
                다시 시도
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {listStatus === "success" && orders?.items.length === 0 && (
          <EmptyState message="조회된 주문이 없습니다." />
        )}

        {listStatus === "success" && orders && orders.items.length > 0 && (
          <>
            <OrderListTable
              orders={orders.items}
              selectedOrderId={selectedOrderId}
              onSelect={selectOrder}
            />

            <Pagination className="mt-5">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={`?page=${page - 1}`}
                    text="이전"
                    aria-disabled={page === 1}
                    tabIndex={page === 1 ? -1 : undefined}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                    onClick={(event) => {
                      event.preventDefault()
                      moveToPage(page - 1)
                    }}
                  />
                </PaginationItem>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1,
                ).map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`?page=${pageNumber}`}
                      aria-label={`${pageNumber}페이지`}
                      isActive={pageNumber === page}
                      onClick={(event) => {
                        event.preventDefault()
                        moveToPage(pageNumber)
                      }}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href={`?page=${page + 1}`}
                    text="다음"
                    aria-disabled={page === totalPages}
                    tabIndex={page === totalPages ? -1 : undefined}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                    onClick={(event) => {
                      event.preventDefault()
                      moveToPage(page + 1)
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </section>

      <section className="rounded-xl border bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">주문 상품 상세</h2>

        {detailStatus === "loading" && (
          <LoadingState label="주문 상세를 불러오는 중입니다." />
        )}
        {detailStatus === "error" && (
          <Alert variant="destructive">
            <AlertTitle>주문 상세를 불러오지 못했습니다.</AlertTitle>
          </Alert>
        )}
        {detailStatus === "success" && orderDetail && (
          <OrderDetailTable order={orderDetail} />
        )}
        {detailStatus === "idle" && (
          <EmptyState message="선택된 주문이 없습니다." />
        )}
      </section>
    </section>
  )
}

function LoadingState({ label }: { label: string }) {
  return (
    <div role="status" className="flex h-32 items-center justify-center gap-2">
      <Spinner />
      <span className="text-muted-foreground text-sm">{label}</span>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-muted-foreground flex h-32 items-center justify-center text-sm">
      {message}
    </div>
  )
}
