import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { MyPageView } from "../components/my-page-view"
import type { ProfileOverview } from "../model/profile"

const profileOverview: ProfileOverview = {
  profile: {
    name: "Alex Kim",
    email: "alex@orbitdesk.dev",
    role: "Product Designer",
    team: "Workspace Experience",
    organization: "Orbit Desk",
    status: "active",
    initials: "AK",
  },
  activity: {
    projects: 12,
    tasksCompleted: 48,
    activeDays: 24,
  },
  bp: {
    code: "P02309",
    name: "orbitDesk",
    representativeName: "JiHye Kim",
    registration: "000-00-00000",
    contactNo: "000-0000-0000",
    cellPhone: "010-5791-2606",
    taxInvoiceEmail: "[EMAIL_ADDRESS]",
    shopUrl: "https://orbitdesk.dev",
  },
}

describe("MyPageView", () => {
  it("shows loading before rendering the profile", async () => {
    let resolveQuery: (value: ProfileOverview) => void = () => undefined
    const query = () =>
      new Promise<ProfileOverview>((resolve) => {
        resolveQuery = resolve
      })

    render(<MyPageView query={query} />)

    expect(screen.getByRole("status")).toHaveTextContent(
      "프로필을 불러오는 중입니다.",
    )

    await act(async () => {
      resolveQuery(profileOverview)
    })

    expect(await screen.findByText("Alex Kim")).toBeInTheDocument()
    expect(screen.getByText("alex@orbitdesk.dev")).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "프로필 정보" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", { name: "활동 요약" }),
    ).toBeInTheDocument()
    expect(screen.getByText("Product Designer")).toBeInTheDocument()
    expect(screen.getByText("Workspace Experience")).toBeInTheDocument()
    expect(screen.getByText("활성")).toBeInTheDocument()
    expect(screen.getByText("진행 프로젝트")).toBeInTheDocument()
    expect(screen.getByText("완료한 작업")).toBeInTheDocument()
    expect(screen.getByText("활동 일수")).toBeInTheDocument()
    expect(screen.getByText("12개")).toBeInTheDocument()
  })

  it("shows an error and retries the query", async () => {
    const user = userEvent.setup()
    let attempts = 0
    const query = () => {
      attempts += 1
      return attempts === 1
        ? Promise.reject(new Error("network unavailable"))
        : Promise.resolve(profileOverview)
    }

    render(<MyPageView query={query} />)

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "프로필을 불러오지 못했습니다.",
    )

    await user.click(screen.getByRole("button", { name: "다시 시도" }))

    expect(await screen.findByText("Alex Kim")).toBeInTheDocument()
    expect(attempts).toBe(2)
  })
})
