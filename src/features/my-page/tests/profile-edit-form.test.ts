import { describe, expect, it } from "vitest"

import {
  validateProfileEditForm,
  type ProfileEditFormValues,
} from "../model/profile-edit-form"

const validValues: ProfileEditFormValues = {
  name: "Alex Kim",
  email: "alex@orbitdesk.dev",
  teamCode: "WE",
  roleCode: "PD",
}

describe("validateProfileEditForm", () => {
  it("returns required errors when fields are empty", () => {
    expect(
      validateProfileEditForm({
        name: " ",
        email: "",
        teamCode: "",
        roleCode: "",
      }),
    ).toEqual({
      name: "이름을 입력해주세요.",
      email: "이메일을 입력해주세요.",
      teamCode: "팀을 선택해주세요.",
      roleCode: "역할을 선택해주세요.",
    })
  })

  it("returns an email format error for an invalid email", () => {
    expect(
      validateProfileEditForm({
        ...validValues,
        email: "invalid-email",
      }),
    ).toEqual({
      email: "이메일 형식이 올바르지 않습니다.",
    })
  })

  it("returns no errors for valid values", () => {
    expect(validateProfileEditForm(validValues)).toEqual({})
  })
})
