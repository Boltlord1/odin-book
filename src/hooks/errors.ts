import { type Dispatch, type SetStateAction, useEffect } from 'react'
import type { AlertType } from '../types/app'
import type { ClientError } from '../types/response'

function useErrors(
  name: string,
  setAlert: Dispatch<SetStateAction<AlertType>>,
  errors: ClientError[]
) {
  useEffect(() => {
    const filtered = errors.filter((e) => e.name === name)
    if (filtered.length > 0) {
      setAlert(filtered[0].msg)
    } else if (filtered.length > 1) {
      setAlert(filtered.map((err) => err.msg))
    }
  }, [name, setAlert, errors])
}

export default useErrors
