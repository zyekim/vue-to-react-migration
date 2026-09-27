import { Button } from "@/shared/ui/button"
import { Link } from "react-router-dom"

export function SetupPage() {
  return (
    <main className="bg-background text-foreground grid min-h-svh place-items-center p-6">
      <section className="space-y-4 text-center">
        <p className="text-muted-foreground text-sm font-medium">
          Independent React practice project
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">React Ops Lab</h1>
        <Button type="button">Foundation ready</Button>
        <Link
          className="text-muted-foreground block text-sm underline"
          to="/lessons"
        >
          React fundamentals 보기
        </Link>
      </section>
    </main>
  )
}
