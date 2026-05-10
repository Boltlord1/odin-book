import {
  type DependencyList,
  type Dispatch,
  type SetStateAction,
  useEffect
} from 'react'
import { signalOptions } from '../lib/fetch'

function useFetch<T>(
  setData: Dispatch<SetStateAction<T>>,
  path: string,
  ...dependencies: DependencyList
) {
  useEffect(() => {
    const controller = new AbortController()
    const getPosts = async () => {
      try {
        const response = await fetch(path, signalOptions(controller))

        if (response.ok) {
          const json = await response.json()
          setData(json)
          return
        }
        console.log(response)
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
  }, [setData, path, ...dependencies])
}

export default useFetch
