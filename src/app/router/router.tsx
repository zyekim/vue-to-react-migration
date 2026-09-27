import { createBrowserRouter, type RouteObject } from "react-router-dom"

import { MyPage } from "@/pages/my-page/my-page"
import { FundamentalsPage } from "@/pages/lessons/fundamentals-page"
import { OrdersPage } from "@/pages/orders/orders-page"
import { SetupPage } from "@/pages/setup-page"
import { DefaultLayout } from "@/app/layout/default-layout"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <SetupPage />,
  },
  {
    path: "/my-page",
    element: <MyPage />,
  },
  {
    path: "/lessons",
    element: <FundamentalsPage />,
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/orders",
        element: <OrdersPage />,
      },
    ],
  },
]

export const router = createBrowserRouter(routes)
