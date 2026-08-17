import { describe, expect, it } from "vitest"

import { getProfile } from "../api/get-profile"

describe("getProfile", () => {
  it("returns a fictional profile", async () => {
    await expect(getProfile({ delay: 0 })).resolves.toMatchObject({
      profile: {
        name: "Alex Kim",
        organization: "Orbit Desk",
      },
    })
  })

  it("rejects when failure is requested", async () => {
    await expect(getProfile({ delay: 0, shouldFail: true })).rejects.toThrow(
      "프로필을 불러오지 못했습니다.",
    )
  })
})
