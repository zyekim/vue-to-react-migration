import { useState } from "react"
import type { Profile } from "../model/profile"
import { ActivitySummary } from "./activity-summary"
import { ProfileCard } from "./profile-card"
import { ProfileError } from "./profile-error"
import { ProfileLoading } from "./profile-loading"
import type { ProfileQuery } from "../hooks/use-profile"
import { useProfile } from "../hooks/use-profile"

interface MyPageViewProps {
  query?: ProfileQuery
}

export function MyPageView({ query }: MyPageViewProps) {
  const { data, error, isLoading, retry } = useProfile(query)
  const [editedProfile, setEditedProfile] = useState<Profile | null>(null)

  return (
    <main className="bg-muted/35 min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-8">
          <p className="text-muted-foreground text-sm font-medium">
            Orbit Desk
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            My Page
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl text-sm">
            계정 정보와 최근 활동을 한눈에 확인하세요.
          </p>
        </header>

        {isLoading ? <ProfileLoading /> : null}
        {!isLoading && error ? (
          <ProfileError message={error} onRetry={retry} />
        ) : null}
        {!isLoading && !error && data ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
            <ProfileCard
              profile={editedProfile ?? data?.profile}
              bp={data.bp}
              editProfile={setEditedProfile}
            />
            <ActivitySummary activity={data.activity} />
          </div>
        ) : null}
      </div>
    </main>
  )
}
