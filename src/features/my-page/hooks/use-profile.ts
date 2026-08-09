import { useCallback, useEffect, useState } from "react"

import { getProfile } from "../api/get-profile"
import type { ProfileOverview } from "../model/profile"

export type ProfileQuery = typeof getProfile

export function useProfile(query: ProfileQuery = getProfile) {
  const [data, setData] = useState<ProfileOverview | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [requestVersion, setRequestVersion] = useState(0)

  useEffect(() => {
    let isCurrent = true

    query()
      .then((profile) => {
        if (!isCurrent) return
        setData(profile)
        setError(null)
      })
      .catch(() => {
        if (!isCurrent) return
        setError("프로필을 불러오지 못했습니다.")
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false)
      })

    return () => {
      isCurrent = false
    }
  }, [query, requestVersion])

  const retry = useCallback(() => {
    setIsLoading(true)
    setError(null)
    setRequestVersion((version) => version + 1)
  }, [])

  return { data, error, isLoading, retry }
}
