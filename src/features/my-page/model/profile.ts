export interface Profile {
  name: string
  email: string
  role: string
  team: string
  organization: string
  status: "active"
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
