import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react"
import { Link } from "react-router-dom"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog"

type Lesson = {
  day: number
  title: string
  vue: string
  react: string
  checkpoints: string[]
  Component: () => ReactNode
}

function NetworkStatusLesson() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <div className="flex flex-wrap items-center gap-3">
      <strong role="status" aria-live="polite">
        {isOnline ? "온라인" : "오프라인"}
      </strong>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("online"))}
      >
        online 이벤트
      </button>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("offline"))}
      >
        offline 이벤트
      </button>
    </div>
  )
}

const products = ["Laptop", "Mouse", "Keyboard", "Monitor"]

function ProductSearchLesson() {
  const [keyword, setKeyword] = useState("")
  const filteredProducts = products.filter((product) =>
    product.toLowerCase().includes(keyword.toLowerCase()),
  )

  return (
    <div className="space-y-3">
      <label className="grid gap-1">
        <span className="text-sm font-medium">상품명 검색</span>
        <input
          className="rounded-md border px-3 py-2"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </label>
      <ul className="list-disc pl-5">
        {filteredProducts.map((product) => (
          <li key={product}>{product}</li>
        ))}
      </ul>
    </div>
  )
}

type UserRole = "USER" | "ADMIN"
type PracticeUser = { id: string; name: string; role: UserRole }

function UserFormLesson() {
  const [form, setForm] = useState<{ name: string; role: UserRole }>({
    name: "",
    role: "USER",
  })
  const [users, setUsers] = useState<PracticeUser[]>([])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const name = form.name.trim()
    if (!name) return

    setUsers((current) => [
      ...current,
      { ...form, id: crypto.randomUUID(), name },
    ])
    setForm({ name: "", role: "USER" })
  }

  return (
    <div className="space-y-3">
      <form className="flex flex-wrap gap-2" onSubmit={handleSubmit}>
        <input
          aria-label="이름"
          className="rounded-md border px-3 py-2"
          value={form.name}
          onChange={(event) =>
            setForm((current) => ({ ...current, name: event.target.value }))
          }
        />
        <select
          aria-label="역할"
          className="rounded-md border px-3 py-2"
          value={form.role}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setForm((current) => ({
              ...current,
              role: event.target.value as UserRole,
            }))
          }
        >
          <option value="USER">일반 사용자</option>
          <option value="ADMIN">관리자</option>
        </select>
        <button type="submit" disabled={!form.name.trim()}>
          등록
        </button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} · {user.role === "ADMIN" ? "관리자" : "일반 사용자"}
          </li>
        ))}
      </ul>
    </div>
  )
}

type Shipment = { id: number; orderNo: string; selected: boolean }
const initialShipments: Shipment[] = [
  { id: 1, orderNo: "DEMO-001", selected: false },
  { id: 2, orderNo: "DEMO-002", selected: true },
  { id: 3, orderNo: "DEMO-003", selected: false },
]

function ShipmentSelectorLesson() {
  const [shipments, setShipments] = useState(initialShipments)
  const selectedCount = shipments.filter((item) => item.selected).length
  const checkedAll = shipments.length > 0 && selectedCount === shipments.length

  function toggle(targetId: number) {
    setShipments((items) =>
      items.map((item) =>
        item.id === targetId ? { ...item, selected: !item.selected } : item,
      ),
    )
  }

  return (
    <div className="grid gap-2">
      <label>
        <input
          type="checkbox"
          checked={checkedAll}
          onChange={(event) =>
            setShipments((items) =>
              items.map((item) => ({
                ...item,
                selected: event.target.checked,
              })),
            )
          }
        />{" "}
        전체 선택
      </label>
      <strong>선택 건수: {selectedCount}</strong>
      {shipments.map((shipment) => (
        <label key={shipment.id}>
          <input
            type="checkbox"
            checked={shipment.selected}
            onChange={() => toggle(shipment.id)}
          />{" "}
          {shipment.orderNo}
        </label>
      ))}
    </div>
  )
}

type ConfirmDialogProps = {
  open: boolean
  title: string
  children: ReactNode
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

function ConfirmDialog({
  open,
  title,
  children,
  onOpenChange,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger className="rounded-md border px-3 py-2">
        삭제하기
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{children}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function ConfirmDialogLesson() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState("")

  return (
    <div className="space-y-3">
      <ConfirmDialog
        open={open}
        title="삭제 확인"
        onOpenChange={setOpen}
        onConfirm={() => setResult("삭제 요청을 확인했습니다.")}
      >
        가상 항목을 삭제할까요?
      </ConfirmDialog>
      {result && <p role="status">{result}</p>}
    </div>
  )
}

function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return isOnline
}

function CustomHookLesson() {
  const isOnline = useNetworkStatus()

  return (
    <div className="flex items-center gap-3">
      <strong role="status" aria-live="polite">
        {isOnline ? "온라인" : "오프라인"}
      </strong>
      <button type="button" disabled={!isOnline}>
        저장
      </button>
    </div>
  )
}

const AuthorityContext = createContext<number | null>(null)

function AuthorityButton({
  level,
  children,
}: {
  level: number
  children: ReactNode
}) {
  const currentLevel = useContext(AuthorityContext)
  if (currentLevel === null)
    throw new Error("AuthorityButton requires AuthorityContext")
  return currentLevel >= level ? (
    <button type="button">{children}</button>
  ) : null
}

function AuthorityContextLesson() {
  return (
    <AuthorityContext.Provider value={5}>
      <div className="flex gap-2">
        <AuthorityButton level={3}>조회</AuthorityButton>
        <AuthorityButton level={10}>시스템 설정</AuthorityButton>
      </div>
    </AuthorityContext.Provider>
  )
}

const lessons: Lesson[] = [
  {
    day: 3,
    title: "useEffect와 외부 시스템",
    vue: "onMounted / onUnmounted",
    react: "useEffect + cleanup",
    checkpoints: ["초기 상태", "이벤트 등록", "cleanup"],
    Component: NetworkStatusLesson,
  },
  {
    day: 4,
    title: "제어 컴포넌트와 검색",
    vue: "v-model",
    react: "value + onChange",
    checkpoints: ["input과 state 연결", "파생 값", "안정적인 key"],
    Component: ProductSearchLesson,
  },
  {
    day: 5,
    title: "객체 state 업데이트",
    vue: "reactive 객체 변경",
    react: "불변 업데이트",
    checkpoints: ["이전 객체 spread", "submit 방지", "안정적인 id"],
    Component: UserFormLesson,
  },
  {
    day: 6,
    title: "배열 state 업데이트",
    vue: "배열 직접 변경",
    react: "map / filter",
    checkpoints: ["대상만 변경", "선택 수 파생", "전체 선택 파생"],
    Component: ShipmentSelectorLesson,
  },
  {
    day: 7,
    title: "slot과 children",
    vue: "slot",
    react: "ReactNode children",
    checkpoints: ["조건부 렌더링", "children", "콜백"],
    Component: ConfirmDialogLesson,
  },
  {
    day: 8,
    title: "Composable과 Custom Hook",
    vue: "composable",
    react: "Custom Hook",
    checkpoints: ["use 접두사", "상태와 Effect 캡슐화", "UI 분리"],
    Component: CustomHookLesson,
  },
  {
    day: 9,
    title: "provide/inject와 Context",
    vue: "provide / inject",
    react: "Context Provider / useContext",
    checkpoints: ["Provider", "공유 값", "권한 판정"],
    Component: AuthorityContextLesson,
  },
]

export function ReactFundamentals() {
  const [selectedDay, setSelectedDay] = useState(3)
  const lesson = lessons.find(({ day }) => day === selectedDay) ?? lessons[0]
  const LessonComponent = lesson.Component

  return (
    <main className="bg-muted/30 min-h-svh p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <Link className="text-muted-foreground text-sm underline" to="/">
            React Learning Ops
          </Link>
          <h1 className="text-3xl font-semibold">React Fundamentals</h1>
          <p className="text-muted-foreground">
            Vue 경험을 React의 state, effect, composition 모델로 다시 익히는
            작은 연습입니다.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-[14rem_minmax(0,1fr)]">
          <nav className="grid content-start gap-2" aria-label="기초 학습 목록">
            {lessons.map(({ day, title }) => (
              <button
                key={day}
                type="button"
                aria-pressed={day === selectedDay}
                className="aria-pressed:bg-foreground aria-pressed:text-background rounded-lg border px-3 py-2 text-left text-sm"
                onClick={() => setSelectedDay(day)}
              >
                DAY {String(day).padStart(2, "0")} · {title}
              </button>
            ))}
          </nav>

          <section className="bg-background space-y-6 rounded-xl border p-5">
            <div>
              <p className="text-muted-foreground text-sm">DAY {lesson.day}</p>
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
            </div>
            <div className="bg-muted grid gap-2 rounded-lg p-4 sm:grid-cols-2">
              <p>
                <small className="text-muted-foreground block">Vue</small>
                {lesson.vue}
              </p>
              <p>
                <small className="text-muted-foreground block">React</small>
                {lesson.react}
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold">실행 화면</h3>
              <LessonComponent />
            </div>
            <ul className="text-muted-foreground list-disc pl-5 text-sm">
              {lesson.checkpoints.map((checkpoint) => (
                <li key={checkpoint}>{checkpoint}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}
