import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { describe, expect, it } from "vitest"

import { server } from "@/mocks/server"

import { OrdersPage } from "./orders-page"

describe("OrdersPage", () => {
  it("selects the first order and shows its detail on initial load", async () => {
    render(<OrdersPage />)

    expect(await screen.findByText("ORD-20260817-001")).toBeInTheDocument()
    expect(await screen.findByText("Orbit 기계식 키보드")).toBeInTheDocument()
    expect(screen.getByText("Cloud 데스크 매트")).toBeInTheDocument()
  })

  it("shows the selected row detail", async () => {
    const user = userEvent.setup()
    render(<OrdersPage />)

    await user.click(await screen.findByText("ORD-20260817-002"))

    expect(await screen.findByText("Nova 무선 마우스")).toBeInTheDocument()
    expect(screen.queryByText("Orbit 기계식 키보드")).not.toBeInTheDocument()
  })

  it("selects the first result after searching", async () => {
    const user = userEvent.setup()
    render(<OrdersPage />)

    await user.click(await screen.findByText("ORD-20260817-002"))
    expect(await screen.findByText("Nova 무선 마우스")).toBeInTheDocument()

    await user.type(screen.getByLabelText("주문 검색"), "김민준")
    await user.click(screen.getByRole("button", { name: "검색" }))

    expect(await screen.findByText("Orbit 기계식 키보드")).toBeInTheDocument()
    expect(screen.queryByText("Nova 무선 마우스")).not.toBeInTheDocument()
  })

  it("selects the first order on the next page", async () => {
    const user = userEvent.setup()
    render(<OrdersPage />)

    await user.click(await screen.findByRole("link", { name: "2페이지" }))

    expect(await screen.findByText("ORD-20260816-006")).toBeInTheDocument()
    expect(await screen.findByText("Loop 오피스 체어")).toBeInTheDocument()
  })

  it("clears the detail when search has no results", async () => {
    const user = userEvent.setup()
    render(<OrdersPage />)

    await screen.findByText("Orbit 기계식 키보드")
    await user.type(screen.getByLabelText("주문 검색"), "없는 주문")
    await user.click(screen.getByRole("button", { name: "검색" }))

    expect(
      await screen.findByText("조회된 주문이 없습니다."),
    ).toBeInTheDocument()
    expect(screen.getByText("선택된 주문이 없습니다.")).toBeInTheDocument()
  })

  it("shows a list error and retries", async () => {
    const user = userEvent.setup()
    server.use(
      http.get(
        "/api/orders",
        () =>
          HttpResponse.json(
            { message: "주문 목록을 불러오지 못했습니다." },
            { status: 500 },
          ),
        { once: true },
      ),
    )

    render(<OrdersPage />)

    const alert = await screen.findByRole("alert")
    expect(alert).toHaveTextContent("주문 목록을 불러오지 못했습니다.")

    await user.click(within(alert).getByRole("button", { name: "다시 시도" }))

    expect(await screen.findByText("ORD-20260817-001")).toBeInTheDocument()
  })
})
