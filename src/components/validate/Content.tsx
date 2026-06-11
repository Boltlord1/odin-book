import {
  type ChangeEventHandler,
  type Dispatch,
  type FocusEventHandler,
  type FunctionComponent,
  type SetStateAction,
  useState
} from 'react'
import useErrors from '../../hooks/errors'
import { useFormContext } from '../../hooks/form'
import useRegister from '../../hooks/register'
import { validate } from '../../lib/validate'
import type { AlertType } from '../../types/app'
import Label from './Label'

interface Props {
  label: string
  placeholder: string
  setFocus: Dispatch<SetStateAction<boolean>>
  setValue: Dispatch<SetStateAction<string>>
  value: string
}

const ContentInput: FunctionComponent<Props> = ({
  label,
  placeholder,
  value,
  setValue,
  setFocus
}) => {
  const [alert, setAlert] = useState<AlertType>('')

  const { register, unregister, errors } = useFormContext()
  useErrors('content', setAlert, errors)
  useRegister('content', register, unregister, () => {
    const alert = validate('submit', value, label, true, 1, 500)
    setAlert(alert)
    return !alert
  })

  const change: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setValue(event.target.value)
    setAlert(validate('change', event.target.value, label, true, 1, 500))
  }

  const blur: FocusEventHandler<HTMLTextAreaElement> = (event) => {
    setAlert(validate('blur', event.target.value, label, false, 1, 500))
    if (event.target.value === '') {
      setFocus(false)
    }
  }

  const focus: FocusEventHandler<HTMLTextAreaElement> = () => {
    setFocus(true)
  }

  return (
    <Label
      alert={alert}
      label={label}
      name='content'
      noLabel
      onBlur={blur}
      onChange={change}
      onFocus={focus}
      placeholder={placeholder}
      required
      textarea
      value={value}
    />
  )
}

export default ContentInput
