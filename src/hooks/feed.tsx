import {
  type Dispatch,
  type JSX,
  type SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { options, signalOptions } from '../lib/fetch'
import { BACKEND_URL } from '../lib/variables'
import useDebounce from './debounce'

interface Params {
  search?: string
  sort?: string
}

function useFeed<T>(
  setData: Dispatch<SetStateAction<T[]>>,
  path: string,
  cursor: string,
  { sort, search }: Params
) {
  const sentinel = useRef<HTMLDivElement>(null)
  const [more, setMore] = useState(true)
  const [fetching, setFetching] = useState(true)
  const debounced = useDebounce(search)

  useEffect(() => {
    const controller = new AbortController()
    const getPosts = async () => {
      setMore(true)
      setFetching(true)
      try {
        const response = await fetch(
          `${BACKEND_URL + path}?sort=${sort || ''}&search=${debounced || ''}`,
          signalOptions(controller)
        )

        if (response.ok) {
          const json: T[] = await response.json()
          if (json.length < 10) {
            setMore(false)
          }
          setData(json)
        } else {
          console.log(response)
        }
        setFetching(false)
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return
        }
        console.log(error)
      }
    }
    getPosts()

    return () => {
      controller.abort()
    }
  }, [setData, path, sort, debounced])

  const getMore = useMemo(
    () => async () => {
      const response = await fetch(
        `${BACKEND_URL + path}?cursor=${cursor}&sort=${sort}&search=${debounced || ''}`,
        options
      )

      if (response.ok) {
        const json: T[] = await response.json()
        if (json.length < 10) {
          setMore(false)
        }
        setData((prev) => [...prev, ...json])
      } else {
        console.log(response)
      }

      setFetching(false)
    },
    [setData, path, cursor, sort, debounced]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && more && !fetching) {
        setFetching(true)
        getMore()
      }
    })

    const div = sentinel.current
    if (div) {
      observer.observe(div)
    }

    return () => observer.disconnect()
  }, [getMore, more, fetching])

  let loader: JSX.Element
  if (fetching) {
    loader = <h2>Loading...</h2>
  } else if (more) {
    loader = (
      <button onClick={getMore} type='button'>
        Load more
      </button>
    )
  } else {
    loader = <h2>You've reached the bottom</h2>
  }

  return [loader, sentinel] as const
}

export default useFeed
