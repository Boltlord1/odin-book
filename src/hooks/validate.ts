import {
  type ChangeEventHandler,
  type FocusEventHandler,
  useState
} from 'react'
import validator from '../lib/validate'
import type { ClientError } from '../types/response'

function useValidate<T extends keyof typeof validator>(...fields: T[]) {
  const initial = fields.reduce(
    (acc, field) => {
      acc[field] = ''
      return acc
    },
    {} as Record<T, string>
  )
  const [values, setValues] = useState<Record<T, string>>(initial)
  const [errors, setErrors] = useState({} as Partial<Record<T, string[]>>)

  function update(target: HTMLInputElement, type: 'change' | 'blur') {
    const name = target.name as T
    const value = target.value
    setValues({ ...values, [name]: value })

    const error = validator[name](value, type)
    setErrors({ ...errors, [name]: error })
  }

  const change: ChangeEventHandler<HTMLInputElement> = (event) =>
    update(event.target, 'change')
  const blur: FocusEventHandler<HTMLInputElement> = (event) =>
    update(event.target, 'blur')

  function validate() {
    const errors = {} as Partial<Record<T, string[]>>
    for (const field of fields) {
      const error = validator[field](values[field], 'submit')
      if (error) {
        errors[field] = error
      }
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  function server(newFields: ClientError[]) {
    const errors = {} as Partial<Record<T, string[]>>
    for (const field of newFields) {
      const name = field.name

      if ((fields as string[]).includes(name)) {
        const safe = name as T
        if (errors[safe]) {
          errors[safe] = [...errors[safe], field.msg]
        } else {
          errors[safe] = [field.msg]
        }
      }
    }
    setErrors(errors)
  }

  return { values, errors, change, blur, validate, server }
}

export default useValidate
