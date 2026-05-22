import { createContext, useContext } from 'react'
import type { DeleteContextType } from '../types/app'

const DeleteContext = createContext<DeleteContextType | null>(null)

const useDeleteContext = () => {
  const context = useContext(DeleteContext)
  if (!context) {
    throw new Error('Context is missing provider')
  }
  return context
}

export { DeleteContext, useDeleteContext }
