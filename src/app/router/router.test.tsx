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
    expect(
      screen.queryByRole("navigation", { name: "주요 메뉴" }),
    ).not.toBeInTheDocument()
  })

  it("renders the domain layout at /orders", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/orders"],
    })

    render(<RouterProvider router={router} />)

    expect(
      screen.getByRole("heading", { name: "주문 목록" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("navigation", { name: "주요 메뉴" }),
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "주문 목록" })).toHaveAttribute(
      "aria-current",
      "page",
    )
    expect(
      screen.getByRole("link", { name: "Alex Kim 내 정보 보기" }),
    ).toHaveAttribute("href", "/my-page")
  })

  it("renders fundamentals outside the domain layout", () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ["/lessons"],
    })

    render(<RouterProvider router={router} />)

    expect(
      screen.getByRole("heading", { name: "React Fundamentals" }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("navigation", { name: "주요 메뉴" }),
    ).not.toBeInTheDocument()
  })
})
