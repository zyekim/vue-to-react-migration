import type { ProfileOverview } from "../model/profile"

interface GetProfileOptions {
  delay?: number
  shouldFail?: boolean
}

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
    taxInvoiceEmail: "tax@orbitdesk.dev",
    shopUrl: "https://orbitdesk.dev",
  },
}

export function getProfile({
  delay = 600,
  shouldFail = false,
}: GetProfileOptions = {}): Promise<ProfileOverview> {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (shouldFail) {
        reject(new Error("프로필을 불러오지 못했습니다."))
        return
      }

      resolve(profileOverview)
    }, delay)
  })
}
