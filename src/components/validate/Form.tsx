import React, {
  type PropsWithChildren,
  type SubmitEventHandler,
  useRef,
  useState
} from 'react'
import { FormContext } from '../../hooks/form'
import { formOptions } from '../../lib/fetch'
import { BACKEND_URL } from '../../lib/variables'
import type { AlertType } from '../../types/app'
import type { ClientError, ResError, ServerError } from '../../types/response'
import Alert from '../general/Alert'

interface Props<T> extends PropsWithChildren {
  app?: boolean
  footer: React.ReactNode
  header?: string
  method?: 'put'
  path: string
  success: (data: T) => void
}

const Form = <T,>({
  app,
  header,
  children,
  footer,
  path,
  method,
  success
}: Props<T>) => {
  const [errors, setErrors] = useState<ClientError[]>([])
  const [alert, setAlert] = useState<AlertType>('')

  const validators = useRef<Record<string, () => boolean>>({})

  const register = (name: string, validate: () => boolean) => {
    validators.current[name] = validate
  }

  const unregister = (name: string) => {
    delete validators.current[name]
  }

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Complexity required to handle all types of responses
  const handleSubmit: SubmitEventHandler = async (event) => {
    event.preventDefault()

    const results = Object.values(validators.current).map((v) => v())
    const valid = results.every((valid) => valid === true)

    console.log(valid)
    if (!valid) {
      return
    }

    const response = await fetch(
      BACKEND_URL + path,
      formOptions(event.target, method)
    )

    if (response.ok) {
      const type = response.headers.get('content-type')
      if (type?.includes('application/json')) {
        const json = (await response.json()) as T
        success(json)
        return
      }

      const redirect = success as () => void
      redirect()
      return
    }

    if (response.status === 400) {
      const json: ClientError[] = await response.json()
      setErrors(json)
      console.log(json)
    }

    if (response.status === 401) {
      const type = response.headers.get('content-type')
      if (type?.includes('application/json')) {
        const json: ResError = await response.json()
        if (!Array.isArray(json)) {
          setAlert(json.msg)
          return
        }
      }

      success(true as T)
      setAlert('You are not authorized. Redirecting...')
      return
    }

    if (response.status === 502) {
      const json: ServerError = await response.json()
      setAlert(json.msg)
      if (json.msg.toLowerCase().includes('redirecting')) {
        success(json as T)
      }
    }
  }

  return (
    <FormContext.Provider value={{ register, unregister, errors }}>
      <form
        className={`flex ${app ? '' : 'w-2xs self-center'} flex-col gap-2`}
        noValidate
        onSubmit={handleSubmit}
      >
        {header &&
          (header && app ? (
            <h2 className='font-semibold text-lg'>{header}</h2>
          ) : (
            <h2 className='text-center font-semibold text-2xl'>{header}</h2>
          ))}
        {children}
        <Alert alert={alert} />
        {footer}
      </form>
    </FormContext.Provider>
  )
}

export default Form
