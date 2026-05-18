import type {
  ComponentProps,
  FunctionComponent,
  PropsWithChildren,
  ReactNode
} from 'react'
import adjustHeight from '../../lib/adjustHeight'
import type { AlertType } from '../../types/app'
import Alert from '../general/Alert'

interface BaseProps extends PropsWithChildren {
  alert: AlertType
  label: string
  noLabel?: boolean
}

type Props =
  | (BaseProps & ComponentProps<'input'> & { textarea?: false })
  | (BaseProps &
      ComponentProps<'textarea'> & { textarea: true; oneLine?: boolean })

const Label: FunctionComponent<Props> = (props) => {
  const { textarea, alert, label, noLabel, children, name, ...rest } = props

  let element: ReactNode
  if (textarea) {
    const properties = rest as ComponentProps<'textarea'>
    element = (
      <textarea
        {...properties}
        className='resize-none rounded-lg bg-gray-100 p-2 pr-4 pl-4 outline-0 focus:shadow-lg'
        id={name}
        name={name}
        onChange={(event) => {
          adjustHeight(event)
          if (props.onChange) {
            props.onChange(event)
          }
        }}
        onKeyDown={(e) => {
          if (props.oneLine && e.key === 'Enter') {
            e.preventDefault()
          }
        }}
        rows={props.rows || 2}
      />
    )
  } else {
    const properties = rest as ComponentProps<'input'>
    element = (
      <input
        {...properties}
        className='rounded-lg bg-gray-100 px-6 py-1 outline-none focus:shadow-md'
        id={name}
        name={name}
        type={props.type || 'text'}
      />
    )
  }

  return (
    <label className='flex flex-col gap-2' htmlFor={name}>
      {!noLabel && <span>{label}</span>}
      {element}
      {children}
      <Alert alert={alert} />
    </label>
  )
}

export default Label
