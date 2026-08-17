import { Building2, BriefcaseBusiness, Mail, Users } from "lucide-react"
import type { Profile, Bp } from "../model/profile"
import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { Badge } from "@/shared/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card"
import { BPDialog } from "./bp-dialog"
import { ProfileEditDialog } from "./profile-edit-dialog"
import { PwdChangeDialog } from "./pwd-change-dialog"

interface ProfileCardProps {
  profile: Profile
  bp: Bp
  editProfile: (profile: Profile) => void
}

const profileDetails = [
  { key: "email", label: "이메일", icon: Mail },
  { key: "role", label: "역할", icon: BriefcaseBusiness },
  { key: "team", label: "팀", icon: Users },
  { key: "organization", label: "조직", icon: Building2 },
] as const

export function ProfileCard({ profile, bp, editProfile }: ProfileCardProps) {
  return (
    <Card className="h-full shadow-sm">
      <CardHeader className="border-b">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar className="size-16" aria-label={`${profile.name} 아바타`}>
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              {profile.initials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-xl font-semibold tracking-tight">
                {profile.name}
              </p>
              <Badge variant="secondary">활성</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <CardTitle>
            <h2>프로필 정보</h2>
          </CardTitle>
          <div className="flex items-center gap-1">
            <ProfileEditDialog profile={profile} onSave={editProfile} />
            <PwdChangeDialog></PwdChangeDialog>
          </div>
        </div>
        <CardDescription className="mt-1">
          Orbit Desk에서 사용하는 기본 계정 정보입니다.
        </CardDescription>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2">
          {profileDetails.map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex gap-3">
              <span className="bg-muted text-muted-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                <Icon className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <dt className="text-muted-foreground text-xs font-medium">
                  {label}
                </dt>

                <dd className="mt-1 flex items-center gap-1 truncate font-medium">
                  <span className="mr-1">{profile[key]}</span>
                  {key === "organization" && <BPDialog bpInfo={bp}></BPDialog>}
                </dd>
              </div>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
