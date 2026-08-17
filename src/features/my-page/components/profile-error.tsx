import { TriangleAlert } from "lucide-react"

import { Button } from "@/shared/ui/button"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/shared/ui/alert"

interface ProfileErrorProps {
  message: string
  onRetry: () => void
}

export function ProfileError({ message, onRetry }: ProfileErrorProps) {
  return (
    <Alert variant="destructive" className="mx-auto max-w-2xl">
      <TriangleAlert aria-hidden="true" />
      <AlertTitle>정보를 표시할 수 없습니다</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      <AlertAction>
        <Button type="button" variant="outline" size="sm" onClick={onRetry}>
          다시 시도
        </Button>
      </AlertAction>
    </Alert>
  )
}
