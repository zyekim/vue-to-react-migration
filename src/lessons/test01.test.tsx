import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { ProductCounter } from "@/lessons/test01"

describe("ProductCounter", () => {
  it("수량에 따라 총 금액을 계산하고 최소 수량을 1로 유지한다", async () => {
    const user = userEvent.setup()

    render(<ProductCounter />)

    expect(screen.getByText("총 금액: 12,000")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "수량 감소" }))
    expect(screen.getByText("수량: 1")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "수량 증가" }))
    expect(screen.getByText("수량: 2")).toBeInTheDocument()
    expect(screen.getByText("총 금액: 24,000")).toBeInTheDocument()
  })
})
