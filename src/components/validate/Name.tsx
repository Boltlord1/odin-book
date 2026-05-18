import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type FunctionComponent,
  useState
} from 'react'
import useAvailable from '../../hooks/available'
import useErrors from '../../hooks/errors'
import { useFormContext } from '../../hooks/form'
import useRegister from '../../hooks/register'
import { validate } from '../../lib/validate'
import type { AlertType } from '../../types/app'
import Available from '../general/Available'
import Label from './Label'

const NameInput: FunctionComponent = () => {
  const [value, setValue] = useState('')
  const [alert, setAlert] = useState<AlertType>('')

  const { register, unregister, errors } = useFormContext()
  useErrors('username', setAlert, errors)
  useRegister('username', register, unregister, () => {
    const alert = validate('submit', value, 'Username', true, 4, 32)
    setAlert(alert)
    return !alert && available
  })

  const change: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
    setAlert(validate('change', event.target.value, 'Username', true, 4, 32))
  }

  const blur: FocusEventHandler<HTMLInputElement> = (event) => {
    setAlert(validate('blur', event.target.value, 'Username', true, 4, 32))
  }

  const [name, available, changeWithAvailable] = useAvailable(change)

  return (
    <Label
      alert={alert}
      label='Username'
      name='username'
      onBlur={blur}
      onChange={changeWithAvailable}
      type='text'
      value={value}
    >
      <Available available={available} name={name} />
    </Label>
  )
}

export default NameInput
