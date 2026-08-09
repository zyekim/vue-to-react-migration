import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { SetupPage } from "@/pages/setup-page"

describe("SetupPage", () => {
  it("renders the verified foundation state", () => {
    render(<SetupPage />)

    expect(
      screen.getByRole("heading", { name: "React Ops Lab" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Foundation ready" }),
    ).toBeEnabled()
  })
})
