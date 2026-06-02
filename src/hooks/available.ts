import { type ChangeEventHandler, useEffect, useState } from 'react'
import { BACKEND_URL } from '../lib/variables'
import useDebounce from './debounce'

function useAvailable(change: ChangeEventHandler) {
  const [available, setAvailable] = useState(true)
  const [name, setName] = useState('')
  const debouncedName = useDebounce(name, 200)

  const path = `${BACKEND_URL}/user/name?name=${debouncedName}`
  useEffect(() => {
    async function getAvailable() {
      const response = await fetch(path)
      if (response.ok) {
        const json = await response.json()
        setAvailable(json)
      }
    }
    getAvailable()
  }, [path])

  const changeUsername: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value)
    change(event)
  }

  return [debouncedName, available, changeUsername] as const
}

export default useAvailable
