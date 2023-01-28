import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Card from "./Card"
import useFetch from "./customhooks/useFetch"

export default function CardList() {
  const [restaurents, setRestaurents] = useState<any>([])
  const [offset, setOffset] = useState(15)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>()
  const observer = useRef<any>()
  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setOffset((prev) => prev + 16)
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  useEffect(() => {
    if (offset == 15) {
      setLoading(true)
      fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.4062155&lng=78.3763486&page_type=DESKTOP_WEB_LISTING`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data if", data?.data?.cards[2]?.data?.data?.cards)
          setRestaurents(
            (prev) =>
              prev && [...prev, ...data?.data?.cards[2]?.data?.data?.cards]
          )
          setLoading(false)
        })
        .catch((error) => console.error(error))
    } else {
      fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.482002&lng=80.691377&offset=${offset}&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("data else", data?.data?.cards)
          setRestaurents((prev) => [...prev, ...data?.data?.cards])
          setLoading(false)
        })
        .catch((error) => console.error(error))
    }
  }, [offset])

  console.log("loading", loading)

  if (loading) return <h1>Loading...</h1>
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {restaurents?.map((res, index) => {
          if (index == restaurents.length - 1) {
            return <Card key={index} ref={lastElementRef} restaurant={res} />
          } else {
            return <Card key={index} restaurant={res} />
          }
        })}
      </div>
    </>
  )
}
