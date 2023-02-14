"use client"
import { useDeferredValue, useEffect, useState } from "react"
import useSWR from "swr"

function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json())

function Result(props: { query: string }) {
  const query = useDebounce(props.query)
  const { data, error, isLoading } = useSWR(`/api/generate?wd=${query}`, fetcher)
  if (error) return <div></div>
  if (!data) return <div>loading...</div>
  return <div>{JSON.stringify(data)}</div>
}

export default function Demo() {
  const [value, setValue] = useState("在这里输入汉字")
  return (
    <div style={{ width: "20rem" }}>
      <input
        style={{ padding: "0.2rem 0.5rem", marginBottom: "1rem" }}
        type="text"
        name=""
        id=""
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Result query={value} />
    </div>
  )
}
