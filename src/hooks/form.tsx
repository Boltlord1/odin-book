import { createContext, useContext } from 'react'
import type { FormContextType } from '../types/app'

const FormContext = createContext<FormContextType | null>(null)

const useFormContext = () => {
  const context = useContext(FormContext)
  if (!context) {
    throw new Error('Input must be used within a Form')
  }
  return context
}

export { FormContext, useFormContext }
