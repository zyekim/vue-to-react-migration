import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { ProfileEditDialog } from "../components/profile-edit-dialog"
import type { Profile } from "../model/profile"

const profile: Profile = {
  name: "Alex Kim",
  email: "alex@orbitdesk.dev",
  role: "Product Designer",
  roleCode: "PD",
  team: "Workspace Experience",
  teamCode: "WE",
  organization: "Orbit Desk",
  status: "active",
  initials: "AK",
}

describe("ProfileEditDialog", () => {
  it("disables saving and shows an error when the email is invalid", async () => {
    const user = userEvent.setup()

    render(<ProfileEditDialog profile={profile} onSave={() => undefined} />)

    await user.click(screen.getByText("기본정보 수정"))

    const emailInput = screen.getByPlaceholderText("이메일")
    const saveButton = screen.getByRole("button", { name: "저장" })

    expect(saveButton).toBeEnabled()

    await user.clear(emailInput)

    expect(screen.getByText("이메일을 입력해주세요.")).toBeInTheDocument()
    expect(emailInput).toHaveAttribute("aria-invalid", "true")
    expect(saveButton).toBeDisabled()

    await user.type(emailInput, "invalid-email")

    expect(
      screen.getByText("이메일 형식이 올바르지 않습니다."),
    ).toBeInTheDocument()
    expect(saveButton).toBeDisabled()

    await user.clear(emailInput)
    await user.type(emailInput, "new@orbitdesk.dev")

    expect(
      screen.queryByText("이메일 형식이 올바르지 않습니다."),
    ).not.toBeInTheDocument()
    expect(saveButton).toBeEnabled()
  })
})
