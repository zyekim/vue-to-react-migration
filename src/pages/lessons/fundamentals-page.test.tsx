import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import { FundamentalsPage } from "./fundamentals-page"

describe("FundamentalsPage", () => {
  it("switches between lessons and runs the controlled search example", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <FundamentalsPage />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole("button", { name: /DAY 04/ }))
    await user.type(
      screen.getByRole("textbox", { name: "상품명 검색" }),
      "mouse",
    )

    expect(screen.getByText("Mouse")).toBeInTheDocument()
    expect(screen.queryByText("Keyboard")).not.toBeInTheDocument()
  })

  it("composes an accessible confirmation dialog with children", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter>
        <FundamentalsPage />
      </MemoryRouter>,
    )

    await user.click(screen.getByRole("button", { name: /DAY 07/ }))
    await user.click(screen.getByRole("button", { name: "삭제하기" }))

    expect(
      screen.getByRole("alertdialog", { name: "삭제 확인" }),
    ).toHaveTextContent("가상 항목을 삭제할까요?")

    await user.click(screen.getByRole("button", { name: "확인" }))

    expect(screen.getByRole("status")).toHaveTextContent(
      "삭제 요청을 확인했습니다.",
    )
  })
})
