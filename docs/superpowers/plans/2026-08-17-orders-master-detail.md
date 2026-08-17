# Orders Master Detail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 주문 목록을 검색·페이지 이동하고 선택한 주문의 상품 상세를 하단에서 확인하는 화면을 만든다.

**Architecture:** `OrdersPage`가 API 요청과 화면 상태를 조정하고, 목록 및 상세 표는 표시 전용 컴포넌트로 분리한다. 기존 mock API와 shadcn UI만 사용하며 목록 응답이 바뀔 때 첫 행을 자동 선택한다.

**Tech Stack:** React 19, TypeScript, Vitest, Testing Library, MSW, shadcn/Base UI, Tailwind CSS

## Global Constraints

- 목록 페이지 크기는 5건이다.
- 최초 조회, 검색, 페이지 이동 후 응답의 첫 행을 자동 선택한다.
- 새 상태 관리 또는 서버 상태 라이브러리를 추가하지 않는다.
- 히스토리, 정렬, 주문 수정, URL 검색 조건 동기화는 제외한다.

---

### Task 1: 주문 목록과 자동 상세 선택

**Files:**
- Create: `src/features/orders/components/order-list-table.tsx`
- Create: `src/features/orders/components/order-detail-table.tsx`
- Modify: `src/pages/orders/orders-page.tsx`
- Test: `src/pages/orders/orders-page.test.tsx`

**Interfaces:**
- Consumes: `getOrders(params)`, `getOrderDetail(orderId)`, `OrderSummary`, `OrderDetail`
- Produces: `OrderListTable({ orders, selectedOrderId, onSelect })`, `OrderDetailTable({ order })`

- [ ] **Step 1: Write the failing initial-selection test**

```tsx
render(<OrdersPage />)
expect(await screen.findByText("ORD-20260817-001")).toBeInTheDocument()
expect(await screen.findByText("Orbit 기계식 키보드")).toBeInTheDocument()
```

- [ ] **Step 2: Run the focused test and verify RED**

Run: `npm test -- src/pages/orders/orders-page.test.tsx`
Expected: FAIL because the order table and detail do not exist.

- [ ] **Step 3: Implement minimal master-detail tables**

Use `useEffect` to fetch page 1 with page size 5, select `items[0]?.orderId`, then fetch its detail. Render semantic shadcn tables and mark the selected row with `aria-selected`.

- [ ] **Step 4: Run the focused test and verify GREEN**

Run: `npm test -- src/pages/orders/orders-page.test.tsx`
Expected: PASS.

### Task 2: 검색, 행 선택, 페이지네이션과 상태 처리

**Files:**
- Modify: `src/pages/orders/orders-page.tsx`
- Modify: `src/features/orders/components/order-list-table.tsx`
- Modify: `src/features/orders/components/order-detail-table.tsx`
- Modify: `src/pages/orders/orders-page.test.tsx`
- Modify: `src/shared/ui/pagination.tsx`

**Interfaces:**
- Consumes: Task 1 components and `GetOrdersParams`
- Produces: keyword/status search form, page buttons, retry actions, loading/error/empty states

- [ ] **Step 1: Write failing interaction tests**

```tsx
await user.type(screen.getByLabelText("주문 검색"), "김민준")
await user.click(screen.getByRole("button", { name: "검색" }))
expect(await screen.findByText("Orbit 기계식 키보드")).toBeInTheDocument()

await user.click(screen.getByRole("link", { name: "2페이지" }))
expect(await screen.findByText("Loop 오피스 체어")).toBeInTheDocument()
```

Add separate assertions for row selection, empty results, and list retry.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- src/pages/orders/orders-page.test.tsx`
Expected: FAIL on missing search, pagination, and states.

- [ ] **Step 3: Implement minimal interactions and request states**

Keep draft and applied filters separate. Reset page to 1 on search. Compute `Math.ceil(total / pageSize)`. Prevent disabled previous/next navigation. Ignore stale effect responses after cleanup.

- [ ] **Step 4: Run focused and full verification**

Run: `npm test -- src/pages/orders/orders-page.test.tsx && npm test -- --run && npm run typecheck && npm run lint && npm run build`
Expected: all commands exit 0.

- [ ] **Step 5: Commit and push**

```bash
git add src/features/orders src/pages/orders src/shared/ui/pagination.tsx src/mocks public/mockServiceWorker.js eslint.config.js
git commit -m "feat: 주문 목록 상세 테이블 추가"
git push -u origin lab/order
```
