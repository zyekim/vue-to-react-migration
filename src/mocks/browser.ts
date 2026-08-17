import { setupWorker } from "msw/browser"

import { ordersHandlers } from "./handlers/orders"

export const worker = setupWorker(...ordersHandlers)
