import { useEffect, useState } from "react"

type CounterProps = {
  // 작성
  count: number
  setCount: (count: number) => void
}

function Counter({ count, setCount }: CounterProps) {
  return (
    <section>
      <p>{count}</p>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        증가
      </button>
      {/* label과 count 표시 */}
      {/* 증가 버튼 */}
    </section>
  )
}

export default function App() {
  const [count, setCount] = useState(0)

  return <Counter count={count} setCount={setCount} />
}

// * 상품 단가는 12,000원이다.
// * 수량의 초기값은 1이다.
// * +, - 버튼으로 수량을 변경한다.
// * 수량은 1보다 작아질 수 없다.
// * 총금액은 별도의 state에 저장하지 않는다.
// * 금액은 toLocaleString('ko-KR')으로 표시한다.

export function ProductCounter() {
  const UNIT_PRICE = 12000
  const [count, setCount] = useState(1)

  useEffect(() => {
    console.log(`수량 변경됨: ${count}`)
  }, [count])

  const increaseCount = () => {
    setCount((prev) => prev + 1)
  }
  const decreaseCount = () => {
    setCount((prev) => Math.max(1, prev - 1))
  }

  const totalPrice = count * UNIT_PRICE

  return (
    <section>
      <p>수량: {count}</p>
      <button onClick={increaseCount} aria-label="수량 증가">
        +
      </button>
      <button onClick={decreaseCount} aria-label="수량 감소">
        -
      </button>
      <p>총 금액: {totalPrice.toLocaleString("ko-KR")}</p>
    </section>
  )
}
