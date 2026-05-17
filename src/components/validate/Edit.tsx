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

interface Props {
  displayPlaceholder: string
  userPlaceholder: string
}

const EditInput: FunctionComponent<Props> = ({
  displayPlaceholder,
  userPlaceholder
}) => {
  const [username, setUsername] = useState('')
  const [display, setDisplay] = useState('')
  const [userAlert, setUserAlert] = useState<AlertType>('')
  const [displayAlert, setDisplayAlert] = useState<AlertType>('')

  const { register, unregister, errors } = useFormContext()
  useErrors('username', setUserAlert, errors)
  useRegister('username', register, unregister, () => {
    const alert = validate('submit', username, 'Username', false, 4, 32)
    setUserAlert(alert)
    return !alert && available
  })

  useErrors('display', setDisplayAlert, errors)
  useRegister('display', register, unregister, () => {
    const alert = validate('submit', display, 'Display name', false, 2, 32)
    setDisplayAlert(alert)
    return !alert
  })

  useRegister('both', register, unregister, () => {
    const alert = username === '' && display === ''
    setDisplayAlert(alert ? 'Both fields cannot be empty' : '')
    return !alert
  })

  const changeUsername: ChangeEventHandler<HTMLInputElement> = (event) => {
    setUsername(event.target.value)
    setUserAlert(
      validate('change', event.target.value, 'Username', false, 4, 32)
    )
  }

  const blurUsername: FocusEventHandler<HTMLInputElement> = (event) => {
    setUserAlert(validate('blur', event.target.value, 'Username', false, 4, 32))
  }

  const changeDisplay: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDisplay(event.target.value)
    setDisplayAlert(
      validate('change', event.target.value, 'Display name', false, 2, 32)
    )
  }

  const blurDisplay: FocusEventHandler<HTMLInputElement> = (event) => {
    setDisplayAlert(
      validate('blur', event.target.value, 'Display name', false, 2, 32)
    )
  }

  const [name, available, changeWithAvailable] = useAvailable(changeUsername)

  return (
    <>
      <Label
        alert={userAlert}
        blur={blurUsername}
        change={changeWithAvailable}
        label='Username'
        name='username'
        placeholder={userPlaceholder}
        type='text'
        value={username}
      >
        <Available available={available} name={name} />
      </Label>
      <Label
        alert={displayAlert}
        blur={blurDisplay}
        change={changeDisplay}
        label='Display name'
        name='display'
        placeholder={displayPlaceholder}
        type='text'
        value={display}
      />
    </>
  )
}

export default EditInput
