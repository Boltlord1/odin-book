import type {
  ChangeEventHandler,
  FocusEventHandler,
  FunctionComponent,
  HTMLInputTypeAttribute,
  PropsWithChildren
} from 'react'

interface Props extends PropsWithChildren {
  blur?: FocusEventHandler
  change?: ChangeEventHandler
  errors?: string[]
  label: string
  name: string
  type?: HTMLInputTypeAttribute
  value: string
}

const Label: FunctionComponent<Props> = ({
  label,
  errors,
  type,
  name,
  change,
  blur,
  value,
  children
}) => (
  <label className='flex flex-col gap-2' htmlFor={name}>
    <span>{label}</span>
    <input
      className='rounded-lg bg-gray-100 px-6 py-1 outline-none focus:shadow-md'
      name={name}
      onBlur={blur}
      onChange={change}
      type={type || 'text'}
      value={value}
    />
    {children}
    {errors && (
      <div
        className='flex flex-col gap-1 rounded-r-lg border-red-600 border-l-6 bg-red-300 px-4 py-1'
        role='alert'
      >
        {errors.map((e) => (
          <p key={e}>{e}</p>
        ))}
      </div>
    )}
  </label>
)

export default Label
