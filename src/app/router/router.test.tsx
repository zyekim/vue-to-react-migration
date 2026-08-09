import { render, screen } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router-dom"
import { describe, expect, it } from "vitest"

import { routes } from "./router"

describe("app router", () => {
  it("renders My Page at /my-page", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/my-page"],
    })

    render(<RouterProvider router={router} />)

    expect(screen.getByRole("heading", { name: "My Page" })).toBeInTheDocument()
  })
})
