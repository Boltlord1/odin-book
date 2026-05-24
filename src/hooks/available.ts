import { type ChangeEventHandler, useState } from 'react'
import { BACKEND_URL } from '../lib/variables'
import useDebounce from './debounce'
import useFetch from './feed'

function useAvailable(change: ChangeEventHandler) {
  const [available, setAvailable] = useState(true)
  const [name, setName] = useState('')
  const debouncedName = useDebounce(name, 200)

  const path = `${BACKEND_URL}/user/name?name=${debouncedName}`
  useFetch(setAvailable, path, debouncedName)

  const changeUsername: ChangeEventHandler<HTMLInputElement> = (event) => {
    setName(event.target.value)
    change(event)
  }

  return [debouncedName, available, changeUsername] as const
}

export default useAvailable
