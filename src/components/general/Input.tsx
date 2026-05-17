import type {
  ChangeEventHandler,
  FunctionComponent,
  HTMLInputTypeAttribute
} from 'react'

interface Props {
  handleChange?: ChangeEventHandler<HTMLInputElement>
  name: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
}

const Input: FunctionComponent<Props> = ({
  type,
  name,
  placeholder,
  handleChange
}) => (
  <input
    className='rounded-lg bg-gray-100 px-6 py-1 outline-none focus:shadow-md'
    id={name}
    name={name}
    onChange={handleChange}
    placeholder={placeholder}
    type={type || 'text'}
  />
)

export default Input
