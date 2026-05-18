import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type FunctionComponent,
  useState
} from 'react'
import useErrors from '../../hooks/errors'
import { useFormContext } from '../../hooks/form'
import useRegister from '../../hooks/register'
import { email } from '../../lib/validate'
import type { AlertType } from '../../types/app'
import Label from './Label'

const EmailInput: FunctionComponent = () => {
  const [value, setValue] = useState('')
  const [alert, setAlert] = useState<AlertType>('')

  const { register, unregister, errors } = useFormContext()
  useErrors('email', setAlert, errors)
  useRegister('email', register, unregister, () => {
    const alert = email('submit', value)
    setAlert(alert)
    return !alert
  })

  const change: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
    setAlert(alert && email('change', event.target.value))
  }

  const blur: FocusEventHandler<HTMLInputElement> = (event) => {
    setAlert(email('blur', event.target.value))
  }

  return (
    <Label
      alert={alert}
      label='Email'
      name='email'
      onBlur={blur}
      onChange={change}
      required
      type='email'
      value={value}
    />
  )
}

export default EmailInput
