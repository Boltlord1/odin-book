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
  noLabel?: true
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
  const { textarea, name, label, placeholder, required, noLabel, min, max } =
    props

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

  const change: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event
  ) => {
    setValue(event.target.value)
    setAlert(
      validate('change', event.target.value, label, required, realMin, realMax)
    )
  }

  const blur: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    event
  ) => {
    setAlert(
      validate('blur', event.target.value, label, required, realMin, realMax)
    )
  }

  const common = {
    alert,
    onBlur: blur,
    onChange: change,
    name,
    placeholder,
    value,
    noLabel,
    label: required ? label : `${label} (Optional)`
  }

  return textarea ? (
    <Label
      {...common}
      oneLine={props.oneLine}
      rows={props.rows ?? 2}
      textarea
    />
  ) : (
    <Label {...common} type={props.type ?? 'text'} />
  )
}

export default TextInput
