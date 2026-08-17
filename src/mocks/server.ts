import { setupServer } from "msw/node"

import { ordersHandlers } from "./handlers/orders"

export const server = setupServer(...ordersHandlers)
