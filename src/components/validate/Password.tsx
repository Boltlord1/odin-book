import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type FunctionComponent,
  useState
} from 'react'
import useErrors from '../../hooks/errors'
import { useFormContext } from '../../hooks/form'
import useRegister from '../../hooks/register'
import { password } from '../../lib/validate'
import type { AlertType } from '../../types/app'
import Label from './Label'

const PasswordInput: FunctionComponent = () => {
  const [pass, setPass] = useState('')
  const [conf, setConf] = useState('')
  const [passAlert, setPassAlert] = useState<AlertType>('')
  const [confAlert, setConfAlert] = useState<AlertType>('')

  const { register, unregister, errors } = useFormContext()
  useErrors('password', setPassAlert, errors)
  useRegister('password', register, unregister, () => {
    const alert = password('submit', pass)
    setPassAlert(alert)
    return !alert
  })

  useErrors('confirm', setConfAlert, errors)
  useRegister('confirm', register, unregister, () => {
    const match = pass === conf
    setConfAlert(match ? '' : 'Passwords do not match')
    return match
  })

  const changePassword: ChangeEventHandler<HTMLInputElement> = (event) => {
    setPass(event.target.value)
    setPassAlert(password('change', event.target.value))
    setConfAlert(event.target.value === conf ? '' : confAlert)
  }

  const blurPassword: FocusEventHandler<HTMLInputElement> = (event) => {
    setPassAlert(password('blur', event.target.value))
    setConfAlert(pass === conf ? '' : confAlert)
  }

  const changeConfirm: ChangeEventHandler<HTMLInputElement> = (event) => {
    setConf(event.target.value)
    setConfAlert(pass === conf ? '' : confAlert)
  }

  const blurConfirm: FocusEventHandler<HTMLInputElement> = () => {
    const alert = pass === conf ? '' : 'Passwords do not match'
    setConfAlert(alert)
  }

  return (
    <>
      <Label
        alert={passAlert}
        label='Password'
        name='password'
        onBlur={blurPassword}
        onChange={changePassword}
        required
        type='password'
        value={pass}
      />
      <Label
        alert={confAlert}
        label='Confirm Password'
        name='confirm'
        onBlur={blurConfirm}
        onChange={changeConfirm}
        required
        type='password'
        value={conf}
      />
    </>
  )
}

export default PasswordInput
