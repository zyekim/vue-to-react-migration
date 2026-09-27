import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { describe, expect, it } from "vitest"

import { SetupPage } from "@/pages/setup-page"

describe("SetupPage", () => {
  it("renders the verified foundation state", () => {
    render(
      <MemoryRouter>
        <SetupPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("heading", { name: "React Ops Lab" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Foundation ready" }),
    ).toBeEnabled()
    expect(
      screen.getByRole("link", { name: "React fundamentals 보기" }),
    ).toHaveAttribute("href", "/lessons")
  })
})
