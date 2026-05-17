import {
  type ChangeEventHandler,
  type FocusEventHandler,
  type FunctionComponent,
  type HTMLInputTypeAttribute,
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
  max?: number
  min?: number
  name: string
  placeholder?: string
  required?: boolean
}

interface InputProps extends Props {
  textarea?: false
  type?: HTMLInputTypeAttribute
}

interface TextAreaProps extends Props {
  oneLine?: boolean
  rows?: number
  textarea: true
}

const TextInput: FunctionComponent<InputProps | TextAreaProps> = (props) => {
  const { textarea, name, label, placeholder, required, min, max } = props

  const [value, setValue] = useState('')
  const [alert, setAlert] = useState<AlertType>('')

  const realMin = min ?? 1
  const realMax = max ?? 32

  const { register, unregister, errors } = useFormContext()
  useErrors(name, setAlert, errors)
  useRegister(name, register, unregister, () => {
    const alert = validate('submit', value, label, required, realMin, realMax)
    setAlert(alert)
    return !alert
  })

  const change: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
    setAlert(
      validate('change', event.target.value, label, required, realMin, realMax)
    )
  }

  const blur: FocusEventHandler<HTMLInputElement> = (event) => {
    setAlert(
      validate('blur', event.target.value, label, required, realMin, realMax)
    )
  }

  return textarea ? (
    <Label
      alert={alert}
      blur={blur}
      change={change}
      label={required ? label : `${label} (Optional)`}
      name={name}
      oneLine={props.oneLine}
      placeholder={placeholder}
      required={required}
      rows={props.rows ?? 2}
      textarea
      value={value}
    />
  ) : (
    <Label
      alert={alert}
      blur={blur}
      change={change}
      label={required ? label : `${label} (Optional)`}
      name={name}
      placeholder={placeholder}
      required={required}
      type={props.type ?? 'text'}
      value={value}
    />
  )
}

export default TextInput
