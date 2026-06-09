import { createContext, useContext } from 'react'

const DeleteContext = createContext<((id: string) => void) | null>(null)

const useDeleteContext = () => {
  const context = useContext(DeleteContext)
  if (!context) {
    throw new Error('Context is missing provider')
  }
  return context
}

export { DeleteContext, useDeleteContext }
