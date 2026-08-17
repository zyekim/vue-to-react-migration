export interface Profile {
  name: string
  email: string
  role: string
  roleCode: string
  team: string
  teamCode: string
  organization: string
  status: "active" | "inactive"
  initials: string
}

export interface ActivitySummary {
  projects: number
  tasksCompleted: number
  activeDays: number
}

export interface Bp {
  code: string
  name: string
  representativeName: string
  registration: string
  contactNo: string
  cellPhone: string
  taxInvoiceEmail: string
  shopUrl: string
}

export interface ProfileOverview {
  profile: Profile
  activity: ActivitySummary
  bp: Bp
}

export interface CommonCode {
  code: string
  name: string
}
