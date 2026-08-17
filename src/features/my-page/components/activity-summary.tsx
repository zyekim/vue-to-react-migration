import { CalendarDays, CircleCheckBig, FolderKanban } from "lucide-react"

import type { ActivitySummary as ActivitySummaryModel } from "../model/profile"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"

interface ActivitySummaryProps {
  activity: ActivitySummaryModel
}

export function ActivitySummary({ activity }: ActivitySummaryProps) {
  const metrics = [
    {
      label: "진행 프로젝트",
      value: `${activity.projects}개`,
      icon: FolderKanban,
    },
    {
      label: "완료한 작업",
      value: `${activity.tasksCompleted}개`,
      icon: CircleCheckBig,
    },
    {
      label: "활동 일수",
      value: `${activity.activeDays}일`,
      icon: CalendarDays,
    },
  ]

  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b">
        <CardTitle>
          <h2>활동 요약</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="divide-y">
          {metrics.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <Icon
                  className="text-muted-foreground size-4"
                  aria-hidden="true"
                />
                <dt className="text-muted-foreground text-sm">{label}</dt>
              </div>
              <dd className="font-semibold tabular-nums">{value}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}
