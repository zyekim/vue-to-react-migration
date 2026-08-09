import { createBrowserRouter, type RouteObject } from "react-router-dom"

import { MyPage } from "@/pages/my-page/my-page"
import { SetupPage } from "@/pages/setup-page"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <SetupPage />,
  },
  {
    path: "/my-page",
    element: <MyPage />,
  },
]

export const router = createBrowserRouter(routes)
