import type {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
  HTMLInputTypeAttribute,
  PropsWithChildren
} from 'react'
import adjustHeight from '../../lib/adjustHeight'
import type { AlertType } from '../../types/app'
import Alert from '../general/Alert'

interface Props extends PropsWithChildren {
  alert: AlertType
  blur?: FocusEventHandler
  change?: ChangeEventHandler
  label: string
  name: string
  placeholder?: string
  required?: boolean
  value: string
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

const Label: FunctionComponent<InputProps | TextAreaProps> = (props) => {
  const {
    alert,
    label,
    name,
    blur,
    change,
    placeholder,
    required,
    textarea,
    value,
    children
  } = props

  const element = textarea ? (
    <textarea
      className='resize-none rounded-lg bg-gray-100 p-2 pr-4 pl-4 outline-0 focus:shadow-lg'
      name={name}
      onBlur={blur}
      onChange={(event) => {
        adjustHeight(event)
        if (change) {
          change(event)
        }
      }}
      onKeyDown={(e) => {
        if (!props.oneLine) {
          return
        }
        if (e.key === 'Enter') {
          e.preventDefault()
        }
      }}
      placeholder={placeholder}
      required={required}
      rows={props.rows || 2}
      value={value}
    />
  ) : (
    <input
      className='rounded-lg bg-gray-100 px-6 py-1 outline-none focus:shadow-md'
      name={name}
      onBlur={blur}
      onChange={change}
      placeholder={placeholder}
      required={required}
      type={props.type || 'text'}
      value={value}
    />
  )

  return (
    <label className='flex flex-col gap-2' htmlFor={name}>
      <span>{label}</span>
      {element}
      {children}
      <Alert alert={alert} />
    </label>
  )
}

export default Label
