import { PackageSearch } from "lucide-react"
import { Link, NavLink, Outlet } from "react-router-dom"

import { Avatar, AvatarFallback } from "@/shared/ui/avatar"
import { cn } from "@/shared/lib/utils"

export function DefaultLayout() {
  return (
    <div className="bg-muted/30 min-h-svh md:grid md:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="bg-background border-b md:sticky md:top-0 md:h-svh md:border-r md:border-b-0">
        <div className="flex h-full flex-col gap-6 p-4">
          <Link to="/orders" className="px-2 text-lg font-semibold">
            Orbit Desk
          </Link>

          <nav aria-label="주요 메뉴" className="flex-1">
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                cn(
                  "text-muted-foreground hover:bg-muted hover:text-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium",
                  isActive && "bg-muted text-foreground",
                )
              }
            >
              <PackageSearch className="size-4" aria-hidden="true" />
              주문 목록
            </NavLink>
          </nav>

          <Link
            to="/my-page"
            aria-label="Alex Kim 내 정보 보기"
            className="hover:bg-muted flex items-center gap-3 rounded-lg p-2"
          >
            <Avatar>
              <AvatarFallback>AK</AvatarFallback>
            </Avatar>
            <div className="min-w-0 text-sm">
              <p className="truncate font-medium">Alex Kim</p>
              <p className="text-muted-foreground truncate text-xs">
                alex@orbitdesk.dev
              </p>
            </div>
          </Link>
        </div>
      </aside>

      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  )
}
