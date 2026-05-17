import { useEffect } from 'react'
import type { Register, Unregister } from '../types/app'

function useRegister(
  name: string,
  register: Register,
  unregister: Unregister,
  cb: () => boolean
) {
  useEffect(() => {
    register(name, cb)
    return () => unregister(name)
  }, [name, register, unregister, cb])
}

export default useRegister
