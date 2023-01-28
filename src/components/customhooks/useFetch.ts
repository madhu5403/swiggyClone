import { useEffect, useState } from "react"

const useFetch = (initialUrl: string) => {
  const [data, setData] = useState<null | any>(null)
  useEffect(() => {
    fetch(initialUrl)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error))
  }, [])
  return data
}
export default useFetch
